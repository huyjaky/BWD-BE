

const getModelData = async (db, models, conditions) => {
  try {
    if (conditions) {
      const cond = await db[models].findByPk(conditions);
      return cond;
    } else {
      const getAll = await db[models].findAll();
      return getAll;
    }
  } catch (error) {
    return {error};
  }
}

const deleteModelData = async (db, models, conditions) => {
  try {
    if (conditions) {
      const cond = await db[models].findByPk(conditions);
      await cond.destroy();
    } else {
      const deleteAllData = await db[models].destroy({where: {}});
      return deleteAllData;
    }
  } catch (error) {
    console.log(error);
    return {error};
  }
}

module.exports = {
  getModelData: getModelData,
  deleteModelData: deleteModelData
}