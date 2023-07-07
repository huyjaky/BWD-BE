const getModelData = async (db, models, conditions, page) => {
  try {
    if (conditions) {
      const cond = await db[models].findByPk(conditions);
      return cond;
    } else {
      let getAll;
      const pagination = {};
      if (page) {
        const perPage = 20;
        const offSet = (page - 1) * perPage;
        getAll = await db[models].findAll({
          limit: perPage,
          offSet: offSet,
        });
        pagination = { _page: page, _limit: perPage };
      } else {
        // page not exit get all data
        getAll = await db[models].findAll();
      }
      return { data: getAll, pagination: pagination || null };
    }
  } catch (error) {
    return { error };
  }
};

const getModelDataCond = async (db, models, cond, value) => {
  console.log(cond, value);
  try {
    const cond_ = await db[models].findOne({
      where: { [cond]: value },
    });
    console.log(cond_);
    return cond_;
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

const createModel = async (db, Data, models) => {
  try {
    const dataRaw = Data;
    const data = await db[models].create(dataRaw);
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const modifierData = async (db, data, models, id) => {
  try {
    const entity = await db[models].findByPk(id);
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
  getModelData: getModelData,
  deleteModelData: deleteModelData,
  createModel: createModel,
  modifierData: modifierData,
  getModelDataCond: getModelDataCond,
};
