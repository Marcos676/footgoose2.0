var express = require('express');
var router = express.Router();

//importaciones
const { list, detail, create, createProcess, edit, editProcess, destroy } = require('../controllers/productsController');
const uploadImgProduct = require('../middlewares/uploadImgProduct')
const adminCheck = require('../middlewares/adminCheck')

//La ruta viene de:   /productos
//Listar
router.get('/', list);

//Detalle
router.get('/detalle/:id', detail);

//crear
router.get('/crear', adminCheck, create)
router.post('/crear', uploadImgProduct.array('img'), createProcess)

//Editar
router.get('/editar/:id', adminCheck, edit);
router.put('/editar/:id', uploadImgProduct.array('img'), editProcess)

//Borrar
router.delete('/borrar/:id', destroy);

module.exports = router;