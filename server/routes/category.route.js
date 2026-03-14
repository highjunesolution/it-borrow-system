const express = require('express');
const categoryController = require('../controllers/category.controller');
const { auth, adminAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

// Category

// list
router.get('/categories', categoryController.list)

// create
router.post('/category', auth, adminAuth, categoryController.create)

// update
router.put('/category/:categoryId', auth, adminAuth, categoryController.update)

// delete
router.delete('/category/dis/:categoryId', auth, adminAuth, categoryController.remove)

module.exports = router