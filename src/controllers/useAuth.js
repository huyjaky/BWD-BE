const jwt = require("jsonwebtoken");
const { statusReturn } = require("./statusReturn");
const dotenv = require('dotenv');

dotenv.config();

const verify = (req, res, next) => {
  try {
    const accessToken = req.headers['authorization'].split(' ')[1];
    const auth = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    return statusReturn(res, 500, 'Authorization', error)
  }
};

module.exports = {
  verify: verify,
};
