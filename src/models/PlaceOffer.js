'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class placeoffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      placeoffer.hasOne(models.manageplaceoffer, {foreignKey: 'PlaceOfferId'});

    }
  }
  placeoffer.init({
    PlaceOffer: DataTypes.STRING,

    // primary key
    PlaceOfferId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },

  }, {
    sequelize,
    modelName: 'placeoffer',
    timestamps: false,
    tableName: 'PlaceOffer',
  });

  return placeoffer;
};