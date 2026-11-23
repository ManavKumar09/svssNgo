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

// uploadDoc is a multer instance configured for Cloudinary (raw/documents).
// uploadDoc.single('attachment') returns the middleware — store it then use directly.
const upload = uploadDoc.single('attachment');

// Public form submissions
router.post('/contact', submitContactForm);
router.post('/volunteer', upload, submitVolunteerForm);   // <-- use upload directly, not upload.single()

// Protected Admin Inquiries Management
router.get('/inquiries', protect, getInquiries);
router.delete('/inquiries/:id', protect, deleteInquiry);

module.exports = router;
