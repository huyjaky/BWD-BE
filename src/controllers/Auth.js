const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Auth = require("../services/Auth");
const { statusReturn } = require("../untils/statusReturn");
const moment = require("moment");
const db = require("../models");

dotenv.config();

const Login = async (req, res) => {
  const data = req.body;
  const user = await Auth.userExist(req.body);
  // if user have error return
  if (user?.error || user == false) {
    console.log(user.error);
    return statusReturn(res, 500, "Something went wrong 1", user.error);
  }

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = await Auth.saveRefreshToken(
    jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
  );
  // if save refreshToken in dtb have error return
  if (refreshToken?.error) {
    console.log(refreshToken?.error);
    return statusReturn(res, 500, "Something went wrong 2", refreshToken.error);
  }

  return res.status(200).json({
    userAcc: user,
    token: {
      accessToken: accessToken,
      refreshToken: refreshToken,
      status: "Login successfully",
    }
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
      expiresIn: "1d",
    }
  );

  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    status: "Refresh Successfully",
  });
};

const Logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const del = await Auth.deleteRefreshToken(refreshToken);
  if (!del || del?.error) return statusReturn(res, 500, "Something went wrong", del.error);
  return res.status(200).json({ message: "Logout successfully" });
};

module.exports = {
  Login: Login,
  Refresh: Refresh,
  Logout: Logout,
};
