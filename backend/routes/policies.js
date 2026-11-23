const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { getPolicies, createPolicy, updatePolicy, deletePolicy } = require('../controllers/policyController');

// Multer setup for document uploads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `doc-${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.route('/')
    .get(getPolicies)
    .post(protect, upload.single('document'), createPolicy);

router.route('/:id')
    .put(protect, upload.single('document'), updatePolicy)
    .delete(protect, deletePolicy);

module.exports = router;
