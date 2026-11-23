const Policy = require('../models/Policy');

// @desc    Get all policies
// @route   GET /api/policies
// @access  Public
const getPolicies = async (req, res) => {
    try {
        const policies = await Policy.find().sort({ createdAt: 1 });
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a policy
// @route   POST /api/policies
// @access  Private (Admin)
const createPolicy = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        let document = '';

        if (req.file) {
            document = req.file.path || `/uploads/${req.file.filename}`;
        }

        const policy = new Policy({
            title,
            content,
            category,
            document
        });

        const createdPolicy = await policy.save();
        res.status(201).json(createdPolicy);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a policy
// @route   PUT /api/policies/:id
// @access  Private (Admin)
const updatePolicy = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const policy = await Policy.findById(req.params.id);

        if (policy) {
            policy.title = title || policy.title;
            policy.content = content || policy.content;
            policy.category = category || policy.category;

            if (req.file) {
                policy.document = req.file.path || `/uploads/${req.file.filename}`;
            }

            const updatedPolicy = await policy.save();
            res.json(updatedPolicy);
        } else {
            res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a policy
// @route   DELETE /api/policies/:id
// @access  Private (Admin)
const deletePolicy = async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id);

        if (policy) {
            await Policy.deleteOne({ _id: policy._id });
            res.json({ message: 'Policy removed' });
        } else {
            res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getPolicies, createPolicy, updatePolicy, deletePolicy };
