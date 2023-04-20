const db = require("../models");

let test = async () => {
  try {
    const getall = await db.managePlaceOffer.findAll({
      include: [
        {
          model: db.placeOffer,
          required: true,
          where: {
            PlaceOfferId: db.sequelize.col("managePlaceOffer.PlaceOfferId"),
          },
        },
        {
          model: db.house,
          required: true,
          where: {
            HouseId: db.sequelize.col("managePlaceOffer.HouseId"),
          },
        },
      ]
    });
    console.log("check");
    return getall;
  } catch (error) {
    console.log(error);
    return 'error' + error;
  }
};

module.exports = {
  test: test,
};
