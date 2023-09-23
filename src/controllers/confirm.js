const db = require("../models");
const { createModel } = require("../services/ModelFunc");
const { isExistSchedule } = require("../services/confirm");

const confirm = async (req, res) =>{
  try {
    const isExist = await isExistSchedule(req.body);

    if (isExist) {
      return res.status(200).json({isExist: isExist});
    } else {
      
      const cre = createModel(db, req.body, 'schedule');
      return res.status(200).json({isExist: isExist, message: 'Done create schedule'});
    }
  } catch (error) {
    console.log(error);
    return statusReturn.statusReturn(res, 500, "Something went wrong schedule", error);
  }
}

module.exports = {
  confirm: confirm
}