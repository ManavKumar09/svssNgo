const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['executive', 'staff'],
        default: 'executive'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
