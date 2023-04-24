const db = require("../models");

const saveRefreshToken = async (refreshToken)=>{
  try {
    const RFT = {RefreshToken: refreshToken};
    const saveRFT = await db.refreshToken.create(RFT);
    return refreshToken;
  } catch (error) {
    return {error: error}
  }
}

const deleteRefreshToken = async (refreshToken) => {
  try {
    const RFT = {RefreshToken: refreshToken};
    const del = await db.refreshToken.destroy(RFT);
    if (del != 1) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return {error: error}
  }
}

const refreshTokenExist = async (refreshToken) =>{
  try {
    const RFT = await db.refreshToken.findAll({
      where: {
        RefreshToken: refreshToken
      }
    })
    if (RFT.length == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return {error: error}
  }
}

const userExist = async ({username, password}) => {
  try {
    const userExist = await db.userAcc.findAll({
      where: {
        UserName: username,
        Password: password
      }
    })
    if (userExist.length == 0) {
      return false;
    } else {
      return true;
    }

  } catch (error) {
    return {error: error};
  }
}

module.exports = {
  userExist: userExist,
  saveRefreshToken: saveRefreshToken,
  refreshTokenExist: refreshTokenExist,
  deleteRefreshToken: deleteRefreshToken
}