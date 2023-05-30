const getHouse_ = require("../services/getHouse_");
const statusReturn = require("../untils/statusReturn");

const getHouseUser = async (req, res) => {
  const userId = req.params.userid;

  console.log('userid: ', userId);
  try {
    const getHouse = await getHouse_.getHouseUser(userId);
    if (getHouse.error) {
      return statusReturn.statusReturn(res, 500, "Something went wrong", error);
    }
    return res.status(200).json({getHouse: getHouse})
  } catch (error) {
    console.log("check");
    return statusReturn.statusReturn(res, 500, "Something went wrong", error);
  }
}

module.exports = {
  getHouseUser: getHouseUser
}