const express = require('express');
const router = express.Router();
const { uploadImage } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');

const uploadFields = uploadImage.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'images', maxCount: 30 }
]);

router.route('/')
    .get(getProjects)
    .post(protect, uploadFields, createProject);

router.route('/:id')
    .get(getProjectById)
    .put(protect, uploadFields, updateProject)
    .delete(protect, deleteProject);

module.exports = router;
