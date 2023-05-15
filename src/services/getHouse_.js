const db = require("../models");
const getHouseServices = async () => {
  try {
    const getHouse_ = await db.house.findAll({
      include: [
        {
          model: db.address,
          required: true,
        },
        {
          model: db.useracc,
          required: true,
          attributes: ['UserId', 'UserName', 'Gmail']
        },
      ],
    });
    return getHouse_;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getHouseServices: getHouseServices,
};
