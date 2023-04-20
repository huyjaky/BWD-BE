'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class house extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      house.hasOne(models.manageTypeHouse, {foreignKey: 'HouseId'});
      house.hasOne(models.managePlaceOffer, {foreignKey: 'HouseId'});

      house.belongsTo(models.address, {foreignKey: 'AddressId'});
      house.belongsTo(models.judical, {foreignKey: 'JudicalId'});
    }
  }
  house.init({
    // primary key
    HouseId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    Title: DataTypes.STRING,
    DateUp: DataTypes.DATE,
    Price: DataTypes.FLOAT,
    Area: DataTypes.STRING,
    NumsOfBed: DataTypes.INTEGER,
    NumsOfBath: DataTypes.INTEGER,

    // foreign key
    PostBy: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: '',
        key: ''
      }
    },
    AddressId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: '',
        key: '',
      }
    },
    JudicalId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: '',
        key: ''
      }
    }

  }, {
    sequelize,
    modelName: 'house',
    timestamps: false,
    tableName: 'House',
  });

  return house;
}