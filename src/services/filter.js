const { Op } = require("sequelize");
const db = require("../models");
const FilterService = async (
  { amenities, bathRooms, beds, hostLanguage, maxPrice, minPrice, typeHouse },
  page
) => {
  // gop cac mang ammenties neu no ton tai
  const { essentials, features, location, safety } = amenities;
  const arrFil = [...essentials, ...features, ...location, ...safety];
  const filter = {};

  if (bathRooms != 0) {
    filter.bathRooms = { NumsOfBath: bathRooms };
  }

  if (beds != 0) {
    filter.beds = { NumsOfBed: beds };
  }

  if (hostLanguage) {
    filter.hostLanguage = { HostLanguage: hostLanguage };
  }

  if (maxPrice == 250) maxPrice = 999;
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
          where: { [Op.and]: [{ [Op.in]: filter.typeHouse }] },
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
          where: { [Op.and]: [filter.amenities] },
        },
      ],
    };
  }

  // dinh nghia include va push nhung filter can thiet 
  const include = [
    {
      model: db.address,
      required: true,
    },
    {
      model: db.useracc,
      required: true,
      attributes: ["UserId", "UserName", "Gmail"],
    },
  ];
  if (filter.amenities) include.push(filter.amenities);
  if (filter.typeHouse) include.push(filter.typeHouse);


  const perPage = 10;
  const offSet = (page - 1) * perPage;

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

    console.log(getHouse_);
    let extendedHouse = await Promise.all(
      getHouse_.map(async (item) => {
        const arrImg = await handleFetchImg(item.HouseId);
        return { ...item.toJSON(), arrImg };
      })
    );

    return extendedHouse;
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
