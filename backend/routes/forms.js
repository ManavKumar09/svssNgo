const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { 
    submitContactForm, 
    submitVolunteerForm,
    getInquiries,
    deleteInquiry
} = require('../controllers/formController');

// Multer setup for temporary storage of resumes before emailing
const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter(req, file, cb) {
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file format. Only PDF and Word documents are permitted.'));
        }
    }
});

// Public form submissions
router.post('/contact', submitContactForm);
router.post('/volunteer', upload.single('attachment'), submitVolunteerForm);

// Protected Admin Inquiries Management
router.get('/inquiries', protect, getInquiries);
router.delete('/inquiries/:id', protect, deleteInquiry);

module.exports = router;
