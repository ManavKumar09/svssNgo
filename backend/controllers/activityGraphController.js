const ActivityGraph = require('../models/ActivityGraph');

// Default initial config
const initialDefaults = {
    subheading: 'BENEFICIARIES COVERED',
    heading: 'Transforming lives across project communities.',
    description: 'Every woman in an SHG, child in learning centers, farmer adopting sustainable practices, and community member reached — counted, audited and reported. Open the dashboard for the full breakdown.',
    linkText: 'Open dashboard',
    linkUrl: '/documents',
    yearlyData: [
        { year: '2019', activities: 4800 },
        { year: '2020', activities: 6200 },
        { year: '2021', activities: 8500 },
        { year: '2022', activities: 14200 },
        { year: '2023', activities: 21800 },
        { year: '2024', activities: 29500 },
        { year: '2025', activities: 38000 }
    ]
};

// @desc    Get activity graph settings & yearly data
// @route   GET /api/activities
// @access  Public
const getActivityGraph = async (req, res) => {
    try {
        let doc = await ActivityGraph.findOne();
        if (!doc) {
            doc = await ActivityGraph.create(initialDefaults);
        }
        res.json(doc);
    } catch (err) {
        console.error('Error fetching activity graph:', err);
        res.status(500).json({ message: 'Server error fetching activity graph' });
    }
};

// @desc    Update activity graph settings & yearly data
// @route   PUT /api/activities
// @access  Private (Admin)
const updateActivityGraph = async (req, res) => {
    try {
        let doc = await ActivityGraph.findOne();
        if (!doc) {
            doc = new ActivityGraph(initialDefaults);
        }

        const { subheading, heading, description, linkText, linkUrl, yearlyData } = req.body;

        if (subheading !== undefined) doc.subheading = subheading;
        if (heading !== undefined) doc.heading = heading;
        if (description !== undefined) doc.description = description;
        if (linkText !== undefined) doc.linkText = linkText;
        if (linkUrl !== undefined) doc.linkUrl = linkUrl;
        
        if (Array.isArray(yearlyData)) {
            // Sort by year ascending or preserve user order
            doc.yearlyData = yearlyData.map(item => ({
                year: String(item.year || '').trim(),
                activities: Number(item.activities !== undefined ? item.activities : (item.beneficiaries || 0)) || 0
            })).filter(item => item.year);
        }

        const updated = await doc.save();
        res.json(updated);
    } catch (err) {
        console.error('Error updating activity graph:', err);
        res.status(500).json({ message: 'Server error updating activity graph' });
    }
};

module.exports = {
    getActivityGraph,
    updateActivityGraph
};
