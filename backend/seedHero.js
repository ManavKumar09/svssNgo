const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const HeroSlide = require('./models/HeroSlide');

dotenv.config();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 't6h2lvhg',
    api_key: process.env.CLOUDINARY_API_KEY || '991397586125354',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'fZ9KP8eflfB5GHSN5IW-SLGvqto'
});

const frontendPhotosDir = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'photos');

const defaultSlides = [
    {
        titleLine1: 'Empowered women,',
        titleLine2: 'stronger villages.',
        subtitle: 'Self-help groups, sericulture and handlooms — 2.5 lakh women and counting, building dignity through work.',
        primaryBtnText: 'Our Work & Impact',
        primaryBtnLink: '/completed-projects',
        secondaryBtnText: 'Involve with us',
        secondaryBtnLink: '/volunteer',
        srcFile: 'home3.JPG',
        order: 1,
        isActive: true
    },
    {
        titleLine1: 'Grassroot Action,',
        titleLine2: 'Lasting Impact.',
        subtitle: 'Community mobilization, nutrition & health initiatives transforming rural Central India since 1988.',
        primaryBtnText: 'Explore Projects',
        primaryBtnLink: '/current-projects',
        secondaryBtnText: 'Volunteer With Us',
        secondaryBtnLink: '/volunteer',
        srcFile: 'home2.JPG',
        order: 2,
        isActive: true
    },
    {
        titleLine1: 'Sustainable Agriculture,',
        titleLine2: 'Tribal Prosperity.',
        subtitle: 'Enabling smallholder farmers and indigenous communities with modern organic practices and Tribe Roots value addition.',
        primaryBtnText: 'Tribe Roots Store',
        primaryBtnLink: '/tribe-roots',
        secondaryBtnText: 'Our Partners',
        secondaryBtnLink: '/completed-projects',
        srcFile: 'Home1.JPG',
        order: 3,
        isActive: true
    },
    {
        titleLine1: 'Child Protection & Health,',
        titleLine2: 'For Every Life.',
        subtitle: 'Dedicated 1098 child helpline, ASHA volunteer networks, and school WASH programs across 95+ villages.',
        primaryBtnText: 'Childline Impact',
        primaryBtnLink: '/completed-projects/child-help-line',
        secondaryBtnText: 'Get In Touch',
        secondaryBtnLink: '/contact',
        srcFile: 'home4.jpeg',
        order: 4,
        isActive: true
    }
];

const seedHero = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/svss_ngo';
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected for Hero Slides seeding...');

        await HeroSlide.deleteMany({});
        console.log('Cleared existing hero slides.');

        const docsToInsert = [];
        for (const slide of defaultSlides) {
            const srcPath = path.join(frontendPhotosDir, slide.srcFile);
            if (!fs.existsSync(srcPath)) {
                console.warn(`Source not found: ${srcPath} — skipping`);
                continue;
            }
            console.log(`Uploading ${slide.srcFile} to Cloudinary...`);
            const result = await cloudinary.uploader.upload(srcPath, {
                folder: 'svss_ngo/images',
                use_filename: true,
                unique_filename: true
            });
            console.log(`✓ ${slide.srcFile} → ${result.secure_url}`);
            docsToInsert.push({
                titleLine1: slide.titleLine1,
                titleLine2: slide.titleLine2,
                subtitle: slide.subtitle,
                primaryBtnText: slide.primaryBtnText,
                primaryBtnLink: slide.primaryBtnLink,
                secondaryBtnText: slide.secondaryBtnText,
                secondaryBtnLink: slide.secondaryBtnLink,
                imageUrl: result.secure_url,
                order: slide.order,
                isActive: slide.isActive
            });
        }

        await HeroSlide.insertMany(docsToInsert);
        console.log(`Successfully seeded ${docsToInsert.length} Hero Slides into MongoDB.`);
        process.exit(0);
    } catch (err) {
        console.error('Seeding Hero Slides failed:', err);
        process.exit(1);
    }
};

seedHero();
