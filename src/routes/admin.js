var express = require('express');
var router = express.Router();

const {index} = require('../controllers/adminController')

/* GET home page. */
router.get('/', index);


module.exports = router;
