var express = require('express');
var router = express.Router();

const {loginRegister} = require('../Controllers/userController')

/* GET home page. */

router.get('/ingresar', loginRegister);


module.exports = router;