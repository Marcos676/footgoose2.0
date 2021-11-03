'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [
      {
        firstName: "Marcos",
        lastName: "Patiño",
        email: "admin@123.com",
        password: "$2a$10$2lR2DEUkIdIsfyhlTgU76.MDwmp880oakQCjj4dO/4nIxklwdi3c6",
        admin: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: "Gabriel",
        lastName: "Patiño",
        email: "gaby@123.com",
        password: "$2a$10$2lR2DEUkIdIsfyhlTgU76.MDwmp880oakQCjj4dO/4nIxklwdi3c6",
        admin: 0,
        createdAt: new Date,
        updatedAt: new Date
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
