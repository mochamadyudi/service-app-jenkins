'use strict';
const moment = require("moment");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exp_options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      opt_name: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      },
      opt_type: {
        allowNull:false,
        type: Sequelize.STRING
      },
      opt_value_type: {
        allowNull:false,
        defaultValue:'any',
        type: Sequelize.STRING,
      },
      opt_value: {
        type: Sequelize.STRING
      },
      isAllowed:{
        type:Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('exp_options');
  }
};