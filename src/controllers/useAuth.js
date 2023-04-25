const jwt = require("jsonwebtoken");
const { statusReturn } = require("./statusReturn");
const dotenv = require('dotenv');

dotenv.config();

const verify = (req, res, next) => {
  try {
    const accessToken = req.headers['authorization'].split(' ')[1];
    console.log(accessToken);
    console.log(process.env.ACCESS_TOKEN_SECRET);
    const auth = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    console.log(error);
    return statusReturn(res, 500, 'Authorization', error)
  }
};

module.exports = {
  verify: verify,
};
