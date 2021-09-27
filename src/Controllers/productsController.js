const products = require('../data/products.json');
const animals = require('../data/animals.json');
const categories = require('../data/categories.json');
const subCategories = require('../data/subCategories.json');
const labels = require('../data/labels.json');


module.exports = {
    list: (req,res) => {
        res.render('./products/catalogo', {
            products
        })
    },
    detail: (req,res) => {
        //encuentro el producto
        let product = products.find( product => product.id === +req.params.id);
        //en las propiedades del producto le agrego los datos de las categorias, de esta manera solo mando un objeto con todo lo que necesito dentro
        product.animal = animals.find(animal => animal.id === product.animal)
        product.category = categories.find(category => category.id === product.category)
        product.subCategory = subCategories.find(subCategory => subCategory.id === product.subCategory)
        product.label = labels.find(label => label.id === product.label)
        
        res.render('./products/productDetail', {
            product
        })
    },
    create: (req,res) => {
        res.render('./products/productCreate', {
            animals,
            categories,
            subCategories,
            labels
        })
    },
    createProcess: (req, res) => {

        return res.send(req.body)


        res.redirect('/products')
    },
    edit: (req,res) => {
        res.render('./products/productEdit', {
            product: products.find( product => product.id === +req.params.id),
            animals,
            categories,
            subCategories,
            labels
        })
    },
    editProcess: (req,res) => {
        
    },
    destroy: (req,res) => {

    }

}