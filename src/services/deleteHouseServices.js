const db = require("../models");
const { Op } = require("sequelize");

const deleteHouseServices = async (HouseId, AddressId) => {
  try {
    await deleteModelHaveHouseId(db, 'favorite', HouseId);
    await deleteModelHaveHouseId(db, 'managetypehouse', HouseId);
    await deleteModelHaveHouseId(db, 'manageplaceoffer', HouseId);
    await deleteModelHaveHouseId(db, 'manageimg', HouseId);
    await deleteAllImgEmpty(db);
    await deleteModelHaveHouseId(db, 'house', HouseId);

    await deleteModelHaveAddressId(db, 'address', AddressId);
  } catch (error) {
    console.log(error);
    return { error }
  }
}

const deleteModelHaveAddressId =  async (db, models, data) => {

  try {
    const dataForDel = await db[models].findAll({
      where: {AddressId: data}
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

const deleteModelHaveHouseId = async (db, models, data) => {
  // try {
  //   const deleteAllData = await db[models].destroy({ where: data });
  //   return deleteAllData;
  // } catch (error) {
  //   console.log(error);
  //   return { error };
  // }

  try {
    const dataForDel = await db[models].findAll({
      where: {HouseId: data}
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