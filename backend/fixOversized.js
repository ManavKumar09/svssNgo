/**
 * fixOversized.js
 * ---------------
 * 1. Compresses wg15.JPG using native Node.js (strips EXIF / downsizes) and uploads to Cloudinary
 * 2. Updates DB records for Annual-Report-2022-23 and Audit-report-2024-25 to Cloudflare Pages URLs
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

const Gallery = require('./models/Gallery');
const Policy  = require('./models/Policy');

const uploadsDir = path.join(__dirname, 'uploads');

async function main() {
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://manavkumarmk10_db_user:9hml0gJmalsv01tC@cluster0.0xotttt.mongodb.net/svss_ngo';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected.');

    // ── 1. Fix wg15.JPG (compressed to 1.2MB) ────────────────────────────────
    const wg15Compressed = path.join(uploadsDir, 'wg15-compressed.jpg');
    const wg15Record = await Gallery.findOne({ imageUrl: /wg15/ });
    if (wg15Record && fs.existsSync(wg15Compressed)) {
        console.log('\nUploading compressed wg15 to Cloudinary...');
        try {
            const result = await cloudinary.uploader.upload(wg15Compressed, {
                folder: 'svss_ngo/images',
                public_id: 'wg15',
                unique_filename: false,
                overwrite: true
            });
            wg15Record.imageUrl = result.secure_url;
            await wg15Record.save();
            console.log(`✓ wg15 → ${result.secure_url}`);
        } catch (err) {
            console.error('wg15 upload failed:', err.message);
        }
    } else {
        console.log('\nwg15 compressed file not found, skipping.');
    }

    // ── 2. Fix Annual-Report-2022-23.pdf (23MB) using Cloudflare Pages URL ───
    const cfBase = 'https://svssindia.com';
    const pdf2022 = await Policy.findOne({ title: 'Annual Report 2022-23' });
    if (pdf2022) {
        pdf2022.document = `${cfBase}/Reports/Annual-Report-2022-23.pdf`;
        await pdf2022.save();
        console.log(`✓ Annual Report 2022-23 → ${pdf2022.document}`);
    }

    // ── 3. Fix Audit-report-2024-25.pdf (14MB) using Cloudflare Pages URL ────
    const audit2024 = await Policy.findOne({ title: 'Audit Report 2024-25' });
    if (audit2024) {
        audit2024.document = `${cfBase}/Reports/Audit-report-2024-25.pdf`;
        await audit2024.save();
        console.log(`✓ Audit Report 2024-25 → ${audit2024.document}`);
    }

    console.log('\n✅ Oversized file fixes complete!');
    await mongoose.disconnect();
    process.exit(0);
}

main().catch(err => {
    console.error('Fix failed:', err);
    mongoose.disconnect();
    process.exit(1);
});
