const Voice = require('../models/Voice');

// @desc    Get all voices / testimonials
// @route   GET /api/voices
// @access  Public
const getVoices = async (req, res) => {
    try {
        const voices = await Voice.find().sort({ order: 1, createdAt: -1 });
        res.json(voices);
    } catch (err) {
        console.error('Error fetching voices:', err);
        res.status(500).json({ message: 'Server error while fetching voices' });
    }
};

// @desc    Get single voice by ID
// @route   GET /api/voices/:id
// @access  Public
const getVoiceById = async (req, res) => {
    try {
        const voice = await Voice.findById(req.params.id);
        if (!voice) {
            return res.status(404).json({ message: 'Voice testimonial not found' });
        }
        res.json(voice);
    } catch (err) {
        console.error('Error fetching voice by ID:', err);
        res.status(500).json({ message: 'Server error while fetching voice' });
    }
};

// @desc    Create new voice
// @route   POST /api/voices
// @access  Private
const createVoice = async (req, res) => {
    try {
        const { quote, author, title, order } = req.body;

        if (!quote || !author || !title) {
            return res.status(400).json({ message: 'Quote, author name, and title/designation are required' });
        }

        const voice = new Voice({
            quote: quote.trim(),
            author: author.trim(),
            title: title.trim(),
            order: order !== undefined ? Number(order) : 0
        });

        const createdVoice = await voice.save();
        res.status(201).json(createdVoice);
    } catch (err) {
        console.error('Error creating voice:', err);
        res.status(500).json({ message: 'Server error while creating voice' });
    }
};

// @desc    Update voice
// @route   PUT /api/voices/:id
// @access  Private
const updateVoice = async (req, res) => {
    try {
        const voice = await Voice.findById(req.params.id);
        if (!voice) {
            return res.status(404).json({ message: 'Voice testimonial not found' });
        }

        const { quote, author, title, order } = req.body;

        if (quote !== undefined) voice.quote = quote.trim();
        if (author !== undefined) voice.author = author.trim();
        if (title !== undefined) voice.title = title.trim();
        if (order !== undefined) voice.order = Number(order);

        const updatedVoice = await voice.save();
        res.json(updatedVoice);
    } catch (err) {
        console.error('Error updating voice:', err);
        res.status(500).json({ message: 'Server error while updating voice' });
    }
};

// @desc    Delete voice
// @route   DELETE /api/voices/:id
// @access  Private
const deleteVoice = async (req, res) => {
    try {
        const voice = await Voice.findById(req.params.id);
        if (!voice) {
            return res.status(404).json({ message: 'Voice testimonial not found' });
        }

        await Voice.findByIdAndDelete(req.params.id);
        res.json({ message: 'Voice removed successfully' });
    } catch (err) {
        console.error('Error deleting voice:', err);
        res.status(500).json({ message: 'Server error while deleting voice' });
    }
};

module.exports = {
    getVoices,
    getVoiceById,
    createVoice,
    updateVoice,
    deleteVoice
};
