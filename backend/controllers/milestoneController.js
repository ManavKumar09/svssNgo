const Milestone = require('../models/Milestone');

const defaultMilestonesConfig = {
    subtitle: 'OUR JOURNEY',
    title: 'Milestones along the way',
    milestones: [
        {
            year: '1988',
            text: 'SVSS founded in Bhopal with young community groups for grass-root development.'
        },
        {
            year: '1990s',
            text: '12A & 80G registrations. First audited annual reports.'
        },
        {
            year: '1995',
            text: 'FCRA registration — opened the door to international funding partners.'
        },
        {
            year: '2005',
            text: 'Launch of Radio Awaz 91.2 MHz FM — the SVSS community radio station.'
        },
        {
            year: '2010s',
            text: 'Major scale-up with NHM, NABARD, UNICEF, WFP and Childline India partnerships.'
        },
        {
            year: '2024',
            text: '12 fields of work, 2.5 lakh+ community members engaged, 3.5 lakh+ adolescents reached.'
        }
    ]
};

// @desc    Get milestones configuration
// @route   GET /api/milestones
// @access  Public
const getMilestones = async (req, res) => {
    try {
        let doc = await Milestone.findOne();
        if (!doc) {
            doc = await Milestone.create(defaultMilestonesConfig);
        }
        res.json(doc);
    } catch (err) {
        console.error('Error fetching milestones:', err);
        res.status(500).json({ message: 'Server error fetching milestones' });
    }
};

// @desc    Update milestones configuration
// @route   PUT /api/milestones
// @access  Private (Admin)
const updateMilestones = async (req, res) => {
    try {
        let doc = await Milestone.findOne();
        if (!doc) {
            doc = new Milestone(defaultMilestonesConfig);
        }

        const { subtitle, title, milestones } = req.body;

        if (subtitle !== undefined) doc.subtitle = subtitle;
        if (title !== undefined) doc.title = title;

        if (Array.isArray(milestones)) {
            doc.milestones = milestones.map(m => ({
                year: String(m.year || '').trim(),
                text: String(m.text || '').trim()
            })).filter(m => m.year || m.text);
        }

        const updated = await doc.save();
        res.json(updated);
    } catch (err) {
        console.error('Error updating milestones:', err);
        res.status(500).json({ message: 'Server error updating milestones' });
    }
};

module.exports = {
    getMilestones,
    updateMilestones
};
