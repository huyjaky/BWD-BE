const db = require("../models");


let test = async () => {
  try {
    const getall = await db.PlaceOffer.findAll(
      {
        attributes: {exclude: ['id']}
      }
    );
    console.log('check');
    return getall;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  test: test
}