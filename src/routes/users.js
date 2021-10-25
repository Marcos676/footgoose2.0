var express = require('express');
var router = express.Router();

const {loginRegister, profile, loginProcess, registerProcess, logout} = require('../controllers/userController')

/* GET home page. */

router.get('/ingresar', loginRegister);
router.post('/registro', registerProcess)
router.post('/login', loginProcess)
router.get('/perfil', profile);
router.get('/logout', logout);

module.exports = router;
