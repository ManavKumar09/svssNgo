const Stat = require('../models/Stat');

// @desc    Get all stats
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res) => {
    try {
        const stats = await Stat.find().sort({ order: 1, createdAt: 1 });
        res.json(stats);
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ message: 'Server error while fetching stats' });
    }
};

// @desc    Get single stat by ID
// @route   GET /api/stats/:id
// @access  Public
const getStatById = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        if (!stat) {
            return res.status(404).json({ message: 'Stat not found' });
        }
        res.json(stat);
    } catch (err) {
        console.error('Error fetching stat by ID:', err);
        res.status(500).json({ message: 'Server error while fetching stat' });
    }
};

// @desc    Create new stat
// @route   POST /api/stats
// @access  Private
const createStat = async (req, res) => {
    try {
        const { label, number, suffix, order } = req.body;

        if (!label || number === undefined || number === null) {
            return res.status(400).json({ message: 'Label and number are required' });
        }

        const stat = new Stat({
            label: label.trim(),
            number: Number(number),
            suffix: suffix !== undefined ? suffix : '+',
            order: order !== undefined ? Number(order) : 0
        });

        const createdStat = await stat.save();
        res.status(201).json(createdStat);
    } catch (err) {
        console.error('Error creating stat:', err);
        res.status(500).json({ message: 'Server error while creating stat' });
    }
};

// @desc    Update stat
// @route   PUT /api/stats/:id
// @access  Private
const updateStat = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        if (!stat) {
            return res.status(404).json({ message: 'Stat not found' });
        }

        const { label, number, suffix, order } = req.body;

        if (label !== undefined) stat.label = label.trim();
        if (number !== undefined) stat.number = Number(number);
        if (suffix !== undefined) stat.suffix = suffix;
        if (order !== undefined) stat.order = Number(order);

        const updatedStat = await stat.save();
        res.json(updatedStat);
    } catch (err) {
        console.error('Error updating stat:', err);
        res.status(500).json({ message: 'Server error while updating stat' });
    }
};

// @desc    Delete stat
// @route   DELETE /api/stats/:id
// @access  Private
const deleteStat = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        if (!stat) {
            return res.status(404).json({ message: 'Stat not found' });
        }

        await Stat.findByIdAndDelete(req.params.id);
        res.json({ message: 'Stat removed successfully' });
    } catch (err) {
        console.error('Error deleting stat:', err);
        res.status(500).json({ message: 'Server error while deleting stat' });
    }
};

module.exports = {
    getStats,
    getStatById,
    createStat,
    updateStat,
    deleteStat
};
