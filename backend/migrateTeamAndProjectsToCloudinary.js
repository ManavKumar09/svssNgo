/**
 * migrateTeamAndProjectsToCloudinary.js
 * -------------------------------------
 * Uploads all Team member photos and Project images from backend/uploads
 * (or frontend assets if needed) to Cloudinary and updates MongoDB records.
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

const TeamMember = require('./models/TeamMember');
const Project = require('./models/Project');

const uploadsDir = path.join(__dirname, 'uploads');
const teamDir = path.join(__dirname, '../frontend/src/assets/photos/Team');

async function uploadToCloudinary(filePath, folder = 'svss_ngo/team') {
    return cloudinary.uploader.upload(filePath, {
        folder,
        use_filename: true,
        unique_filename: true
    });
}

async function migrateTeam() {
    console.log('\n--- Migrating Team Members ---');
    const members = await TeamMember.find({});
    for (const member of members) {
        let fileToUpload = null;

        // Try from uploads
        if (member.image && member.image.startsWith('/uploads/')) {
            const uploadPath = path.join(uploadsDir, path.basename(member.image));
            if (fs.existsSync(uploadPath)) {
                fileToUpload = uploadPath;
            }
        }

        // If not in uploads or missing, check in frontend assets
        if (!fileToUpload) {
            // Find in teamDir
            const files = fs.readdirSync(teamDir);
            // Match by name or some logic if possible
            console.log(`Checking frontend for team member: ${member.name}`);
        }

        if (fileToUpload) {
            try {
                console.log(`Uploading for ${member.name}: ${path.basename(fileToUpload)}`);
                const res = await uploadToCloudinary(fileToUpload, 'svss_ngo/team');
                member.image = res.secure_url;
                await member.save();
                console.log(`✓ ${member.name} -> ${res.secure_url}`);
            } catch (err) {
                console.error(`✗ Error uploading ${member.name}:`, err.message);
            }
        } else {
            console.log(`! No local file found for ${member.name} (${member.image})`);
        }
    }
}

async function migrateProjects() {
    console.log('\n--- Migrating Project Images ---');
    const projects = await Project.find({});
    for (const p of projects) {
        let changed = false;

        // Header image
        if (p.headerImage && p.headerImage.startsWith('/uploads/')) {
            const fileName = path.basename(p.headerImage);
            const uploadPath = path.join(uploadsDir, fileName);
            if (fs.existsSync(uploadPath)) {
                try {
                    console.log(`Uploading header for ${p.title}: ${fileName}`);
                    const res = await uploadToCloudinary(uploadPath, 'svss_ngo/projects');
                    p.headerImage = res.secure_url;
                    changed = true;
                    console.log(`✓ Header -> ${res.secure_url}`);
                } catch (err) {
                    console.error(`✗ Failed header for ${p.title}:`, err.message);
                }
            } else {
                console.log(`! File not found in uploads: ${fileName}`);
            }
        }

        // Extra images array
        if (p.images && p.images.length > 0) {
            const newImages = [];
            for (const img of p.images) {
                if (img.startsWith('/uploads/')) {
                    const fileName = path.basename(img);
                    const uploadPath = path.join(uploadsDir, fileName);
                    if (fs.existsSync(uploadPath)) {
                        try {
                            const res = await uploadToCloudinary(uploadPath, 'svss_ngo/projects');
                            newImages.push(res.secure_url);
                            changed = true;
                        } catch (e) {
                            newImages.push(img);
                        }
                    } else {
                        newImages.push(img);
                    }
                } else {
                    newImages.push(img);
                }
            }
            p.images = newImages;
        }

        if (changed) {
            await p.save();
            console.log(`✓ Saved project: ${p.title}`);
        }
    }
}

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    await migrateTeam();
    await migrateProjects();

    console.log('\nAll done!');
    process.exit(0);
}

main().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
