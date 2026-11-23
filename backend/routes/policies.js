const express = require('express');
const router = express.Router();
const { uploadDoc } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const { getPolicies, createPolicy, updatePolicy, deletePolicy } = require('../controllers/policyController');

router.route('/')
    .get(getPolicies)
    .post(protect, uploadDoc.single('document'), createPolicy);

router.route('/:id')
    .put(protect, uploadDoc.single('document'), updatePolicy)
    .delete(protect, deletePolicy);

module.exports = router;
