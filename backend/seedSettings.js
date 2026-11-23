const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Setting = require('./models/Setting');

dotenv.config();

const seedSettings = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/svss_ngo';
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected for Settings seeding');

        let setting = await Setting.findOne({ key: 'site_settings' });
        if (!setting) {
            setting = await Setting.create({
                key: 'site_settings',
                email: 'svssngobpl@gmail.com',
                phone1: '+91-9425373168',
                phone2: '',
                address: 'M-20/3-A, Saket Nagar, Bhopal-462001, Madhya Pradesh, India',
                workingHours: 'Mon–Sat, 10am – 6pm',
                radioStation: 'SVSS Community Radio Station 91.2 MHz FM — Radio Awaz',
                fcraCert: 'Registered under Societies Registration Act, 1860 · FCRA Registered · 12A & 80G Certified',
                facebookUrl: 'https://facebook.com',
                instagramUrl: 'https://instagram.com',
                twitterUrl: 'https://twitter.com',
                youtubeUrl: 'https://youtube.com'
            });
            console.log('Created initial site settings in MongoDB');
        } else {
            console.log('Site settings already exist in MongoDB');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error seeding settings:', err);
        process.exit(1);
    }
};

seedSettings();
