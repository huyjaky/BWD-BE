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
    return ;
  } catch (error) {
    console.log(error);
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
}


const CreateHouseServices = async (House, Address, TypeArr, PlaceOffer) => {
  try {
    await createSingleModel(db, 'address', Address);
    await createSingleModel(db, 'house', House);
    await createModel(db, 'manageimg', arrImg_.map((item, index)=>{
      return {HouseId: House.HouseId, ImgId: item.ImgId}
    }));
    arrImg_=[]
    await createModel(db, 'managetypehouse', TypeArr.map((item, index)=>{
      return {HouseId: House.HouseId, TypeHouseId: item}
    }));
    await createModel(db, 'manageplaceoffer', PlaceOffer.map((item,index)=>{
      return {PlaceOfferId: item.PlaceOfferId, HouseId:House.HouseId}
    }));
    console.log('finish');

  } catch (error)  {
    console.log(error);
    return {error: error};
  }
}

const createSingleModel = async (db, models, data) => {
  try {
    const result = await db[models].create(data);
    return result;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

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
  CreateHouseServices: CreateHouseServices,
  postImg: postImg
}