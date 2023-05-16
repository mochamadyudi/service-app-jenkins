'use strict';
require('dotenv/config')
const moment = require("moment");
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert('exp_options', [
            {
                opt_name: "role",
                opt_type: "default",
                opt_value_type:"string",
                opt_value: "unverified",
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                opt_name: "domain",
                opt_type: 'default',
                opt_value_type:"string",
                opt_value: process.env.DOMAIN || 'localhost:3000',
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                opt_name: "email",
                opt_type: "default",
                opt_value_type:"object",
                opt_value: JSON.stringify({
                    url:process.env.SMTP_URL,
                    user:process.env.SMTP_USER,
                    pass:process.env.SMTP_PASS,
                    port:process.env.SMTP_PORT
                }),
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                opt_name: "admin_email",
                opt_type: "default",
                opt_value_type:"string",
                opt_value: process.env.SMTP_EMAIL_FROM || null,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            },

        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
