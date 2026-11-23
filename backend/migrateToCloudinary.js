/**
 * migrateToCloudinary.js
 * ----------------------
 * Reads all MongoDB records that still have local /uploads/... paths,
 * uploads the corresponding file from backend/uploads/ to Cloudinary,
 * then updates the DB record with the permanent Cloudinary URL.
 *
 * Run once: node migrateToCloudinary.js
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

const Gallery   = require('./models/Gallery');
const HeroSlide = require('./models/HeroSlide');
const Policy    = require('./models/Policy');
const Project   = require('./models/Project');

const uploadsDir = path.join(__dirname, 'uploads');

// ── Helpers ───────────────────────────────────────────────────────────────────

function localPath(urlPath) {
    // urlPath looks like /uploads/some-file.jpg
    const filename = urlPath.replace(/^\/uploads\//, '');
    return path.join(uploadsDir, filename);
}

async function uploadToCloudinary(filePath, resourceType = 'image', folder = 'svss_ngo/images') {
    return cloudinary.uploader.upload(filePath, {
        resource_type: resourceType,
        folder,
        use_filename: true,
        unique_filename: true
    });
}

async function migrateField(Model, records, urlField, resourceType, folder, label) {
    console.log(`\n── ${label}: ${records.length} records to migrate ──`);
    let ok = 0, skip = 0, fail = 0;

    for (const rec of records) {
        const urlVal = rec[urlField];
        if (!urlVal || urlVal.startsWith('http')) {
            console.log(`  SKIP (already Cloudinary or empty): ${urlVal}`);
            skip++;
            continue;
        }
        const fPath = localPath(urlVal);
        if (!fs.existsSync(fPath)) {
            console.warn(`  MISSING local file: ${fPath} — skipping`);
            fail++;
            continue;
        }
        try {
            const result = await uploadToCloudinary(fPath, resourceType, folder);
            rec[urlField] = result.secure_url;
            await rec.save();
            console.log(`  ✓ ${path.basename(fPath)} → ${result.secure_url}`);
            ok++;
        } catch (err) {
            console.error(`  ✗ Failed ${fPath}:`, err.message);
            fail++;
        }
    }
    console.log(`  Done: ${ok} uploaded, ${skip} skipped, ${fail} failed`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://manavkumarmk10_db_user:9hml0gJmalsv01tC@cluster0.0xotttt.mongodb.net/svss_ngo';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected.');

    // 1. Gallery images
    const galleries = await Gallery.find({ imageUrl: /^\/uploads\// });
    await migrateField(Gallery, galleries, 'imageUrl', 'image', 'svss_ngo/images', 'Gallery');

    // 2. Hero slides
    const heroSlides = await HeroSlide.find({ imageUrl: /^\/uploads\// });
    await migrateField(HeroSlide, heroSlides, 'imageUrl', 'image', 'svss_ngo/images', 'HeroSlides');

    // 3. Policy documents (PDFs)
    const policies = await Policy.find({ document: /^\/uploads\// });
    await migrateField(Policy, policies, 'document', 'raw', 'svss_ngo/documents', 'Policies');

    // 4. Projects (imageUrl field)
    const projects = await Project.find({ imageUrl: /^\/uploads\// });
    await migrateField(Project, projects, 'imageUrl', 'image', 'svss_ngo/images', 'Projects');

    console.log('\n✅ Migration complete!');
    await mongoose.disconnect();
    process.exit(0);
}

main().catch(err => {
    console.error('Migration failed:', err);
    mongoose.disconnect();
    process.exit(1);
});
