var express = require('express');
var router = express.Router();

const {loginRegister, profile, loginProcess, registerProcess, logout, editProfile, editProfileProcess} = require('../controllers/userController')

//middlewares
let uploadAvatar = require('../middlewares/uploadAvatar')
let userCheck = require('../middlewares/userCheck');
let userloginCheck = require('../middlewares/userloginCheck');
/* GET home page. */

router.get('/ingresar', userCheck, loginRegister);
router.post('/registro', registerProcess)
router.post('/login', loginProcess)
router.get('/perfil', userloginCheck, profile);

router.get('/logout', userloginCheck, logout);

router.get('/editar', userloginCheck, editProfile);
router.put('/editar', uploadAvatar.single('img'), userloginCheck, editProfileProcess);

module.exports = router;
