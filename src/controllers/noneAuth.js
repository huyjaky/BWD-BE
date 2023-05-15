
const db = require("../models");
const ModelFunc = require("../services/ModelFunc");
const getHouse_ = require("../services/getHouse_");
const statusReturn = require("../untils/statusReturn");

const getHouse = async (req, res) => {
  const cond = req.params.id;

  try {
    const getAll = await getHouse_.getHouseServices();
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
}

module.exports = {
  getHouse: getHouse
}