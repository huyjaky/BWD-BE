const { v4: uuidv4 } = require('uuid');
const { modifierHouseServices } = require("../services/modifierHouseServices");
const statusReturn = require("../untils/statusReturn");


const modifierHouse = async (req, res) => {
  try {
    const data = req.body;
    const house = {
      HouseId: data.HouseId,
      Title: data.Title,
      DateUp: data.DateUp,
      Description: data.Description,
      Price: data.Price,
      Area: data.Area,
      NumsOfBed: data.NumsOfBed,
      NumsOfBath: data.NumsOfBath,
      Capacity: data.Capacity,
      Orientation: data.Orientation,
      PostBy: data.PostBy,
      AddressId: data.AddressId,
      JudicalId: data.JudicalId,
    }

    const address = {
      AddressId: data.address.AddressId,
      addressLine: data.address.addressLine,
      adminDistrict: data.address.adminDistrict,
      countryRegionIso2: data.address.countryRegionIso2,
      postalCode: data.address.postalCode,
      streetName: data.address.streetName,
      countryRegion: data.address.countryRegion,
      formattedAddress: data.address.formattedAddress,
      locality: data.address.locality,
      latitude: data.address.latitude,
      longitude: data.address.longitude,
      title: data.address.title,
    }

    const placeOffer = data.placeOffer;
    const arrImg = data.arrImg.map((item,index)=>{
      return {
        ImgId: uuidv4(),
        Path: item.Path
      }
    });
    console.log('arrims', arrImg.length, arrImg);

    const mod = await modifierHouseServices(house, address, placeOffer, arrImg);
    console.log(mod);
    return res.status(200).json({message: 'done'});
  } catch (error) {
    console.log(error);
    return statusReturn.statusReturn(res, 500, "Something went wrong", error)
  }
}

module.exports = {
  modifierHouse: modifierHouse
}