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
    }
  }
  address.init({
    // primary key
    AddressId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    addressLine: DataTypes.STRING,
    adminDistrict: DataTypes.STRING,
    countryRegion: DataTypes.STRING,
    formattedAddress: DataTypes.STRING,
    locality: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'address',
    timestamps: false,
    tableName: 'Address',
  });

  return address;
}