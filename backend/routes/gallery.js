const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { 
    getGalleryImages, 
    createGalleryImages, 
    deleteGalleryImage 
} = require('../controllers/galleryController');

// Multer setup for gallery image uploads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `gallery-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
    }
});

const upload = multer({ storage });

router.route('/')
    .get(getGalleryImages)
    .post(protect, upload.array('images', 20), createGalleryImages);

router.route('/:id')
    .delete(protect, deleteGalleryImage);

module.exports = router;
