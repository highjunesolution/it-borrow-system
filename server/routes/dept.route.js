const express = require('express');
const { create, list, update, del } = require('../controllers/dept.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();


// create
router.post('/department', create)

// get all
router.get('/departments', list)

// update
router.put('/department/:id', update)

// disable
router.delete('/department/dis/:id', del)

module.exports = router