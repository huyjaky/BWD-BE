const db = require("../models");
const { Op } = require("sequelize");

const deleteHouseServices = async (HouseId, AddressId) => {
  try {
    await deleteModelData(db, 'managetypehouse', HouseId);
    await deleteModelData(db, 'manageplaceoffer', HouseId);
    await deleteModelData(db, 'manageimg', HouseId);
    await deleteAllImgEmpty(db);
    await deleteModelData(db, 'house', HouseId);
    await deleteModelData(db, 'address', AddressId);
  } catch (error) {
    console.log(error);
    return { error }
  }
}

const deleteModelData = async (db, models, data) => {
  try {
    const deleteAllData = await db[models].destroy({ where: data });
    return deleteAllData;
  } catch (error) {
    console.log(error);
    return { error };
  }
};


const deleteAllImgEmpty = async (db) => {
  try {
    const dataForDel = await db.img.findAll({
      include: [
        {
          model: db.manageimg,
          required: false,
          attributes: [],
          where: { ImgId: { [Op.ne]: null } },
        },
      ],
    });

    if (dataForDel.length > 0) {
      const deleteAllData = await Promise.all(
        dataForDel.map((img) => img.destroy())
      );
      return deleteAllData;
    }

    return dataForDel;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = {
  deleteHouseServices: deleteHouseServices
}