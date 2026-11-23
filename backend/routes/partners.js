const express = require('express');
const router = express.Router();
const { uploadImage } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const {
    getPartners,
    getPartnerById,
    createPartner,
    updatePartner,
    deletePartner
} = require('../controllers/partnerController');

router.route('/')
    .get(getPartners)
    .post(protect, uploadImage.single('logo'), createPartner);

router.route('/:id')
    .get(getPartnerById)
    .put(protect, uploadImage.single('logo'), updatePartner)
    .delete(protect, deletePartner);

module.exports = router;
