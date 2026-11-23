/**
 * migratePartnersToCloudinary.js
 * ------------------------------
 * Uploads all partner logos from backend/uploads to Cloudinary and updates MongoDB Partner documents.
 */

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

const Partner = require('./models/Partner');
const uploadsDir = path.join(__dirname, 'uploads');
const frontendPartnersDir = path.join(__dirname, '../frontend/src/assets/photos/partners');

async function uploadToCloudinary(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: 'svss_ngo/partners',
        use_filename: true,
        unique_filename: true
    });
}

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    const partners = await Partner.find({});
    console.log(`Found ${partners.length} partners.`);

    for (const partner of partners) {
        if (partner.logo && partner.logo.startsWith('http')) {
            console.log(`SKIP (already Cloudinary): ${partner.name}`);
            continue;
        }

        let fileToUpload = null;
        if (partner.logo && partner.logo.startsWith('/uploads/')) {
            const fileName = path.basename(partner.logo);
            const p = path.join(uploadsDir, fileName);
            if (fs.existsSync(p)) {
                fileToUpload = p;
            }
        }

        if (!fileToUpload) {
            // Check in frontend/src/assets/photos/partners
            const files = fs.readdirSync(frontendPartnersDir);
            const match = files.find(f => {
                const cleanPartner = partner.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                const cleanFile = f.toLowerCase().replace(/[^a-z0-9]/g, '');
                return cleanFile.includes(cleanPartner) || cleanPartner.includes(cleanFile.replace('jpg', '').replace('png', ''));
            });
            if (match) {
                fileToUpload = path.join(frontendPartnersDir, match);
            }
        }

        if (fileToUpload) {
            try {
                console.log(`Uploading logo for ${partner.name}: ${path.basename(fileToUpload)}`);
                const res = await uploadToCloudinary(fileToUpload);
                partner.logo = res.secure_url;
                await partner.save();
                console.log(`✓ ${partner.name} -> ${res.secure_url}`);
            } catch (err) {
                console.error(`✗ Error uploading ${partner.name}:`, err.message);
            }
        } else {
            console.log(`! No file found for ${partner.name} (${partner.logo})`);
        }
    }

    console.log('\nPartners migration completed!');
    process.exit(0);
}

main().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
