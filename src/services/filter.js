const { Op } = require("sequelize");
const db = require("../models");
const FilterService = async (
  { amenities, bathRooms, beds, hostLanguage, maxPrice, minPrice, typeHouse },
  { address, checkInDay, checkOutDay, guest },
  page
) => {
  const {
    countryRegion,
    locality,
    adminDistrict,
    adminDistrict2,
    countryRegionIso2,
    houseNumber,
    postalCode,
    addressLine,
    streetName,
    formattedAddress,
    latitude,
    longitude,
  } = address;

  const {
    adults,
    childrens,
    infants
  } = guest;

  // gop cac mang ammenties neu no ton tai
  const { essentials, features, location, safety } = amenities;
  const arrFil = [...essentials, ...features, ...location, ...safety];
  const filter = {};

  if (adults != 0 || childrens != 0 || infants != 0) {
    filter.beds = { NumsOfBed: { [Op.lte]: adults+childrens-1 } }
  }

  if (bathRooms != 0) {
    filter.bathRooms = { NumsOfBath: bathRooms };
  }

  if (beds != 0) {
    filter.beds = { NumsOfBed: beds };
  }

  if (hostLanguage) {
    filter.hostLanguage = { HostLanguage: hostLanguage };
  }

  if (maxPrice == 250) maxPrice = 999999;
  filter.price = { Price: { [Op.between]: [minPrice, maxPrice] } };

  // dinh nghia inlcude cho type house neu no ton tai
  if (typeHouse.length != 0) {
    filter.typeHouse = {
      model: db.managetypehouse,
      required: true,
      include: [
        {
          model: db.typehouse,
          required: true,
          where: { TypeHouse: { [Op.in]: typeHouse } },
        },
      ],
    };
  }

  // dinh nghia cho amenities
  if (arrFil.length !== 0) {
    filter.amenities = {
      model: db.manageplaceoffer,
      required: true,
      include: [
        {
          model: db.placeoffer,
          required: true,
          where: { PlaceOffer: { [Op.in]: arrFil } },
        },
      ],
    };
  }

  // dinh nghia include va push nhung filter can thiet
  const include = [
    {
      model: db.useracc,
      required: true,
      attributes: ["UserId", "UserName", "Gmail", "Image"],
    },
  ];
  if (formattedAddress) {
    include.push({
      model: db.address,
      required: true,
      where: {
        [Op.and]: [
          {
            formattedAddress: {
              [Op.like]: `%${formattedAddress}%`
            }
          }
        ]
      },
    });
  } else {
    include.push({
      model: db.address,
      required: true,
    });
  }

  if (filter.amenities) include.push(filter.amenities);
  if (filter.typeHouse) include.push(filter.typeHouse);

  const perPage = 10;
  const offSet = (page - 1) * perPage;

  console.log(filter.beds);

  try {
    const getHouse_ = await db.house.findAll({
      where: {
        [Op.and]: [
          filter.beds,
          filter.bathRooms,
          filter.hostLanguage,
          filter.price,
        ],
      },
      include: include,
      limit: perPage,
      offset: offSet,
    });

    let extendedHouse = await Promise.all(
      getHouse_.map(async (item) => {
        const arrImg = await handleFetchImg(item.HouseId);
        const placeOffer = await handleFetchPlaceOffer(item.HouseId);
        return { ...item.toJSON(), arrImg, placeOffer };
      })
    );

    return extendedHouse;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const handleFetchPlaceOffer = async (HouseId) => {
  try {
    let getHousePlaceOffer = await db.placeoffer.findAll({
      include: [
        {
          model: db.manageplaceoffer,
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
