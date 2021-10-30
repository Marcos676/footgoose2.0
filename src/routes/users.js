var express = require('express');
var router = express.Router();

const {loginRegister, profile, loginProcess, registerProcess, logout} = require('../controllers/userController')

//middlewares
let userCheck = require('../middlewares/userCheck');
let userloginCheck = require('../middlewares/userloginCheck');

/* GET home page. */

router.get('/ingresar', userCheck, loginRegister);
router.post('/registro', registerProcess)
router.post('/login', loginProcess)
router.get('/perfil', userloginCheck, profile);
router.get('/logout', logout);

module.exports = router;
