const express = require('express');
const userController = require('../controllers/user.controller');
const { auth, adminAuth } = require('../middlewares/auth.middleware');
const router = express.Router()

// Create, Register
router.post('/user', userController.create)

// Get all users
router.get('/users', auth, adminAuth, userController.list)

// Get user
router.get('/user/:userId', auth, userController.getUser)

// Update user
router.put('/user/:userId', auth, userController.update)

// Disable active user
router.put('/user/dis/:userId', auth, adminAuth, userController.disable)

module.exports = router