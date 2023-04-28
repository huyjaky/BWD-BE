const getModelData = async (db, models, conditions, page) => {
  try {
    if (conditions) {
      const cond = await db[models].findByPk(conditions);
      return cond;
    } else {

      let getAll;
      const pagination = {};
      if (page) {
        const perPage = 10;
        const offSet = (page - 1) * perPage;
        getAll = await db[models].findAll({
          limit: perPage,
          offSet: offSet,
        });
        pagination = {_page: page, _limit: perPage};

      } else { // page not exit get all data
        getAll = await db[models].findAll();
      }
      return {data: getAll, pagination: pagination || null};
    }
  } catch (error) {
    return { error };
  }

};

const deleteModelData = async (db, models, conditions) => {
  try {
    if (conditions) {
      const cond = await db[models].findByPk(conditions);
      await cond.destroy();
    } else {
      const deleteAllData = await db[models].destroy({ where: {} });
      return deleteAllData;
    }
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
    return { error }
  }
}

module.exports = {
  getModelData: getModelData,
  deleteModelData: deleteModelData,
  createModel: createModel
};
