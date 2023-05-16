const db = require("../models");
const getHouseServices = async () => {
  try {
    let getHouse_ = await db.house.findAll({
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
      ],
    });

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
  getHouseServices: getHouseServices,
};
