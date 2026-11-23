const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: { type: String, default: '' },
    section: { type: String, default: 'gallery' }, // 'gallery', 'home', 'partners'
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', gallerySchema);
