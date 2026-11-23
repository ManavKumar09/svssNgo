const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const {
    getTeamMembers,
    getTeamMemberById,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
} = require('../controllers/teamController');

// Multer setup for team member photo uploads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `team-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
    }
});

const upload = multer({ storage });

router.route('/')
    .get(getTeamMembers)
    .post(protect, upload.single('image'), createTeamMember);

router.route('/:id')
    .get(getTeamMemberById)
    .put(protect, upload.single('image'), updateTeamMember)
    .delete(protect, deleteTeamMember);

module.exports = router;
