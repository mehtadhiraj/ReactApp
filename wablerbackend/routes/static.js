var express = require('express');
var router = express.Router();
var staticController = require('../controllers/staticController');

/* GET home page. */
router.get('/', staticController.index);

module.exports = router;