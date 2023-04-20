'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rate.belongsTo(models.userAcc, {foreignKey: 'UserId'});
      rate.belongsTo(models.house, {foreignKey: 'HouseId'});
    }
  }
  rate.init({
    UserId: DataTypes.STRING,
    HouseId: DataTypes.STRING,
    Total: DataTypes.INTEGER,
    Point: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'rate',
    timestamps: false,
    tableName: 'District',
  });

  return rate;
}