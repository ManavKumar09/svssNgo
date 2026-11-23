const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user by username or email & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const identifier = (req.body.username || req.body.email || '').trim();
    const password = req.body.password;

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Please provide username/email and password' });
    }

    // 1. Check if matching .env configured ADMIN credentials
    const envAdminUser = (process.env.ADMIN_USERNAME || '').trim();
    const envAdminPass = (process.env.ADMIN_PASSWORD || '').trim();
    const envAdminEmail = (process.env.ADMIN_EMAIL || '').trim();

    if (
        envAdminUser &&
        envAdminPass &&
        (identifier === envAdminUser || (envAdminEmail && identifier === envAdminEmail))
    ) {
        if (password === envAdminPass) {
            return res.json({
                _id: 'env-admin',
                username: envAdminUser,
                email: envAdminEmail || `${envAdminUser}@svss.org`,
                token: generateToken('env-admin'),
            });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    }

    // 2. Fallback to Database User if configured
    try {
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });

        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                username: user.username || user.email,
                email: user.email,
                token: generateToken(user._id),
            });
        }
    } catch (err) {
        console.error('Database login error:', err.message);
    }

    return res.status(401).json({ message: 'Invalid username or password' });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        if (req.user && req.user._id === 'env-admin') {
            return res.json({
                _id: 'env-admin',
                username: req.user.username,
                email: req.user.email
            });
        }
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            _id: user._id,
            username: user.username || user.email,
            email: user.email
        });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Server error fetching user profile' });
    }
};

// @desc    Change username
// @route   PUT /api/auth/change-username
// @access  Private
const fs = require('fs');
const path = require('path');

const updateEnvFile = (key, value) => {
    try {
        const envPath = path.resolve(__dirname, '../.env');
        if (fs.existsSync(envPath)) {
            let content = fs.readFileSync(envPath, 'utf8');
            const regex = new RegExp(`^${key}=.*$`, 'm');
            if (regex.test(content)) {
                content = content.replace(regex, `${key}=${value}`);
            } else {
                content += `\n${key}=${value}`;
            }
            fs.writeFileSync(envPath, content, 'utf8');
        }
    } catch (e) {
        console.error(`Failed to update ${key} in .env:`, e.message);
    }
};

const changeUsername = async (req, res) => {
    try {
        const { newUsername, password } = req.body;

        if (!newUsername || !newUsername.trim()) {
            return res.status(400).json({ message: 'New username is required' });
        }

        const trimmed = newUsername.trim();

        // Handle .env admin user
        if (req.user && req.user._id === 'env-admin') {
            const currentEnvPass = process.env.ADMIN_PASSWORD || 'admin123';
            if (password && password !== currentEnvPass) {
                return res.status(400).json({ message: 'Incorrect current password' });
            }
            process.env.ADMIN_USERNAME = trimmed;
            updateEnvFile('ADMIN_USERNAME', trimmed);
            if (trimmed.includes('@')) {
                process.env.ADMIN_EMAIL = trimmed;
                updateEnvFile('ADMIN_EMAIL', trimmed);
            }
            return res.json({
                message: 'Username updated successfully in .env',
                username: trimmed,
                email: trimmed.includes('@') ? trimmed : process.env.ADMIN_EMAIL
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password) {
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect current password' });
            }
        }

        // Check if username is already taken by another account
        const existing = await User.findOne({
            _id: { $ne: user._id },
            $or: [{ username: trimmed }, { email: trimmed }]
        });

        if (existing) {
            return res.status(400).json({ message: 'Username is already in use by another account' });
        }

        user.username = trimmed;
        // If it looks like an email or email was same as old username, update email too
        if (trimmed.includes('@')) {
            user.email = trimmed;
        }

        await user.save();

        res.json({
            message: 'Username updated successfully',
            username: user.username,
            email: user.email
        });
    } catch (err) {
        console.error('Error changing username:', err);
        res.status(500).json({ message: 'Server error while changing username' });
    }
};

// @desc    Register a new user (Admin use only in reality)
// @route   POST /api/auth/register
// @access  Public (for initial setup)
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const identifier = (username || email || '').trim();

    const userExists = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
    });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        username: username ? username.trim() : identifier,
        email: email ? email.trim() : identifier,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }

        // Handle .env admin user
        if (req.user && req.user._id === 'env-admin') {
            const currentEnvPass = process.env.ADMIN_PASSWORD || 'admin123';
            if (currentPassword !== currentEnvPass) {
                return res.status(400).json({ message: 'Incorrect current password' });
            }
            process.env.ADMIN_PASSWORD = newPassword;
            updateEnvFile('ADMIN_PASSWORD', newPassword);
            return res.json({ message: 'Password changed successfully in .env' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Admin user not found' });
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ message: 'Server error while changing password' });
    }
};

module.exports = { loginUser, registerUser, changePassword, changeUsername, getMe };


