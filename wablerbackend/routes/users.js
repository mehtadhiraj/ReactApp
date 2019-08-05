var express = require('express');
var router = express.Router();
var userController =  require('../controllers/userController');
/* GET users listing. */
router.get('/', userController.index);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;