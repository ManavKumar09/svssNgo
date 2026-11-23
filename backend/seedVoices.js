const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Voice = require('./models/Voice');

dotenv.config();

const initialVoices = [
    {
        quote: "Radio Awaz aur SVSS ki didi-bhaiyon ne humein swasthya aur paisa dono ki samajh di. Aaj humara ghar khud chal raha hai.",
        author: "Lata Devi",
        title: "SHG Member, Sehore",
        order: 1
    },
    {
        quote: "SVSS has been one of our most consistent grass-root partners on RKSK, PPSA and the Axshya TB project across multiple districts.",
        author: "Block Health Officer",
        title: "NHM, Madhya Pradesh",
        order: 2
    }
];

const seedVoices = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/svss_ngo';
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected for Voices seeding');

        // Clear existing voices
        await Voice.deleteMany();
        console.log('Existing voices cleared');

        const inserted = await Voice.insertMany(initialVoices);
        console.log(`Successfully seeded ${inserted.length} voices & testimonials into MongoDB`);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding voices:', err);
        process.exit(1);
    }
};

seedVoices();
