const modifierHouseServices = require("../services/modifierHouseServices");
const { v4: uuidv4 } = require('uuid');

let postImg = async (req, res) => {
  try {
    const files = await req.files;
    return res.json('Finish UpImg');
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}


const postImgModifier = async (req, res) => {
  try {
    const files = await req.files;
    console.log(files);
    const postImg = await modifierHouseServices.postImg(files.map((item,index)=>{
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

module.exports = {
  postImg: postImg,
  postImgModifier: postImgModifier
}