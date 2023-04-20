"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class managePlaceOffer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      managePlaceOffer.belongsTo(models.placeOffer, {foreignKey: 'PlaceOfferId'});
      managePlaceOffer.belongsTo(models.house, {foreignKey: 'HouseId'});
    }
  }
  managePlaceOffer.init(
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
      modelName: "managePlaceOffer",
      timestamps: false,
      tableName: "ManagePlaceOffer",
    }
  );

  return managePlaceOffer;
};
