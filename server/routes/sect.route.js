const express = require('express');
const { create, list, update, remove } = require('../controllers/sect.controller');
const router = express.Router();

// create
router.post('/section', create)

// get all
router.get('/sections', list)

// update
router.put('/section/:sectionId', update)

router.delete('/section/dis/:sectionId', remove)

module.exports = router
