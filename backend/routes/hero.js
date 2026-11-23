const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const {
    getHeroSlides,
    getAllHeroSlidesAdmin,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide
} = require('../controllers/heroController');

// Multer storage for hero slide images
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `hero-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for high-res hero banners
});

router.route('/')
    .get(getHeroSlides)
    .post(protect, upload.single('image'), createHeroSlide);

router.route('/all')
    .get(protect, getAllHeroSlidesAdmin);

router.route('/:id')
    .put(protect, upload.single('image'), updateHeroSlide)
    .delete(protect, deleteHeroSlide);

module.exports = router;
