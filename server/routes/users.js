const express = require('express');
const { create } = require('../controllers/users.controller');
const router = express.Router();

router.get('/users', create)

module.exports = router