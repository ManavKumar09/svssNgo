const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const Gallery = require('./models/Gallery');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
        
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)){
            fs.mkdirSync(uploadsDir);
        }

        const sourceGalleryDir = path.join(__dirname, '../frontend/src/assets/photos/WorkGallery');
        const files = fs.readdirSync(sourceGalleryDir);

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            // Filter out CR2 (raw files) or other non-web image formats if any
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const source = path.join(sourceGalleryDir, file);
                
                // Add timestamp to ensure uniqueness just like multer might
                const targetName = `gallery-${Date.now()}-${file}`;
                const target = path.join(uploadsDir, targetName);
                
                fs.copyFileSync(source, target);
                console.log(`Copied ${file} to ${targetName}`);
                
                await Gallery.create({
                    title: `Work Gallery Image ${file}`,
                    section: 'gallery',
                    imageUrl: `/uploads/${targetName}`
                });
                console.log(`Created DB entry for ${file}`);
            }
        }
        
        console.log('Gallery migration completed!');
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

connectDB();
