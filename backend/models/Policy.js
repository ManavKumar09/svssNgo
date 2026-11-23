const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String }, // Made optional since we might just upload a document
    category: { type: String, required: true }, // 'audit', 'organization', etc.
    document: { type: String }, // Path to the uploaded PDF/Word doc
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Policy', policySchema);
