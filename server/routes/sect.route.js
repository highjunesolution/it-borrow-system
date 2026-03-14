const express = require('express');
const { create, list, update, remove } = require('../controllers/sect.controller');
const { auth, adminAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

// create
router.post('/section', auth, adminAuth, create)

// get all
router.get('/sections', list)

// update
router.put('/section/:sectionId', auth, adminAuth, update)

router.delete('/section/dis/:sectionId', auth, adminAuth, remove)

module.exports = router
