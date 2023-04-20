'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ward.hasOne(models.address, {foreignKey: 'WardId'});
    }
  }
  ward.init({
    Ward: DataTypes.STRING,

    // primary key
    WardId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    }

  }, {
    sequelize,
    modelName: 'ward',
    timestamps: false,
    tableName: 'Ward',
  });

  return ward;
}