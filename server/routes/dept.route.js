const express = require('express');
const { create, list, update } = require('../controllers/dept.controller');
const router = express.Router();


// create
router.post('/department', create)

// get all
router.get('/department', list)

// update
router.put('/department/:id', update)

// disable
router.put('/department/del/:id', update)

module.exports = router