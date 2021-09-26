const products = require('../data/products.json');

module.exports = {
    home: (req,res) => {

        res.render('./publics/index',{
            products : products.filter( product => product.discount >= 30)
        } )
    },
}