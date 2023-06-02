const path = require('path');
const getImage = async (req, res) => {
  try {
    // I:\BWD\BWD-BE\src\private\images\icons
    const imagePath = path.join(__dirname, '../private/images', req.params[0] ); // đường dẫn tới file ảnh
    return res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
}

module.exports = {
  getImage: getImage
}