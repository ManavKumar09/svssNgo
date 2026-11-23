const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadImage } = require('../config/cloudinary');
const {
    getHeroSlides,
    getAllHeroSlidesAdmin,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide
} = require('../controllers/heroController');

router.route('/')
    .get(getHeroSlides)
    .post(protect, uploadImage.single('image'), createHeroSlide);

router.route('/all')
    .get(protect, getAllHeroSlidesAdmin);

router.route('/:id')
    .put(protect, uploadImage.single('image'), updateHeroSlide)
    .delete(protect, deleteHeroSlide);

module.exports = router;
