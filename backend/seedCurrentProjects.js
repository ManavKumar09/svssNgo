const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const currentProjects = [
    {
        title: 'PODF (Producer Organization Development Fund)',
        description: 'Current Project',
        category: 'current',
        theme: '', // no theme for current projects in UI
        link: '/current-projects/podf',
        stats: [
            { value: '12', label: 'Active Projects supported by NABARD MP RO.' },
            { value: 'Ongoing', label: 'Empowering local farmers through cooperative models.' }
        ],
        headerImage: '',
        images: []
    },
    {
        title: 'CSS (Central Sector Scheme)',
        description: 'Current Project',
        category: 'current',
        theme: '', // no theme for current projects in UI
        link: '/current-projects/css',
        stats: [
            { value: '15', label: 'Projects under Formation and Promotion of 10,000 FPOs.' },
            { value: 'Active', label: 'NABARD MP RO supported projects across various districts.' }
        ],
        headerImage: '',
        images: []
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');

        for (const proj of currentProjects) {
            const exists = await Project.findOne({ title: proj.title });
            if (!exists) {
                await Project.create(proj);
                console.log(`Created DB entry for ${proj.title}`);
            }
        }
        
        console.log('Current Projects migration completed!');
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

connectDB();
