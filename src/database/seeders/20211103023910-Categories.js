'use strict';

let animals = require('../../data/animals.json')

let categoriesJson = require('../../data/categories.json')

let categories = [];

let id = 1

animals.forEach(animal => {
  categoriesJson.forEach(category => {
    let item = {
      ...category,
      id,
      animalId: animal.id,
      createdAt: new Date,
      updatedAt: new Date
    }
    categories.push(item)
    id++
  })
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Categories', categories, {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
