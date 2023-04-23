'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class district extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      district.hasOne(models.address, {foreignKey: 'DistrictId'});
      
    }
  }
  district.init({
    District: DataTypes.STRING,

    // primary key
    DistrictId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'district',
    timestamps: false,
    tableName: 'District',
  });

  return district;
}