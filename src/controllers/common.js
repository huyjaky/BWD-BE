const db = require("../models");
const ModelFunc = require("../services/ModelFunc");
const statusReturn = require("./statusReturn");

const getData = async (req, res) => {
  const model = req.params.model;
  const cond = req.params.id;
  const page = req.query._page;
  try {
    const getAll = await ModelFunc.getModelData(db, model, cond, page);
    if (getAll.error || getAll == null) {
      return statusReturn.statusReturn(res, 500, "Something went wrong", getAll.error);
    }

    return res.status(200).json(getAll);
  } catch (error) {
    console.log("check");
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
};

const deleteData = async (req, res) => {
  const model = req.params.model;
  const cond = req.params.id;
  try {
    const deleteAll = await ModelFunc.deleteModelData(db, model, cond);

    if (deleteAll.error != null || deleteAll == null) {
      return statusReturn.statusReturn(res, 500, "Something went wrong", deleteAll.error);
    }
    return res.status(200).json(deleteAll);
  } catch (error) {
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
};



module.exports = {
  getData: getData,
  deleteData: deleteData
};
