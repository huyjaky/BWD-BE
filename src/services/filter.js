const { Op } = require("sequelize");
const db = require("../models");
ujnnlkjoujnljlk
const FilterService = async ({
  amenities,
  bathRooms,
  beds,
  hostLanguage,
  maxPrice,
  minPrice,
  typeHouse,
}) => {
  const { essentials, features, location, safety } = amenities;
  const arrFil = [...essentials, ...features, ...location, ...safety];
  const filter = {};
  if (arrFil.length != 0) {
    filter.amenities = {TypeHouse: {[Op.in]: arrFil}};
  }

  if (bathRooms != 0) {
    filter.bathRooms = {NumsOfBath: bathRooms};
  }

  if (beds != 0) {
    filter.beds = {NumsOfBed: beds};
  }

  if (hostLanguage) {
    filter.hostLanguage = {HostLanguage: hostLanguage};
  }

  filter.price = {Price: {[Op.between]: [minPrice, maxPrice]}}
;

  if (typeHouse.length != 0) {
    filter.typeHouse = typeHouse;
  }

  try {
    const perPage = 10;
    const offSet = (1 - 1) * perPage;
    let getHouse_ = await db.house.findAll({
      where:{[Op.and]: [
        filter.beds,
        filter.bathRooms,
        filter.hostLanguage,
        filter.price
      ]},
      include: [
        {
          model: db.address,
          required: true,
        },
        {
          model: db.useracc,
          required: true,
          attributes: ["UserId", "UserName", "Gmail"],
        },
        {
          model: db.managetypehouse,
          required: true,
          include: [
            {
              model: db.typehouse,
            }
          ]
        }
      ],
      limit: perPage,
      offset: offSet,
    });

    console.log('gethouse: ', getHouse_);

    // let extendedHouse = await Promise.all(
    //   getHouse_.map(async (item) => {
    //     const arrImg = await handleFetchImg(item.HouseId);
    //     return { ...item.toJSON(), arrImg };
    //   })
    // );

    // return extendedHouse;
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
