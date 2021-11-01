var express = require('express');
var router = express.Router();

const {home} = require('../Controllers/indexController')

/* GET home page. */
router.get('/', home);


module.exports = router;
