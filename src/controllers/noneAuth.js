
const db = require("../models");
const ModelFunc = require("../services/ModelFunc");
const { FilterService } = require("../services/filter");
const getHouse_ = require("../services/getHouse_");
const statusReturn = require("../untils/statusReturn");

const getHouse = async (req, res) => {
  const page = req.params._page;
  const id = req.params.id;
  const UserId = req.query.userid;

  try {
    const getAll = await getHouse_.getHouseServices(page, id, UserId);
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
    console.log(error);
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
}

const Filter = async (req, res) =>{
  try {
    const val = req.body;
    const page= req.params._page
    console.log('filter: ', val.datafil.filter);

    const fil = await FilterService(val.datafil.filter, val.datafil.selectPlace, page, val.UserId);

    if (fil?.error) {
      return statusReturn.statusReturn(
        res,
        500,
        "Something went wrong",
        fil.error
      );
    }
    return res.status(200).json(fil);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getHouse: getHouse,
  Filter: Filter
}