'use strict';

let animalsJson = require('../../data/animals.json')

let animals = []

animalsJson.forEach(animal => {
  let item = {
    ...animal,
    createdAt: new Date,
    updatedAt: new Date
  }
  animals.push(item)
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Animals', animals, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Animals', null, {});
     
  }
};
