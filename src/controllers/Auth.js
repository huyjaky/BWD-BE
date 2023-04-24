const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Auth = require("../services/Auth");
const { statusReturn } = require("./statusReturn");

dotenv.config();

const Login = async (req, res) => {
  const data = req.body;
  const user = await Auth.userExist(req.body);
  // if user have error return
  if (user?.error || !user) return statusReturn(res, 500, "Something went wrong", user.error);

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = await Auth.saveRefreshToken(
    jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
  );
  // if save refreshToken in dtb have error return
  if (refreshToken?.error)
    return statusReturn(res, 500, "Something went wrong", refreshToken.error);

  // convert utc time to uix time
  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: expirationTime * 1000,
    status: 'Login successfully'
  });
};

const Refresh = async (req, res) =>{
  const refreshToken = req.body.refreshToken;
  const refreshTokenExist = Auth.refreshTokenExist(refreshToken);
  if (!refreshTokenExist || refreshToken?.error) return statusReturn(res, 500, "Something went wrong", refreshTokenExist.error);

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  // convert utc time to uix time
  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: expirationTime,
    status: 'Refresh Successfully'
  })
}

const Logout = async(req, res) => {
  const refreshToken = req.body.refreshToken;
  const del = await Auth.deleteRefreshToken(refreshToken);
  if (!del || del?.error) return statusReturn(res, 500, 'Something went wrong', del.error);
  return res.status(200).json({message: "Logou successfully"})
};

module.exports = {
  Login: Login,
  Refresh: Refresh
};
