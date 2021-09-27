var express = require('express');
const { list, detail, create, createProcess, edit } = require('../Controllers/productsController');
var router = express.Router();



//La ruta viene de:   /productos
//Listar
router.get('/', list);

//Detalle
router.get('/detalle/:id', detail);

//crear
router.get('/crear', create)
router.post('/crear', createProcess)

//Editar
router.get('/editar/:id', edit);

//Borrar


module.exports = router;
