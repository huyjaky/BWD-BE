'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rentalperiod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rentalperiod.belongsTo(models.house, {foreignKey: 'HouseId'});
      rentalperiod.belongsTo(models.useracc, {foreignKey: 'UserId'});
    }
  }
  rentalperiod.init({
    HouseId: DataTypes.STRING,
    UserId: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'rentalperiod',
    timestamps: false,
    tableName: 'RentalPeriod',
  });

  return rentalperiod;
}