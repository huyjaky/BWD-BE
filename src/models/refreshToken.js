'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  refreshToken.init({
    RefreshToken: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'refreshToken',
    timestamps: false,
    tableName: 'RefreshToken',
  });
  return refreshToken;
}

