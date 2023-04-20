'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userAcc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userAcc.hasOne(models.house, {foreignKey: 'PostBy'});
      userAcc.hasOne(models.rentalPeriod, {foreignKey: 'UserId'})
      userAcc.hasOne(models.rate, {foreignKey: 'UserId'})

    }
  }
  userAcc.init({
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
    CustomerType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userAcc',
    timestamps: false,
    tableName: 'UserAcc',
  });

  return userAcc;
}