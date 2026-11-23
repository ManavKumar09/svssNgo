const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `img-${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });
const uploadFields = upload.fields([
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
