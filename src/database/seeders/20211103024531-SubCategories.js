'use strict';

let categories = require('../../data/categories.json')

let subCategoriesJson = require('../../data/subCategories.json')

let subCategories = [];

let id = 1

categories.forEach(category => {
  subCategoriesJson.forEach(subCategory => {
    let item = {
      ...subCategory,
      id,
      categoryId: category.id,
      createdAt: new Date,
      updatedAt: new Date
    }
    subCategories.push(item)
    id++
  })
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('SubCategories', subCategories, {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('SubCategories', null, {});
    
  }
};
