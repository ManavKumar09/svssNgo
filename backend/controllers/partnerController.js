const fs = require('fs');
const path = require('path');
const Partner = require('../models/Partner');

// @desc    Get all partners & donors
// @route   GET /api/partners
// @access  Public
const getPartners = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }

        const partners = await Partner.find(query).sort({ order: 1, createdAt: 1 });
        res.json(partners);
    } catch (err) {
        console.error('Error fetching partners:', err);
        res.status(500).json({ message: 'Server error while fetching partners' });
    }
};

// @desc    Get single partner by ID
// @route   GET /api/partners/:id
// @access  Public
const getPartnerById = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.json(partner);
    } catch (err) {
        console.error('Error fetching partner by ID:', err);
        res.status(500).json({ message: 'Server error while fetching partner' });
    }
};

// @desc    Create new partner or donor
// @route   POST /api/partners
// @access  Private
const createPartner = async (req, res) => {
    try {
        const { name, category, websiteUrl, order } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Partner / Organization name is required' });
        }

        let logoPath = '';
        if (req.file) {
            logoPath = req.file.path || `/uploads/${req.file.filename}`;
        } else if (req.body.logo) {
            logoPath = req.body.logo;
        } else {
            return res.status(400).json({ message: 'Partner logo image is required' });
        }

        const partner = new Partner({
            name: name.trim(),
            logo: logoPath,
            category: category || 'partner',
            websiteUrl: websiteUrl ? websiteUrl.trim() : '',
            order: order !== undefined ? Number(order) : 0
        });

        const createdPartner = await partner.save();
        res.status(201).json(createdPartner);
    } catch (err) {
        console.error('Error creating partner:', err);
        res.status(500).json({ message: 'Server error while creating partner' });
    }
};

// @desc    Update partner or donor
// @route   PUT /api/partners/:id
// @access  Private
const updatePartner = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        const { name, category, websiteUrl, order } = req.body;

        if (name !== undefined) partner.name = name.trim();
        if (category !== undefined) partner.category = category;
        if (websiteUrl !== undefined) partner.websiteUrl = websiteUrl.trim();
        if (order !== undefined) partner.order = Number(order);

        if (req.file) {
            // Delete old file if it is a local upload
            if (partner.logo && partner.logo.startsWith('/uploads/')) {
                const oldFilePath = path.join(__dirname, '..', partner.logo);
                if (fs.existsSync(oldFilePath)) {
                    try {
                        fs.unlinkSync(oldFilePath);
                    } catch (e) {
                        console.warn('Could not remove old partner logo:', e.message);
                    }
                }
            }
            partner.logo = req.file.path || `/uploads/${req.file.filename}`;
        }

        const updatedPartner = await partner.save();
        res.json(updatedPartner);
    } catch (err) {
        console.error('Error updating partner:', err);
        res.status(500).json({ message: 'Server error while updating partner' });
    }
};

// @desc    Delete partner
// @route   DELETE /api/partners/:id
// @access  Private
const deletePartner = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        // Delete logo file if local
        if (partner.logo && partner.logo.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', partner.logo);
            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {
                    console.warn('Could not delete partner logo file:', e.message);
                }
            }
        }

        await Partner.findByIdAndDelete(req.params.id);
        res.json({ message: 'Partner deleted successfully' });
    } catch (err) {
        console.error('Error deleting partner:', err);
        res.status(500).json({ message: 'Server error while deleting partner' });
    }
};

module.exports = {
    getPartners,
    getPartnerById,
    createPartner,
    updatePartner,
    deletePartner
};
