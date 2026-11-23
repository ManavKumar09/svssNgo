const mongoose = require('mongoose');

const yearlyItemSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
        trim: true
    },
    activities: {
        type: Number,
        required: true,
        default: 0
    }
});

const activityGraphSchema = new mongoose.Schema({
    subheading: {
        type: String,
        default: 'BENEFICIARIES COVERED'
    },
    heading: {
        type: String,
        default: 'Transforming lives across project communities.'
    },
    description: {
        type: String,
        default: 'Every woman in an SHG, child in learning centers, farmer adopting sustainable practices, and community member reached — counted, audited and reported. Open the dashboard for the full breakdown.'
    },
    linkText: {
        type: String,
        default: 'Open dashboard'
    },
    linkUrl: {
        type: String,
        default: '/documents'
    },
    yearlyData: {
        type: [yearlyItemSchema],
        default: [
            { year: '2019', activities: 4800 },
            { year: '2020', activities: 6200 },
            { year: '2021', activities: 8500 },
            { year: '2022', activities: 14200 },
            { year: '2023', activities: 21800 },
            { year: '2024', activities: 29500 },
            { year: '2025', activities: 38000 }
        ]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ActivityGraph', activityGraphSchema);
