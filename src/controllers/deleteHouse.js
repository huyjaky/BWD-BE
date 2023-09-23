const deleteHouseServices = require("../services/deleteHouseServices");
const { statusReturn } = require("../untils/statusReturn");


const deleteHouse = async (req, res) => {
  try {
    const HouseId = req.body.HouseId;
    const AddressId = req.body.AddressId;
    console.log(HouseId, AddressId);
    await deleteHouseServices.deleteHouseServices(HouseId, AddressId);
    return res.status(200).json({message: 'delete done'});
  } catch (error) {
    console.log(error);
    return statusReturn(res, 500, 'Have err', error)
  }
}

module.exports = {
  deleteHouse: deleteHouse
}