const db = require('../database/models')
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
        let products = db.Product.findAll({
            include: ['images']
        });

        let animals = db.Animal.findAll()

        Promise.all([products, animals])
            .then(([products, animals]) => {
                //return res.send(animals)
                res.render('./products/catalogo', {
                    products,
                    animals
                })
            }).catch(error => res.send(error))

    },
    detail: (req, res) => {

        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: ['images', 'label', {
                association: 'subCategory',
                include: [{
                    association: 'category',
                    include: ['animal']
                }]
            }]
        })
            .then(product => {
                //return res.send(product)
                return res.render('./products/productDetail', {
                    product
                })
            }).catch(error => res.send(error))


    },
    create: (req, res) => {
        let animals = db.Animal.findAll()

        let categories = db.Category.findAll()

        let subCategories= db.SubCategory.findAll()

        let labels= db.Label.findAll()

        Promise.all([animals, categories, subCategories, labels])
        .then(([animals, categories, subCategories, labels]) => {
            res.render('./products/productCreate', {
                animals,
                categories,
                subCategories,
                labels
            })
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
        let productEdited = products.find(product => product.id === +req.params.id);

        let product = {
            id: productEdited.id,
            name: productEdited.name,
            description: productEdited.description,
            price: productEdited.price,
            discount: productEdited.discount,
            cuantity: productEdited.cuantity,
            image: productEdited.image,
            label: labels.find(label => label.id === productEdited.label),
            animal: animals.find(animal => animal.id === productEdited.animal),
            category: categories.find(category => category.id === productEdited.category),
            subCategory: subCategories.find(subCategory => subCategory.id === productEdited.subCategory)
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

        let productToDelete = products.find(product => product.id === +req.params.id)

        // product.image.forEach(img => {
        //     if (fs.existSync(path.join(__dirname, "../../public/images/products/" + img)) && img != "undefinedProduct.png") {

        //         fs.unlinkSynk(path.join(__dirname, "../../public/images/products/" + img))
        //     }
        // })

        let productsModified = products.filter(product => product.id != productToDelete.id)

        fs.writeFileSync(productsFilePath, JSON.stringify(productsModified, null, 2), 'utf-8')

        return res.redirect('/productos')
    }

}