'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class useracc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      useracc.hasOne(models.house, {foreignKey: 'PostBy'});
      useracc.hasOne(models.rentalperiod, {foreignKey: 'UserId'})
      useracc.hasOne(models.rate, {foreignKey: 'UserId'})

    }
  }
  useracc.init({
    // primary key
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },

    UserName: DataTypes.STRING,
    Password: DataTypes.STRING,
    Birth: DataTypes.DATE,
    Gmail: DataTypes.STRING,
    Sex: DataTypes.STRING,
    Decentralization: DataTypes.STRING,
    PersonCode: DataTypes.STRING,
    CustomerType: DataTypes.STRING,
    Image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'useracc',
    timestamps: false,
    tableName: 'UserAcc',
  });

  return useracc;
}