const products = require('../data/products.json');


module.exports = {
    list: (req,res) => {
        res.render('./products/catalogo', {
            products
        })
    },
    detail: (req,res) => {

        res.render('./products/productDetail', {
            product: products.find( product => product.id === +req.params.id)
        })
    },
    create: (req,res) => {
        res.render('./products/productCreate')
    },
    add: (req,res) => {

        return res.send(req.body)


        res.redirect('/products')
    },
}