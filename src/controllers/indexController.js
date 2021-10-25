

module.exports = {
    home: (req,res) => {
        const products = require('../data/products.json');
        return res.render('./publics/index',{
            products : products.filter( product => product.discount >= 30)
        } )
    },
}