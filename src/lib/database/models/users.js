'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment");
const {first} = require("lodash");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    isConfirm: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
    hooks: {
      async beforeCreate (attributes, options) {
        let username = attributes?.username
        if(!username) {
          username = `${first(attributes.email.split("@"))}`
          let increment = 1
          let exists = await users.findOne({ where : { username }})

          while(exists){
            increment++;
            username = `${first(attributes.email.split("@"))}_${increment}`;
            exists = await users.findOne({ where: { username }})
          }

        }
        attributes.username = username
        attributes.createdAt = moment()
        attributes.updatedAt = moment()
        attributes.deletedAt = null
      },
      beforeUpdate (attributes, options) {
        attributes.updated_at = moment()
      }
    }
  });
  return users;
};