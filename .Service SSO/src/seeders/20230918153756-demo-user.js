'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
     await queryInterface.bulkInsert('Users', [
      {
       email: 'John Doe',
       username: "false",
       password: "24fve32tgrth"
     },

     {
      email: 'John Doe2',
      username: "false23",
      password: "24fve32tasdgrth"
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
