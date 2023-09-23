'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class managetypehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      managetypehouse.belongsTo(models.house, {foreignKey: 'HouseId'});
      managetypehouse.belongsTo(models.typehouse, {foreignKey: 'TypeHouseId'});
    }
  }
  managetypehouse.init({
    HouseId: DataTypes.STRING,
    TypeHouseId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'managetypehouse',
    timestamps: false,
    tableName: 'ManageTypeHouse',
  });

  return managetypehouse;
}