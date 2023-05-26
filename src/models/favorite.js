
'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorite.belongsTo(models.house, {foreignKey: 'HouseId'});
      favorite.belongsTo(models.useracc, {foreignKey: 'UserId'});
    }
  }
  favorite.init({
    HouseId: DataTypes.STRING,
    UserId: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'favorite',
    timestamps: false,
    tableName: 'Favorite',
  });

  return favorite;
}