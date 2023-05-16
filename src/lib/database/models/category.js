'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment");
const {first} = require("lodash");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init({
    name: DataTypes.STRING,
    summary: DataTypes.STRING,
    content: DataTypes.STRING,
    slug: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'category',
    hooks:{
      async beforeCreate(attributes){
        let newSlug = attributes.name
        let name = attributes.name
        if(newSlug) {
          let increment = 0
          let exists = await category.findOne({ where : { slug:newSlug }})

          while(exists){
            increment++;
            newSlug = `${name.replace(/ /g,'-')}-${increment}`;
            attributes.name = `${name.replace(/ /g,'-')} ${increment}`
            exists = await category.findOne({ where: { slug:newSlug }})

          }

        }
        attributes.slug = newSlug

        attributes.createdAt = moment()
        attributes.updatedAt = null


      },
      async beforeUpdate(attributes){
        attributes.updatedAt = moment()
      }
    }
  });
  return category;
};