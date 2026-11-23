const express = require('express');
const router = express.Router();
const { uploadImage } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const {
    getTeamMembers,
    getTeamMemberById,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
} = require('../controllers/teamController');

router.route('/')
    .get(getTeamMembers)
    .post(protect, uploadImage.single('image'), createTeamMember);

router.route('/:id')
    .get(getTeamMemberById)
    .put(protect, uploadImage.single('image'), updateTeamMember)
    .delete(protect, deleteTeamMember);

module.exports = router;
