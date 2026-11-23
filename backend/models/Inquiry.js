const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    type: { type: String, enum: ['contact', 'volunteer'], default: 'contact' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: '' },
    message: { type: String, default: '' },
    // Volunteer specific fields
    college_employer: { type: String, default: '' },
    recommender: { type: String, default: '' },
    resume_link: { type: String, default: '' },
    resume_file: { type: String, default: '' },
    status: { type: String, enum: ['new', 'reviewed', 'contacted'], default: 'new' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
