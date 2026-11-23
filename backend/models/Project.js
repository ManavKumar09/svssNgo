const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // 'completed', 'current'
    theme: { type: String, default: 'general' }, // 'agriculture-livelihood', 'health-sanitation', etc.
    link: { type: String, default: '#' },
    stats: [{
        value: String,
        label: String
    }],
    headerImage: { type: String }, 
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
