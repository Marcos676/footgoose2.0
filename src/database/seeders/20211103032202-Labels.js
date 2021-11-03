'use strict';

let labelsJson = require('../../data/labels.json')

let labels = [];

labelsJson.forEach(label => {
    let item = {
      ...label,
      createdAt: new Date,
      updatedAt: new Date
    }
    labels.push(item)
  })


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Labels', labels, {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Labels', null, {});
    
  }
};