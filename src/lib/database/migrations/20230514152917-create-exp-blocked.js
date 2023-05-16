'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exp_blockeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ip_address: {
        unique:true,
        type: Sequelize.STRING
      },
      expiresIn: {
        type: Sequelize.DATE
      },
      is_block: {
        allowNull:false,
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      type: {
        allowNull:true,
        type: Sequelize.STRING,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('exp_blockeds');
  }
};