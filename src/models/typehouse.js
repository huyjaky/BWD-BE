'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class typeHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      typeHouse.hasOne(models.manageTypeHouse, {foreignKey: 'TypeHouseId'})
    }
  }
  typeHouse.init({
    TypeHouse: DataTypes.STRING,

    // primary key
    TypeHouseId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'typeHouse',
    timestamps: false,
    tableName: 'TypeHouse',
  });

  return typeHouse;
}