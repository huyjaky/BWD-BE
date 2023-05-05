const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Auth = require("../services/Auth");
const { statusReturn } = require("../untils/statusReturn");
const moment = require("moment");

dotenv.config();

const Login = async (req, res) => {
  const data = req.body;
  const user = await Auth.userExist(req.body);
  // if user have error return
  if (user?.error || !user) {
    console.log(user.error);
    return statusReturn(res, 500, "Something went wrong", user.error);
  }

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = await Auth.saveRefreshToken(
    jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
  );
  // if save refreshToken in dtb have error return
  if (refreshToken?.error)
    return statusReturn(res, 500, "Something went wrong", refreshToken.error);

  const unixTime = Math.floor(new Date(Date.now()).getTime() + (60 * 60) / 1000);

  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: unixTime * 1000,
    status: "Login successfully",
  });
};

const Refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const refreshTokenExist = Auth.refreshTokenExist(refreshToken);
  if (!refreshTokenExist || refreshToken?.error)
    return statusReturn(
      res,
      500,
      "Something went wrong",
      refreshTokenExist.error
    );

  const { username, password } = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const accessToken = jwt.sign(
    { username: username, password: password },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const unixTime = Math.floor(new Date(Date.now()).getTime() + (60 * 60) / 1000);

  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: unixTime * 1000,
    status: "Refresh Successfully",
  });
};

const Logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const del = await Auth.deleteRefreshToken(refreshToken);
  if (!del || del?.error)
    return statusReturn(res, 500, "Something went wrong", del.error);
  return res.status(200).json({ message: "Logout successfully" });
};

module.exports = {
  Login: Login,
  Refresh: Refresh,
  Logout: Logout,
};
