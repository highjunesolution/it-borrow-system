const express = require('express');
const categoryController = require('../controllers/category.controller');
const router = express.Router();

// Category

// create
router.post('/category', categoryController.create)

// update
router.put('/category/:categoryId', categoryController.update)

// delete
router.delete('/category/dis/:categoryId', categoryController.remove)

module.exports = router