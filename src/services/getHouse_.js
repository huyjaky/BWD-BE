const db = require("../models");
const getHouseServices = async (page, id) => {
  try {
    if (id) {
      let getHouse_ = await db.house.findAll({
        where: { HouseId: id },
        include: [
          {
            model: db.address,
            required: true,
          },
          {
            model: db.useracc,
            required: true,
            attributes: ["UserId", "UserName", "Gmail", "Image"],
          },
        ],
      });

      let extendedHouse = await Promise.all(
        getHouse_.map(async (item) => {
          const arrImg = await handleFetchImg(item.HouseId);
          const placeOffer = await handleFetchPlaceOffer(item.HouseId);
          return { ...item.toJSON(), arrImg, placeOffer };
        })
      );
      return extendedHouse;
    }

    if (!page) {
      let getHouse_ = await db.house.findAll({
        include: [
          {
            model: db.address,
            required: true,
          },
          {
            model: db.useracc,
            required: true,
            attributes: ["UserId", "UserName", "Gmail", "Image"],
          },
        ],
      });

      let extendedHouse = await Promise.all(
        getHouse_.map(async (item) => {
          const arrImg = await handleFetchImg(item.HouseId);
          const placeOffer = await handleFetchPlaceOffer(item.HouseId);
          return { ...item.toJSON(), arrImg, placeOffer };
        })
      );
      return extendedHouse;
    }

    const perPage = 10;
    const offSet = (page - 1) * perPage;
    console.log(page);
    let getHouse_ = await db.house.findAll({
      include: [
        {
          model: db.address,
          required: true,
        },
        {
          model: db.useracc,
          required: true,
          attributes: ["UserId", "UserName", "Gmail", "Image"],
        },
      ],
      limit: perPage,
      offset: offSet,
    });

    let extendedHouse = await Promise.all(
      getHouse_.map(async (item) => {
        const arrImg = await handleFetchImg(item.HouseId);
        const placeOffer = await handleFetchPlaceOffer(item.HouseId);
        return { ...item.toJSON(), arrImg , placeOffer};
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

module.exports = {
  getHouseServices: getHouseServices,
};
