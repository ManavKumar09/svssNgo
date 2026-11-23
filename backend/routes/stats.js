const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getStats,
    getStatById,
    createStat,
    updateStat,
    deleteStat
} = require('../controllers/statController');

router.route('/')
    .get(getStats)
    .post(protect, createStat);

router.route('/:id')
    .get(getStatById)
    .put(protect, updateStat)
    .delete(protect, deleteStat);

module.exports = router;
