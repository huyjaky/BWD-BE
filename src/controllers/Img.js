const path = require('path');
const fs = require('fs');

const getImage = async (req, res) => {
  try {
    // I:\BWD\BWD-BE\src\private\images\icons
    console.log(req.params[0]);
    const imagePath = path.join(__dirname, '../../', req.params[0]); // đường dẫn tới file ảnh
    return res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}

const deleteImg = async (req, res) => {
  if (!req.body.nameImg){
    return res.status(200).json({message: 'undefined'});
  }
  try {
    const imagePath = req.body.nameImg; // Đường dẫn ảnh cần xóa
    fs.unlink(path.join(__dirname + '../private/images/', imagePath), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({err: err});
      }
      return res.status(200).json({message: 'Finish'});
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error});
  }
}

module.exports = {
  getImage: getImage,
  deleteImg: deleteImg
}