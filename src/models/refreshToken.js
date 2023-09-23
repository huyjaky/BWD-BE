'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refreshtoken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  refreshtoken.init({
    RefreshToken: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'refreshtoken',
    timestamps: false,
    tableName: 'RefreshToken',
  });
  return refreshtoken;
}

