const express = require('express');
const router = express.Router();
const { loginUser, registerUser, changePassword, changeUsername, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { rateLimiter } = require('../middleware/securityMiddleware');

// Generous login rate limiter: up to 20 attempts per 15 minutes per IP
// Protects against automated brute-force without locking out legitimate admins
const loginLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many login attempts from this network. Please wait 15 minutes before trying again.'
});

router.post('/login', loginLimiter, loginUser);
router.post('/register', protect, registerUser); // Secure registration behind admin authentication
router.get('/me', protect, getMe);
router.put('/change-username', protect, changeUsername);
router.put('/change-password', protect, changePassword);

module.exports = router;


