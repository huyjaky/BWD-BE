const db = require("../models");

const saveRefreshToken = async (refreshToken)=>{
  try {
    const RFT = {RefreshToken: refreshToken};
    const saveRFT = await db.refreshtoken.create(RFT);
    console.log(saveRFT);

    return refreshToken;
  } catch (error) {
    return {error: error}
  }
}

const deleteRefreshToken = async (refreshToken) => {
  try {
    const RFT = {RefreshToken: refreshToken};
    const del = await db.refreshtoken.destroy(RFT);
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
    const RFT = await db.refreshtoken.findAll({
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
  console.log(username, password);
  try {
    const userExist = await db.useracc.findOne({
      where: {
        UserName: username,
        Password: password
      }
    })
    if (userExist) {
      return userExist;
    } else {
      return false;
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