const express = require('express');
const { create, list, update, del} = require('../controllers/dept.controller');
const router = express.Router();


// create
router.post('/department', create)

// get all
router.get('/department', list)

// update
router.put('/department/:id', update)

// disable
router.delete('/department/dis/:id', del)

module.exports = router