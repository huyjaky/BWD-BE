const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/private/img')
  },
  filename: function (req, file, cb) {
    const uuid = Date.now() + '-' + uuidv4();
    cb(null, uuid + '-' + file.originalname);
  }
})

module.exports = storage;