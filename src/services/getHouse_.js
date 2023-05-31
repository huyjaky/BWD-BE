const db = require("../models");
const { Op } = require("sequelize");
const getHouseServices = async (page, id, UserId) => {
  try {
    const perPage_ = 10;
    const offSet_ = (page - 1) * perPage_;

    let attr = {}
    if (id) {
      attr = { ...attr, where: { HouseId: id } }
    }

    attr = {
      ...attr, include: [
        {
          model: db.address,
          required: true,
        },
        {
          model: db.useracc,
          required: true,
          attributes: ["UserId", "UserName", "Gmail", "Image"],
        },
      ]
    }

    if (page) {
      attr = { ...attr, limit: perPage_, offset: offSet_, }
    }

    let getHouse_ = await db.house.findAll({ ...attr });

    let extendedHouse = await Promise.all(
      getHouse_.map(async (item) => {
        const arrImg = await handleFetchImg(item.HouseId);
        const placeOffer = await handleFetchPlaceOffer(item.HouseId);
        if (UserId) {
          const setIsFavorite = await handleFavorite(item.HouseId, UserId);
          return { ...item.toJSON(), arrImg, placeOffer, IsFavorite: setIsFavorite };
        }
        return { ...item.toJSON(), arrImg, placeOffer }
      })
    );
    return extendedHouse;


  } catch (error) {
    console.log(error);
    return { error };
  }
};



const getHouseUser = async (UserId) => {
  try {
    let attr = {}
    attr = {
      ...attr, include: [
        {
          model: db.address,
          required: true,
        },
        {
          model: db.useracc,
          required: true,
          attributes: ["UserId", "UserName", "Gmail", "Image"],
          where: { UserId: UserId }
        },
      ]
    }

    let getHouse_ = await db.house.findAll({ ...attr });

    let extendedHouse = await Promise.all(
      getHouse_.map(async (item) => {
        const arrImg = await handleFetchImg(item.HouseId);
        const placeOffer = await handleFetchPlaceOffer(item.HouseId);
        return { ...item.toJSON(), arrImg, placeOffer }
      })
    );
    return extendedHouse;


  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getHouseFavoriteServices = async (UserId) => {
  try {
    let attr = {}
    attr = {
      ...attr, include: [
        {
          model: db.address,
          required: true,
        },
        {
          model: db.useracc,
          required: true,
          attributes: ["UserId", "UserName", "Gmail", "Image"],
        },
      ]
    }

    let getHouse_ = await db.house.findAll({ ...attr });
    let extendedHouse = await Promise.all(
      getHouse_.map(async (item) => {
        const arrImg = await handleFetchImg(item.HouseId);
        const placeOffer = await handleFetchPlaceOffer(item.HouseId);
        const setIsFavorite = await handleFavorite(item.HouseId, UserId);
        return { ...item.toJSON(), arrImg, placeOffer, IsFavorite: setIsFavorite };
      })
    );

    let extendedHouse_ = extendedHouse.filter((item) => {
      return item.IsFavorite !== false;
    });

    return extendedHouse_;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

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
  getHouseUser: getHouseUser,
  getHouseFavoriteServices: getHouseFavoriteServices
};
