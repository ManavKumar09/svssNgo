const HeroSlide = require('../models/HeroSlide');
const fs = require('fs');
const path = require('path');

// @desc    Get all active hero slides
// @route   GET /api/hero
// @access  Public
const getHeroSlides = async (req, res) => {
    try {
        const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        res.json(slides);
    } catch (err) {
        console.error('Error fetching hero slides:', err);
        res.status(500).json({ message: 'Server error fetching hero slides' });
    }
};

// @desc    Get all hero slides for admin (active & inactive)
// @route   GET /api/hero/all
// @access  Private (Admin)
const getAllHeroSlidesAdmin = async (req, res) => {
    try {
        const slides = await HeroSlide.find({}).sort({ order: 1, createdAt: 1 });
        res.json(slides);
    } catch (err) {
        console.error('Error fetching admin hero slides:', err);
        res.status(500).json({ message: 'Server error fetching hero slides' });
    }
};

// @desc    Create a new hero slide
// @route   POST /api/hero
// @access  Private (Admin)
const createHeroSlide = async (req, res) => {
    try {
        const { 
            titleLine1, 
            titleLine2, 
            subtitle, 
            primaryBtnText, 
            primaryBtnLink, 
            secondaryBtnText, 
            secondaryBtnLink, 
            order, 
            isActive 
        } = req.body;

        let imageUrl = req.body.imageUrl || '';
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        if (!imageUrl) {
            return res.status(400).json({ message: 'Please upload an image for the slide.' });
        }

        const slide = await HeroSlide.create({
            titleLine1: titleLine1 || 'Empowered women,',
            titleLine2: titleLine2 || 'stronger villages.',
            subtitle: subtitle || 'Self-help groups, sericulture and handlooms — 2.5 lakh women and counting, building dignity through work.',
            primaryBtnText: primaryBtnText || 'Our Work & Impact',
            primaryBtnLink: primaryBtnLink || '/completed-projects',
            secondaryBtnText: secondaryBtnText || 'Involve with us',
            secondaryBtnLink: secondaryBtnLink || '/volunteer',
            imageUrl,
            order: order !== undefined ? Number(order) : 0,
            isActive: isActive !== undefined ? (isActive === 'true' || isActive === true) : true
        });

        res.status(201).json(slide);
    } catch (err) {
        console.error('Error creating hero slide:', err);
        res.status(500).json({ message: 'Server error creating hero slide' });
    }
};

// @desc    Update a hero slide
// @route   PUT /api/hero/:id
// @access  Private (Admin)
const updateHeroSlide = async (req, res) => {
    try {
        const slide = await HeroSlide.findById(req.params.id);
        if (!slide) {
            return res.status(404).json({ message: 'Hero slide not found' });
        }

        const { 
            titleLine1, 
            titleLine2, 
            subtitle, 
            primaryBtnText, 
            primaryBtnLink, 
            secondaryBtnText, 
            secondaryBtnLink, 
            order, 
            isActive,
            imageUrl: directImageUrl
        } = req.body;

        if (titleLine1 !== undefined) slide.titleLine1 = titleLine1;
        if (titleLine2 !== undefined) slide.titleLine2 = titleLine2;
        if (subtitle !== undefined) slide.subtitle = subtitle;
        if (primaryBtnText !== undefined) slide.primaryBtnText = primaryBtnText;
        if (primaryBtnLink !== undefined) slide.primaryBtnLink = primaryBtnLink;
        if (secondaryBtnText !== undefined) slide.secondaryBtnText = secondaryBtnText;
        if (secondaryBtnLink !== undefined) slide.secondaryBtnLink = secondaryBtnLink;
        if (order !== undefined) slide.order = Number(order);
        if (isActive !== undefined) slide.isActive = (isActive === 'true' || isActive === true);

        if (req.file) {
            slide.imageUrl = `/uploads/${req.file.filename}`;
        } else if (directImageUrl) {
            slide.imageUrl = directImageUrl;
        }

        const updated = await slide.save();
        res.json(updated);
    } catch (err) {
        console.error('Error updating hero slide:', err);
        res.status(500).json({ message: 'Server error updating hero slide' });
    }
};

// @desc    Delete a hero slide
// @route   DELETE /api/hero/:id
// @access  Private (Admin)
const deleteHeroSlide = async (req, res) => {
    try {
        const slide = await HeroSlide.findById(req.params.id);
        if (!slide) {
            return res.status(404).json({ message: 'Hero slide not found' });
        }

        // Clean up file if it's an uploaded file (and not a seed/external file)
        if (slide.imageUrl && slide.imageUrl.startsWith('/uploads/') && !slide.imageUrl.includes('hero-slide-')) {
            const filePath = path.join(__dirname, '..', slide.imageUrl);
            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {
                    console.warn('Could not delete old file:', filePath);
                }
            }
        }

        await HeroSlide.deleteOne({ _id: slide._id });
        res.json({ message: 'Hero slide deleted successfully' });
    } catch (err) {
        console.error('Error deleting hero slide:', err);
        res.status(500).json({ message: 'Server error deleting hero slide' });
    }
};

module.exports = {
    getHeroSlides,
    getAllHeroSlidesAdmin,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide
};
