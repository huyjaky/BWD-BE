const db = require("../models");
const ModelFunc = require("../services/ModelFunc");
const statusReturn = require("../untils/statusReturn");


const getData = async (req, res) => {
  const model = req.params.model;
  const cond = req.params.id;
  const page = req.query._page;
  try {
    const getAll = await ModelFunc.getModelData(db, model, cond, page);
    if (getAll?.error) {
      return statusReturn.statusReturn(
        res,
        500,
        "Something went wrong",
        getAll.error
      );
    }

    return res.status(200).json(getAll);
  } catch (error) {
    console.log("check");
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
};

const getDataCondition = async (req, res) => {
  const model = req.params.model;
  const cond = req.params.cond;
  const value = req.params.value;
  try {
    const getAll = await ModelFunc.getModelDataCond(db, model, cond, value);
    if (getAll?.error) {
      return statusReturn.statusReturn(
        res,
        500,
        "Something went wrong",
        getAll.error
      );
    }

    return res.status(200).json(getAll);
  } catch (error) {
    console.log("check");
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
};

const deleteData = async (req, res) => {
  const model = req.params.model;

  try {
    const deleteAll = await ModelFunc.deleteModelData(db, model, req.body);

    if (deleteAll?.error) {
      return statusReturn.statusReturn(
        res,
        500,
        "Something went wrong",
        deleteAll.error
      );
    }
    return res.status(200).json(deleteAll);
  } catch (error) {
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
};

const createData = async (req, res) => {
  const model = req.params.model;
  try {
    const cre = await ModelFunc.createModel(db, req.body, model);

    if (cre?.error) {
      return statusReturn.statusReturn(
        res,
        500,
        "Something went wrong",
        cre.error
      );
    }

    return res.status(200).json({ message: "Created!" });
  } catch (error) {
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
};

const modifierData = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const model = req.params.model;
  console.log('come');
  try {
    const modifier = await ModelFunc.modifierData(db, data, model, id);

    if (modifier?.error) {
      return statusReturn.statusReturn(
        res,
        500,
        "Something went wrong",
        modifier.error
      );
    }
    return res.status(200).json({ message: "Done" });
  } catch (error) {
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
};

module.exports = {
  getData: getData,
  deleteData: deleteData,
  createData: createData,
  modifierData: modifierData,
  getDataCondition: getDataCondition
};
