const express = require('express');
const router = express.Router();
const { getActivityGraph, updateActivityGraph } = require('../controllers/activityGraphController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getActivityGraph)
    .put(protect, updateActivityGraph);

module.exports = router;
