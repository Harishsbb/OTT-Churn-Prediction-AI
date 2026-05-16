const express = require('express');
const router = express.Router();
const { getDashboardStats, seedData } = require('../controllers/dashboardController');

router.get('/dashboard-stats', getDashboardStats);
router.get('/seed', seedData);

module.exports = router;
