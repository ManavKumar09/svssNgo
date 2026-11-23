const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 't6h2lvhg',
    api_key: process.env.CLOUDINARY_API_KEY || '991397586125354',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'fZ9KP8eflfB5GHSN5IW-SLGvqto'
});

const Gallery = require('./models/Gallery');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');

        const sourceGalleryDir = path.join(__dirname, '../frontend/src/assets/photos/WorkGallery');
        const files = fs.readdirSync(sourceGalleryDir);

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const srcPath = path.join(sourceGalleryDir, file);
                console.log(`Uploading ${file} to Cloudinary...`);
                const result = await cloudinary.uploader.upload(srcPath, {
                    folder: 'svss_ngo/images',
                    use_filename: true,
                    unique_filename: true
                });
                await Gallery.create({
                    title: `Work Gallery Image ${file}`,
                    section: 'gallery',
                    imageUrl: result.secure_url
                });
                console.log(`✓ Uploaded & saved: ${result.secure_url}`);
            }
        }

        console.log('Gallery seeding completed!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

connectDB();
