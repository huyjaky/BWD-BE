'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaceOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  PlaceOffer.init({
    PlaceOffer: DataTypes.STRING,

    // primary key
    PlaceOfferId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: '',
        key: '',
      }
    }

  }, {
    sequelize,
    modelName: 'PlaceOffer',
    timestamps: false,
    tableName: 'PlaceOffer',
  });

  return PlaceOffer;
};