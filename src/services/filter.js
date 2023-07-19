const { Op } = require("sequelize");
const db = require("../models");
const Sequelize = require('sequelize');
const { json } = require("body-parser");

const FilterService = async (
  { amenities, bathRooms, beds, hostLanguage, maxPrice, minPrice, typeHouse, orientation },
  { address, checkInDay, checkOutDay, guest },
  page, UserId
) => {
  const {
    countryRegion,
    locality,
    adminDistrict,
    countryRegionIso2,
    postalCode,
    addressLine,
    streetName,
    formattedAddress,
    latitude,
    longitude,
    title
  } = address;

  const {
    adults,
    childrens,
    infants
  } = guest;

  // gop cac mang ammenties neu no ton tai
  // const { essentials, features, location, safety } = amenities;

  const arrFil = amenities
  const filter = {};

  if (adults != 0 || childrens != 0 || infants != 0) {
    filter.beds = { NumsOfBed: { [Op.lte]: adults + childrens - 1 } }
  }

  if (orientation) {
    console.log('fil orien');
    filter.orientation = { Orientation: orientation }
  }

  if (bathRooms != 0) {
    console.log('fil bathR');
    filter.bathRooms = { NumsOfBath: bathRooms };
  }

  if (beds != 0) {
    console.log('filbeds');
    filter.beds = { NumsOfBed: beds };
  }

  if (hostLanguage) {
    console.log('filhost');
    filter.hostLanguage = { HostLanguage: hostLanguage };
  }

  if (maxPrice == 500000) maxPrice = 99999999;

  filter.price = { Price: { [Op.between]: [minPrice, maxPrice] } };


  let perPage = 10;
  let offSet = parseInt(page);
  // let offSet = parseInt(page)

  if (page == -1) {
    perPage = 7;
    offSet = 0
  } else if (page == -2) {
    perPage = 99;
    offSet = 1
  }


  // bo loc typehouse va amenities
  let houseIdArr = [];
  if (typeHouse.length != 0) {
    const houseIdTypeHouse = await handleFetchTypeHouse(typeHouse, perPage, offSet);
    houseIdArr = houseIdTypeHouse.map((item, index) => {
      return item.dataValues.HouseId
    })
  }

  if (arrFil.length != 0) {
    if (houseIdArr.length == 0) {
      const houseIdPlaceOffer = await handleFetchPlaceOffer(arrFil, perPage, offSet);
      houseIdArr = houseIdPlaceOffer.map((item, index) => {
        return item.dataValues.HouseId
      })
      console.log('before add', houseIdArr);
    } else {
      const houseIdPlaceOffer = await handleFetchPlaceOfferHouseId(arrFil, perPage, offSet, houseIdArr)
      houseIdArr = houseIdPlaceOffer.map((item, index) => {
        return item.dataValues.HouseId
      })
    }

  }

  console.log('houseidarr', houseIdArr);
  console.log('perpage', perPage);
  console.log('offset', offSet);

  if (houseIdArr.length != 0) {
    filter.typehouseAme = { HouseId: { [Op.in]: houseIdArr } }
  }


  // dinh nghia include va push nhung filter can thiet
  const include = [
    {
      model: db.useracc,
      required: true,
      attributes: ["UserId", "UserName", "Gmail", "Image", "Phone"],
    },
  ];

  if (addressLine) {
    console.log('address line', addressLine);
    include.push({
      model: db.address,
      required: true,
      where: { latitude: latitude, longitude: longitude },
    });
  } else {
    include.push({
      model: db.address,
      required: true,
    });
  }


  let OpAndFilter = [
    filter.beds,
    filter.bathRooms,
    filter.hostLanguage,
    filter.price,
    filter.orientation,
  ]

  if ((arrFil.length != 0 || typeHouse.length != 0) && houseIdArr.length !== 0) {
    OpAndFilter = [...OpAndFilter, filter.typehouseAme];
  } else if ((arrFil.length != 0 || typeHouse.length != 0) && houseIdArr.length === 0) {
    OpAndFilter = [...OpAndFilter, { HouseId: { [Op.in]: ['123123123'] } }]
  }

  let filterBlock = {
    where: {
      [Op.and]: OpAndFilter,
    },
    include: include,
  }

  if (typeHouse.length === 0 && arrFil.length === 0) {
    filterBlock = { ...filterBlock, limit: perPage, offset: offSet }
  }


  try {
    const getHouse_ = await db.house.findAll(filterBlock);

    let extendedHouse = await Promise.all(
      getHouse_.map(async (item) => {
        const arrImg = await handleFetchImg(item.HouseId);
        if (UserId) {
          const setIsFavorite = await handleFavorite(item.HouseId, UserId);
          return { ...item.toJSON(), arrImg, IsFavorite: setIsFavorite };
        }
        return { ...item.toJSON(), arrImg }
      })
    );

    // console.log('extendedHouse', extendedHouse);


    return extendedHouse;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const handleFavorite = async (HouseId, UserId) => {
  try {


    let isFavorite = await db.favorite.findAll({
      where: {
        [Op.and]: [
          { HouseId: HouseId },
          { UserId: UserId }
        ]
      }
    })
    if (isFavorite.length != 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

const handleFetchTypeHouse = async (typehouse, perPage, offSet) => {

  try {
    let getTypeHouse = await db.house.findAll({
      attributes: ['HouseId'],
      include: [
        {
          model: db.managetypehouse,
          required: true,
          attributes: [],
          include: [
            {
              model: db.typehouse,
              required: true,
              attributes: [],
              where: { TypeHouse: { [Op.in]: typehouse } },
            },
          ],
        },
      ],
      group: ['HouseId'],
      limit: perPage,
      offset: offSet,
    });
    return getTypeHouse;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const handleFetchPlaceOfferHouseId = async (amenities, perPage, offSet, houseIdArr) => {

  try {
    let getHousePlaceOffer = await db.house.findAll({
      attributes: ['HouseId'],
      where: { HouseId: { [Op.in]: houseIdArr } },
      include: [
        {
          model: db.manageplaceoffer,
          required: true,
          attributes: [],
          include: [
            {
              model: db.placeoffer,
              required: true,
              attributes: [],
              where: { PlaceOffer: { [Op.in]: amenities } },
            },
          ],
        },
      ],
      group: ['HouseId'],
      limit: perPage,
      offset: offSet,
    });
    return getHousePlaceOffer;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const handleFetchPlaceOffer = async (amenities, perPage, offSet) => {

  try {
    let getHousePlaceOffer = await db.house.findAll({
      attributes: ['HouseId'],
      include: [
        {
          model: db.manageplaceoffer,
          required: true,
          attributes: [],
          include: [
            {
              model: db.placeoffer,
              required: true,
              attributes: [],
              where: { PlaceOffer: { [Op.in]: amenities } },
            },
          ],
        },
      ],
      group: ['HouseId'],
      limit: perPage,
      offset: offSet,
    });
    return getHousePlaceOffer;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const handleFetchImg = async (HouseId) => {
  try {
    let getHouseImg = await db.img.findAll({
      attributes: ["Path"],
      include: [
        {
          model: db.manageimg,
          required: true,
          attributes: [],
          include: [
            {
              model: db.house,
              required: true,
              where: { HouseId: HouseId },
              attributes: [],
            },
          ],
        },
      ],
    });
    return getHouseImg;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = {
  FilterService: FilterService,
};
