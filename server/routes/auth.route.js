const express = require('express');
const authController = require('../controllers/auth.controller');
const { auth, adminAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

// login
router.post('/login', authController.login)

router.get('/current-user', auth, authController.currentUser)
router.get('/current-admin', auth, adminAuth, authController.currentUser)

module.exports = router