'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class manageTypeHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      manageTypeHouse.belongsTo(models.house, {foreignKey: 'HouseId'});
      manageTypeHouse.belongsTo(models.typeHouse, {foreignKey: 'TypeHouseId'});
    }
  }
  manageTypeHouse.init({
    Judical: DataTypes.STRING,

    // primary key
    JudicalId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'manageTypeHouse',
    timestamps: false,
    tableName: 'ManageTypeHouse',
  });

  return manageTypeHouse;
}