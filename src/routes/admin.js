var express = require('express');
var router = express.Router();

const {index} = require('../Controllers/adminController')
const adminCheck = require('../middlewares/adminCheck')

/* GET home page. */
router.get('/', adminCheck, index);

module.exports = router;
