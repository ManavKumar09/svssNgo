const express = require('express');
const router = express.Router();
const { uploadDoc } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const { 
    submitContactForm, 
    submitVolunteerForm,
    getInquiries,
    deleteInquiry
} = require('../controllers/formController');

// Use Cloudinary for resume/CV uploads (volunteer form)
const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const upload = uploadDoc.single('attachment');

// Public form submissions
router.post('/contact', submitContactForm);
router.post('/volunteer', upload.single('attachment'), submitVolunteerForm);

// Protected Admin Inquiries Management
router.get('/inquiries', protect, getInquiries);
router.delete('/inquiries/:id', protect, deleteInquiry);

module.exports = router;
