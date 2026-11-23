const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Stat = require('./models/Stat');

dotenv.config();

const initialStats = [
    {
        label: 'YEARS OF COMPLETION',
        number: 38,
        suffix: '+',
        order: 1
    },
    {
        label: 'ADOLESCENTS REACHED ON SRH',
        number: 350000,
        suffix: '+',
        order: 2
    },
    {
        label: 'ADOLESCENT GIRLS (15-35 YRS) SRHR',
        number: 80600,
        suffix: '+',
        order: 3
    },
    {
        label: 'HOUSEHOLD TOILETS PROMOTED',
        number: 13200,
        suffix: '+',
        order: 4
    },
    {
        label: 'WOMEN & GIRLS SKILL DEVELOPMENT',
        number: 8500,
        suffix: '+',
        order: 5
    },
    {
        label: 'CHILDREN — WASH AT SCHOOL',
        number: 17200,
        suffix: '+',
        order: 6
    },
    {
        label: 'HEALTH BENEFITS',
        number: 10200,
        suffix: '+',
        order: 7
    },
    {
        label: 'NATURAL RESOURCE MANAGEMENT',
        number: 4550,
        suffix: '+',
        order: 8
    },
    {
        label: 'COMMUNITY MEMBERS ENGAGED',
        number: 250000,
        suffix: '+',
        order: 9
    }
];

const seedStats = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/svss_ngo';
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected for Stats seeding');

        // Clear existing stats
        await Stat.deleteMany();
        console.log('Existing stats cleared');

        // Insert new stats
        const created = await Stat.insertMany(initialStats);
        console.log(`Successfully seeded ${created.length} impact statistics into MongoDB`);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding stats:', err);
        process.exit(1);
    }
};

seedStats();
