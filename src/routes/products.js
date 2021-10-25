var express = require('express');
var router = express.Router();

//importaciones
const { list, detail, create, createProcess, edit, editProcess, destroy } = require('../controllers/productsController');
const uploadImgProduct = require('../middlewares/uploadImgProduct')

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
router.put('/editar/:id', uploadImgProduct.array('img'), editProcess)

//Borrar
router.post('/borrar/:id', destroy);

module.exports = router;
