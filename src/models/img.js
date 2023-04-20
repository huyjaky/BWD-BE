'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  img.init({
    ImgId: DataTypes.STRING,

    // primary key
    Path: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'img',
    timestamps: false,
    tableName: 'Img',
  });

  return img;
}