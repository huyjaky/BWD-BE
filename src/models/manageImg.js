'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class manageimg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      manageimg.belongsTo(models.img, {foreignKey: 'ImgId'});
      manageimg.belongsTo(models.house, {foreignKey: 'HouseId'});
    }
  }
  manageimg.init({
    HouseId: DataTypes.STRING,
    ImgId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'manageimg',
    timestamps: false,
    tableName: 'ManageImg',
  });

  return manageimg;
}