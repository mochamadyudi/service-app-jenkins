'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class exp_options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exp_options.init({
    opt_name: DataTypes.STRING,
    opt_type: DataTypes.STRING,
    opt_value_type: DataTypes.STRING,
    opt_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exp_options',
    timestamps:true,
    hooks:{
      async beforeBulkCreate(attributes){
        attributes.map((item)=> {
          item.createdAt = moment()
          item.updatedAt = moment()
        })
      },
      async beforeCreate(attributes){
        attributes.createdAt = moment()
        attributes.updatedAt = null
      },
      async beforeUpdate(attributes){
        attributes.updatedAt = moment()
  }
    }
  });
  return exp_options;
};