//------------------------------------- EJEMPLOS ---------------------------------------------------------
const faker = require('faker')

let products = [...Array(50)].map(product => (

    product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.datatype.number({ min: 100, max: 9999 }),
      discount: faker.datatype.number({ min: 0, max: 100 }),
      expiration: faker.date.future(),
      cuantity: faker.datatype.number({ min: 0, max: 100 }),
      labelId: faker.datatype.number({ max: 3, min: 1 }),
      subCategoryId: faker.datatype.number({ max: 36, min: 1 }),
      createdAt: new Date,
      updatedAt: new Date
    }
  
  ))

// para correr este archivo y verificar la construccion de los objetos hacer en consola:  node prueba
console.log(products);


//--------------------------------------------------------------------------------------------------

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
// para correr este archivo y verificar la construccion de los objetos hacer en consola:  node prueba
//console.log(images);

//--------------------------------------------------------------------------------------------------


let animalsJson = require('./src/data/animals.json')

let animals = []

animalsJson.forEach(animal => {
  let item = {
    ...animal,
    createdAt: new Date,
    updatedAt: new Date
  }
  animals.push(item)
})

// para correr este archivo y verificar la construccion de los objetos hacer en consola:  node prueba
//console.log(animals);