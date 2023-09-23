const db = require("../models");
const { Op } = require("sequelize");

let arrImg_ = [];

let postImg = async (arrImg) => {
  try {
    arrImg.map((item, index) => {
      arrImg_.push(item);
      return item;
    })
    await createModel(db, 'img', arrImg);
    return 'finish';
  } catch (error) {
    console.log(error);
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
}

const modifierHouseServices = async (
  house, address, placeOffer, arrImg
) => {
  const {
    AddressId,
    addressLine,
    adminDistrict,
    countryRegionIso2,
    postalCode,
    streetName,
    countryRegion,
    formattedAddress,
    locality,
    latitude,
    longitude,
    title,
  } = address;

  const {
    HouseId,
    Title,
    Dateup,
    Description,
    Price,
    Area,
    NumsOfBed,
    NumsOfBath,
    Capacity,
    Orientation,
    Postby,
    JudicalId,
  } = house;

  try {
    await deleteModelData(db, 'manageimg', {HouseId: HouseId});
    await createModel(db, 'img', arrImg);
    arrImg_ = [...arrImg_, ...arrImg];
    await createModel(db, 'manageimg', arrImg_.map((item, index) => {
      return { HouseId: HouseId, ImgId: item.ImgId }
    }))
    arrImg_ = []

    await modifierData(db, house, 'house', HouseId);
    await modifierData(db, address, 'address', AddressId);
    await deleteModelData(db, 'manageplaceoffer', { HouseId: HouseId });
    await createModel(db, 'manageplaceoffer', placeOffer.map((item, index) => {
      return { PlaceOfferId: item.PlaceOfferId, HouseId: HouseId }
    }));

  } catch (error) {
    console.log(error);
    return;
  }
}



const createModel = async (db, models, data) => {
  try {
    const result = await db[models].bulkCreate(data);
    return result;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const deleteModelData = async (db, models, data) => {
  try {
    const deleteAllData = await db[models].destroy({ where: data });
    return deleteAllData;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const modifierData = async (db, data, models, id) => {
  try {
    const entity = await db[models].findByPk(id);
    console.log('finish', models);
    if (entity) {
      Object.assign(entity, data);
      console.log(entity);
      await entity.save();
      return true;
    }

  } catch (error) {
    console.log(error);
    return { error };
  }
};



module.exports = {
  modifierHouseServices: modifierHouseServices,
  postImg: postImg
}