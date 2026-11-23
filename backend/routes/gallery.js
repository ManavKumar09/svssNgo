const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadImage } = require('../config/cloudinary');
const { 
    getGalleryImages, 
    createGalleryImages, 
    deleteGalleryImage 
} = require('../controllers/galleryController');

router.route('/')
    .get(getGalleryImages)
    .post(protect, uploadImage.array('images', 20), createGalleryImages);

router.route('/:id')
    .delete(protect, deleteGalleryImage);

module.exports = router;
