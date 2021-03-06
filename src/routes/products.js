var express = require('express');
const { list, detail, create, add } = require('../Controllers/productsController');
var router = express.Router();



//La ruta viene de:   /productos
//Listado
router.get('/', list);
//Detalle
router.get('/detalle/:id', detail);

//crear

router.get('/crear', create)
router.post('/crear', add)


module.exports = router;
