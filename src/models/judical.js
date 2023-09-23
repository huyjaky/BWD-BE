'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class judical extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      judical.hasOne(models.house, {foreignKey: 'JudicalId'})
    }
  }
  judical.init({
    Judical: DataTypes.STRING,

    // primary key
    JudicalId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'judical',
    timestamps: false,
    tableName: 'Judical',
  });

  return judical;
}