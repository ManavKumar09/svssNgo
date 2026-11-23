const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 't6h2lvhg',
    api_key: process.env.CLOUDINARY_API_KEY || '991397586125354',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'fZ9KP8eflfB5GHSN5IW-SLGvqto'
});

// Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'svss_ngo/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'],
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    }
});

// Cloudinary storage for raw files (PDFs, Documents)
const docStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'svss_ngo/documents',
        resource_type: 'raw',
        format: async (req, file) => {
            const ext = path.extname(file.originalname).replace('.', '');
            return ext || 'pdf';
        }
    }
});

const uploadImage = multer({
    storage: imageStorage,
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

const uploadDoc = multer({
    storage: docStorage,
    limits: { fileSize: 30 * 1024 * 1024 } // 30MB limit for annual reports/audits
});

module.exports = {
    cloudinary,
    uploadImage,
    uploadDoc
};
