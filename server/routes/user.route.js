const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router()

// Create, register
router.post('/user', userController.create)

// Get all users
router.get('/users', userController.list)

// Get user
router.get('/user/:userId', userController.getUser)

// Update user
router.put('/user/:userId', userController.update)

// Disable active user
router.put('/user/dis/:userId', userController.disable)

module.exports = router