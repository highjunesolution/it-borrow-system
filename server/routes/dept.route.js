const express = require('express');
const { create, list, update, del } = require('../controllers/dept.controller');
const { auth, adminAuth } = require('../middlewares/auth.middleware')
const router = express.Router();


// create
router.post('/department', auth, adminAuth, create)

// get all
router.get('/departments', list)

// update
router.put('/department/:id', auth, adminAuth, update)

// disable
router.delete('/department/dis/:id', auth, adminAuth, del)

module.exports = router