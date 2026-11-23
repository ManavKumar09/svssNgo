const Gallery = require('../models/Gallery');

// @desc    Get all gallery images (optional filter by ?section=home | partners | gallery)
// @route   GET /api/gallery
// @access  Public
const getGalleryImages = async (req, res) => {
    try {
        const { section } = req.query;
        const query = section ? { section } : {};
        const images = await Gallery.find(query).sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add gallery image(s) with subsection
// @route   POST /api/gallery
// @access  Private (Admin)
const createGalleryImages = async (req, res) => {
    try {
        const { title, section } = req.body;
        const uploadedFiles = req.files;

        if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one image file.' });
        }

        // Support multiple image files in a single submission
        const newImages = [];
        for (const file of uploadedFiles) {
            // file.path contains the full secure Cloudinary URL (e.g. https://res.cloudinary.com/...)
            const imageUrl = file.path || (file.filename ? `/uploads/${file.filename}` : '');
            const item = new Gallery({
                title: title || file.originalname,
                section: section || 'gallery',
                imageUrl: imageUrl
            });
            const saved = await item.save();
            newImages.push(saved);
        }

        res.status(201).json(newImages);
    } catch (error) {
        console.error('Create gallery error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
const deleteGalleryImage = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (item) {
            await Gallery.deleteOne({ _id: item._id });
            res.json({ message: 'Gallery image removed' });
        } else {
            res.status(404).json({ message: 'Gallery image not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getGalleryImages,
    createGalleryImages,
    deleteGalleryImage
};
