'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      address.belongsTo(models.district, {foreignKey: 'DistrictId'});
      address.belongsTo(models.ward, {foreignKey: 'WardId'});

      address.hasOne(models.house, {foreignKey: 'AddressId'});
    }
  }
  address.init({
    // primary key
    AddressId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    DistrictId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    WardId: {
      type: DataTypes.STRING,
      allowNull: true,
    }

  }, {
    sequelize,
    modelName: 'address',
    timestamps: false,
    tableName: 'Address',
  });

  return address;
}