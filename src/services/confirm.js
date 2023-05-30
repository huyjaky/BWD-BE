const { Op } = require("sequelize")
const db = require("../models");
const { createData } = require("../controllers/common");


const isExistSchedule = async ({ HouseId, UserId, PhoneNumber, Date, Adults, Childrens,
  Infants
}) => {
  try {
    const isExist = db.schedule.findAll({
      where: {
        [Op.and]: [
          { HouseId: HouseId },
          { UserId: UserId }
        ]
      }
    });
    if (isExist.length != 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return { error }
  }
}



module.exports = {
  isExistSchedule: isExistSchedule
}