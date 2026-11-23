const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getMilestones,
    updateMilestones
} = require('../controllers/milestoneController');

router.route('/')
    .get(getMilestones)
    .put(protect, updateMilestones);

module.exports = router;
