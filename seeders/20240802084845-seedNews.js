"use strict";
const books = require("../data/berita.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    books.forEach((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Berita", books, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Berita", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
