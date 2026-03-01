const express = require('express');
const { create, list, update, del } = require('../controllers/dept.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();


// create
router.post('/department', authMiddleware.auth, authMiddleware.adminAuth, create)

// get all
router.get('/department', authMiddleware.auth, list)

// update
router.put('/department/:id', authMiddleware.auth, authMiddleware.adminAuth, update)

// disable
router.delete('/department/dis/:id', authMiddleware.auth, authMiddleware.adminAuth, del)

module.exports = router