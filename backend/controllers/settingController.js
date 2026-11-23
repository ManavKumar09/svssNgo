const Setting = require('../models/Setting');
const User = require('../models/User');

// @desc    Get website general settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne({ key: 'site_settings' });
        if (!settings) {
            settings = await Setting.create({ key: 'site_settings' });
        }
        res.json(settings);
    } catch (err) {
        console.error('Error fetching settings:', err);
        res.status(500).json({ message: 'Server error while fetching settings' });
    }
};

// @desc    Update website general settings
// @route   PUT /api/settings
// @access  Private
const updateSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne({ key: 'site_settings' });
        if (!settings) {
            settings = new Setting({ key: 'site_settings' });
        }

        const fields = [
            'email', 'phone1', 'phone2', 'address', 'workingHours',
            'radioStation', 'fcraCert', 'facebookUrl', 'instagramUrl',
            'twitterUrl', 'linkedinUrl', 'youtubeUrl'
        ];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                settings[field] = req.body[field];
            }
        });

        const updated = await settings.save();
        res.json(updated);
    } catch (err) {
        console.error('Error updating settings:', err);
        res.status(500).json({ message: 'Server error while updating settings' });
    }
};

// @desc    Change admin password
// @route   PUT /api/settings/password
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

        // Find user by req.user._id
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Admin user not found' });
        }

        // Verify current password
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // Set new password (pre-save hook will hash it)
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ message: 'Server error while changing password' });
    }
};

module.exports = {
    getSettings,
    updateSettings,
    changePassword
};
