const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getVoices,
    getVoiceById,
    createVoice,
    updateVoice,
    deleteVoice
} = require('../controllers/voiceController');

router.route('/')
    .get(getVoices)
    .post(protect, createVoice);

router.route('/:id')
    .get(getVoiceById)
    .put(protect, updateVoice)
    .delete(protect, deleteVoice);

module.exports = router;
