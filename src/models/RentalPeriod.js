'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rentalPeriod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rentalPeriod.belongsTo(models.house, {foreignKey: 'HouseId'});
      rentalPeriod.belongsTo(models.userAcc, {foreignKey: 'UserId'});
    }
  }
  rentalPeriod.init({
    HouseId: DataTypes.STRING,
    UserId: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'rentalPeriod',
    timestamps: false,
    tableName: 'RentalPeriod',
  });

  return rentalPeriod;
}