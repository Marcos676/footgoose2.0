const fs = require("fs")
const path = require("path")
const productsFilePath = path.join(__dirname, '../data/products.json');
const animals = require('../data/animals.json');
const subCategories = require('../data/subCategories.json');
const labels = require('../data/labels.json');

const categories = require('../data/categories.json');
const products = require('../data/products.json');

module.exports = {
    list: (req, res) => {
        const products = require('../data/products.json');
        res.render('./products/catalogo', {
            products
        })
    },
    detail: (req, res) => {
        let productFinded = products.find(product => product.id === +req.params.id);

        let product = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            cuantity: product.cuantity,
            image: product.image,
            label: labels.find(label => label.id === productFinded.label),
            animal: animals.find(animal => animal.id === productFinded.animal),
            category: categories.find(category => category.id === productFinded.category),
            subCategory: subCategories.find(subCategory => subCategory.id === productFinded.subCategory)
        }
        return res.render('./products/productDetail', {
            product
        })
    },
    create: (req, res) => {
        res.render('./products/productCreate', {
            animals,
            categories,
            subCategories,
            labels
        })
    },
    createProcess: (req, res) => {
        const products = require('../data/products.json');

        let { name, description, price, discount, cuantity, label, animal, category, subCategory } = req.body

        let newProduct = {
            id: products[products.length - 1].id + 1,
            name,
            description,
            price: +price,
            discount: +discount,
            cuantity: +cuantity,
            image: req.files.length !== 0 ? req.files.map(img => img.filename) : ["undefinedProduct.png"],
            label: +label,
            animal: +animal,
            category: +category,
            subCategory: +subCategory
        }

        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8')
        res.redirect('/productos')
    },
    edit: (req, res) => {
        const products = require('../data/products.json');
        let productFinded = products.find(product => product.id === +req.params.id);

        let product = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            cuantity: product.cuantity,
            image: product.image,
            label: labels.find(label => label.id === productFinded.label),
            animal: animals.find(animal => animal.id === productFinded.animal),
            category: categories.find(category => category.id === productFinded.category),
            subCategory: subCategories.find(subCategory => subCategory.id === productFinded.subCategory)
        }

        res.render('./products/productEdit', {
            product,
            animals,
            categories,
            subCategories,
            labels
        })
    },
    editProcess: (req, res) => {
        const products = require('../data/products.json');

        let { name, description, price, discount, cuantity, label, animal, category, subCategory } = req.body

        let product = products.find(product => product.id === +req.params.id);

        let productEdited = {
            id: product.id,
            name,
            description,
            price: +price,
            discount: +discount,
            cuantity: +cuantity,
            image: req.files.length !== 0 ? req.files.map(img => img.filename) : product.image,
            label: +label,
            animal: +animal,
            category: +category,
            subCategory: +subCategory
        }

        let productsModified = products.map(product => product.id == productEdited.id ? productEdited : product)

        fs.writeFileSync(productsFilePath, JSON.stringify(productsModified, null, 2), 'utf-8')
        res.redirect('/productos')
    },
    destroy: (req, res) => {
        const products = require('../data/products.json');

        let product = products.find(product => product.id === +req.params.id)

        product.image.forEach(img => {
            if (fs.existSync(path.join(__dirname, "../../public/images/products/" + img)) && img != "undefinedProduct.png") {

                fs.unlinkSynk(path.join(__dirname, "../../public/images/products/" + img))
            }
        })

        return res.redirect('/admin')

    }

}