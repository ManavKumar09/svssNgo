const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['partner', 'donor', 'government', 'corporate'],
        default: 'partner'
    },
    websiteUrl: {
        type: String,
        trim: true,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);
