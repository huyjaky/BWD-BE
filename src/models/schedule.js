
'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      schedule.belongsTo(models.house, {foreignKey: 'HouseId'});
      schedule.belongsTo(models.useracc, {foreignKey: 'UserId'});
    }
  }
  schedule.init({
    HouseId: DataTypes.STRING,
    UserId: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Date: DataTypes.DATE,
    Adults: DataTypes.NUMBER,
    Childrens: DataTypes.NUMBER,
    Infants: DataTypes.NUMBER,
    Host:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'schedule',
    timestamps: false,
    tableName: 'Schedule',
  });

  return schedule;
}