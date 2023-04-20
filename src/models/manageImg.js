'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class manageImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      manageImg.belongsTo(models.img, {foreignKey: 'ImgId'});
      manageImg.belongsTo(models.house, {foreignKey: 'HouseId'});
    }
  }
  manageImg.init({
    HouseId: DataTypes.STRING,
    ImgId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'manageImg',
    timestamps: false,
    tableName: 'ManageImg',
  });

  return manageImg;
}