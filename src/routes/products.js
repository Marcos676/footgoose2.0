var express = require('express');
var router = express.Router();

//importaciones
const { list, detail, create, createProcess, edit, editProcess, destroy } = require('../Controllers/productsController');
const uploadImgProduct = require('../utils/uploadImgProduct')

//La ruta viene de:   /productos
//Listar
router.get('/', list);

//Detalle
router.get('/detalle/:id', detail);

//crear
router.get('/crear', create)
router.post('/crear', uploadImgProduct.array('img'), createProcess)

//Editar
router.get('/editar/:id', edit);

//Borrar


module.exports = router;
