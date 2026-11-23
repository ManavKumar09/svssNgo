const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        default: 0
    },
    suffix: {
        type: String,
        default: '+'
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Stat', statSchema);
