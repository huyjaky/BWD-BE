const createHouseServices = require("../services/createHouseServices");
const { v4: uuidv4 } = require('uuid');

const postImgCreateHouse = async (req, res) => {
  try {
    const files = await req.files;
    console.log('createhouse', files);

    const postImg = await createHouseServices.postImg(files.map((item,index)=>{
      return{
        Path: item.path,
        ImgId: uuidv4()
      }
    }))
    return res.status(200).json({message:'done'})
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}


const createHouse = async (req, res) => {
  try {
    const data = req.body;
    const AddressId = uuidv4();
    const HouseId = uuidv4();
    const Type = data.typehouse.includes('4') ? 'House for sale' : 'House for rent';
    const PlaceOffer = data.house.placeOffer
    const TypeArr = data.typehouse;

    const house = {
      HouseId: HouseId,
      Title: data.house.Title,
      DateUp: data.house.DateUp,
      Description: data.house.Description,
      Price: data.house.Price,
      Area: 'Vietnam',
      NumsOfBed: data.house.NumsOfBed,
      NumsOfBath: data.house.NumsOfBath,
      Capacity: data.house.Capacity,
      Orientation: data.house.Orientation,
      PostBy: data.house.useracc.UserId,
      AddressId: AddressId,
      JudicalId: '1',
      HostLanguage: 'Vietnamese',
      Type: Type
    }

    const address = {
      AddressId: AddressId,
      addressLine: data.house.address.addressLine,
      adminDistrict: data.house.address.adminDistrict,
      countryRegionIso2: data.house.address.countryRegionIso2,
      postalCode: data.house.address.postalCode,
      streetName: data.house.address.streetName,
      countryRegion: data.house.address.countryRegion,
      formattedAddress: data.house.address.formattedAddress,
      locality: data.house.address.locality,
      latitude: data.house.address.latitude,
      longitude: data.house.address.longitude,
      title: data.house.address.title,
    }

    const create = await createHouseServices.CreateHouseServices(house, address, TypeArr, PlaceOffer);

  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
  createHouse: createHouse,
  postImgCreateHouse: postImgCreateHouse
}