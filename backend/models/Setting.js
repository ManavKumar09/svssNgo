const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        default: 'site_settings'
    },
    email: {
        type: String,
        default: 'svssngobpl@gmail.com'
    },
    phone1: {
        type: String,
        default: '+91-9425373168'
    },
    phone2: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: 'M-20/3-A, Saket Nagar, Bhopal-462001, Madhya Pradesh, India'
    },
    workingHours: {
        type: String,
        default: 'Mon–Sat, 10am – 6pm'
    },
    radioStation: {
        type: String,
        default: 'SVSS Community Radio Station 91.2 MHz FM — Radio Awaz'
    },
    fcraCert: {
        type: String,
        default: 'FCRA Registered · 12A & 80G Certified'
    },
    facebookUrl: {
        type: String,
        default: ''
    },
    instagramUrl: {
        type: String,
        default: ''
    },
    twitterUrl: {
        type: String,
        default: ''
    },
    linkedinUrl: {
        type: String,
        default: ''
    },
    youtubeUrl: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
