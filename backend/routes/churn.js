const express = require('express');
const router = express.Router();
const { predictChurnRate } = require('../controllers/churnController');

router.post('/predict-churn', predictChurnRate);

module.exports = router;
