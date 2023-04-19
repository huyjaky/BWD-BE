'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class typehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  typehouse.init({
    TypeHouse: DataTypes.STRING,

    // primary key
    TypeHouseId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: '',
        key: '',
      }
    }

  }, {
    sequelize,
    modelName: 'typehouse',
    timestamps: false,
    tableName: 'typehouse',
  });

  return typehouse;
}