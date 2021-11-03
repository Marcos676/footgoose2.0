'use strict';

let img = 1
const images = []

for (let i = 1; i <= 50; i++) {

  for (let c = 0; c < 2; c++) {
    let image = {
      name: `${img}.jpg`,
      productId: i,
      createdAt: new Date,
      updatedAt: new Date
    }
      if (img === 20) {
          img = 0
        }
        ++img
    images.push(image)
  }

}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('ProductImages', images, {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('ProductImages', null, {});

  }
};
