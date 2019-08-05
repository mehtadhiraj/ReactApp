const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authRoutes = require('../controllers/auth');

router.get('/', authRoutes.loginCheck, messageController.getMessage );
router.post('/newmessage/:id', authRoutes.loginCheck, authRoutes.checkUser, messageController.newMessage);
router.get('/delmessage/:id', authRoutes.loginCheck, authRoutes.checkUser, messageController.deleteMessage);

module.exports = router;