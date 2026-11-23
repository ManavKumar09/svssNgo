const TeamMember = require('../models/TeamMember');
const fs = require('fs');
const path = require('path');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeamMembers = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const members = await TeamMember.find(filter).sort({ order: 1, createdAt: 1 });
        res.json(members);
    } catch (err) {
        console.error('Error fetching team members:', err);
        res.status(500).json({ message: 'Server error fetching team members' });
    }
};

// @desc    Get single team member by ID
// @route   GET /api/team/:id
// @access  Public
const getTeamMemberById = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.json(member);
    } catch (err) {
        console.error('Error fetching team member:', err);
        res.status(500).json({ message: 'Server error fetching team member' });
    }
};

// @desc    Create a new team member
// @route   POST /api/team
// @access  Private
const createTeamMember = async (req, res) => {
    try {
        const { name, role, detail, order, category } = req.body;
        let image = req.body.image || '';

        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        if (!name || !role) {
            return res.status(400).json({ message: 'Name and role are required' });
        }

        const member = await TeamMember.create({
            name,
            role,
            detail: detail || '',
            image,
            order: order !== undefined ? Number(order) : 0,
            category: category === 'staff' ? 'staff' : 'executive'
        });

        res.status(201).json(member);
    } catch (err) {
        console.error('Error creating team member:', err);
        res.status(500).json({ message: 'Server error creating team member' });
    }
};

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private
const updateTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        const { name, role, detail, order, category } = req.body;

        if (name) member.name = name;
        if (role) member.role = role;
        if (detail !== undefined) member.detail = detail;
        if (order !== undefined) member.order = Number(order);
        if (category && ['executive', 'staff'].includes(category)) member.category = category;

        if (req.file) {
            // Delete old uploaded file if local
            if (member.image && member.image.startsWith('/uploads/')) {
                const oldPath = path.join(__dirname, '..', member.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            member.image = `/uploads/${req.file.filename}`;
        } else if (req.body.image !== undefined) {
            member.image = req.body.image;
        }

        const updated = await member.save();
        res.json(updated);
    } catch (err) {
        console.error('Error updating team member:', err);
        res.status(500).json({ message: 'Server error updating team member' });
    }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private
const deleteTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        if (member.image && member.image.startsWith('/uploads/')) {
            const oldPath = path.join(__dirname, '..', member.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        await TeamMember.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team member removed successfully' });
    } catch (err) {
        console.error('Error deleting team member:', err);
        res.status(500).json({ message: 'Server error deleting team member' });
    }
};

module.exports = {
    getTeamMembers,
    getTeamMemberById,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
};
