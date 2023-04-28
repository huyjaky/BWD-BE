"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class manageplaceoffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      manageplaceoffer.belongsTo(models.placeoffer, {foreignKey: 'PlaceOfferId'});
      manageplaceoffer.belongsTo(models.house, {foreignKey: 'HouseId'});
    }
  }
  manageplaceoffer.init(
    {
      PlaceOfferId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "placeOffer",
          key: "PlaceOfferId",
        },
      },
      HouseId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "house",
          key: "HouseId",
        },
      },
    },
    {
      sequelize,
      modelName: "manageplaceoffer",
      timestamps: false,
      tableName: "ManagePlaceOffer",
    }
  );

  return manageplaceoffer;
};
