const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const {
    getPartners,
    getPartnerById,
    createPartner,
    updatePartner,
    deletePartner
} = require('../controllers/partnerController');

// Multer storage for partner logos
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `partner-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.route('/')
    .get(getPartners)
    .post(protect, upload.single('logo'), createPartner);

router.route('/:id')
    .get(getPartnerById)
    .put(protect, upload.single('logo'), updatePartner)
    .delete(protect, deletePartner);

module.exports = router;
