const express = require('express');
const router = express.Router();
const { submitHealthData } = require('../controllers/healthController');

router.post('/submit', submitHealthData);

module.exports = router;
