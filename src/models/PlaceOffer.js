'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class placeOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      placeOffer.hasOne(models.managePlaceOffer, {foreignKey: 'PlaceOfferId'});

    }
  }
  placeOffer.init({
    PlaceOffer: DataTypes.STRING,

    // primary key
    PlaceOfferId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'placeOffer',
    timestamps: false,
    tableName: 'PlaceOffer',
  });

  return placeOffer;
};