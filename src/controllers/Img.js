const getImage = async (req, res) => {
  try {
    const imagePath = path.join(__dirname, '../../', req.params[0] ); // đường dẫn tới file ảnh
    return res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
    console.log('sua loi');
    return res.json(error);
  }
}

module.exports = {
  getImage: getImage
}