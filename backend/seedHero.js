const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const HeroSlide = require('./models/HeroSlide');

dotenv.config();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Frontend source photos directory
const frontendPhotosDir = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'photos');

const copyPhotoSafe = (srcName, destName) => {
    const srcPath = path.join(frontendPhotosDir, srcName);
    const destPath = path.join(uploadsDir, destName);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${srcName} -> ${destName}`);
        return `/uploads/${destName}`;
    }
    console.warn(`Source photo not found: ${srcPath}`);
    return `/uploads/${destName}`;
};

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
        destFile: 'hero-slide-1.jpg',
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
        destFile: 'hero-slide-2.jpg',
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
        destFile: 'hero-slide-3.jpg',
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
        destFile: 'hero-slide-4.jpeg',
        order: 4,
        isActive: true
    }
];

const seedHero = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/svss_ngo';
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected for Hero Slides seeding...');

        // Clear existing hero slides to avoid duplication
        await HeroSlide.deleteMany({});

        const docsToInsert = defaultSlides.map(slide => {
            const imageUrl = copyPhotoSafe(slide.srcFile, slide.destFile);
            return {
                titleLine1: slide.titleLine1,
                titleLine2: slide.titleLine2,
                subtitle: slide.subtitle,
                primaryBtnText: slide.primaryBtnText,
                primaryBtnLink: slide.primaryBtnLink,
                secondaryBtnText: slide.secondaryBtnText,
                secondaryBtnLink: slide.secondaryBtnLink,
                imageUrl,
                order: slide.order,
                isActive: slide.isActive
            };
        });

        await HeroSlide.insertMany(docsToInsert);
        console.log(`Successfully seeded ${docsToInsert.length} Hero Slides into MongoDB.`);
        process.exit(0);
    } catch (err) {
        console.error('Seeding Hero Slides failed:', err);
        process.exit(1);
    }
};

seedHero();
