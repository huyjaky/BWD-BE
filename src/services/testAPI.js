const db = require("../models");

let test = async () => {
  try {
    const getall = await db.house.findAll({
      include: [
        {
          model: db.userAcc,
          required: true,
          where: {
            UserId: db.sequelize.col("house.PostBy"),
          },
        }
      ]
    });
    console.log("check");
    return getall;
  } catch (error) {
    return "error" + error;
  }
};

module.exports = {
  test: test,
};
