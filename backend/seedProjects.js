const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const Project = require('./models/Project');

// Organized projects data for completed projects
const projectData = [
    { id: 'aer-atma', theme: 'agriculture-livelihood', title: 'AER under ATMA', stats: [{ value: 'Ongoing', label: 'Agriculture extension.' }], link: '/completed-projects/aer-atma', imageSrc: '../frontend/src/assets/photos/Aer/Aer1.png' },
    { id: 'farmer-club', theme: 'agriculture-livelihood', title: 'Farmer Club Promotion', stats: [{ value: 'Multiple', label: 'Clubs formed.' }], link: '/completed-projects/farmer-club', imageSrc: '../frontend/src/assets/photos/fcp/fcp1.png' },
    { id: 'integrated-farming', theme: 'agriculture-livelihood', title: 'Integrated Farming & Eco-friendly Agriculture', stats: [{ value: 'Sustainable', label: 'Farming practices.' }], link: '/completed-projects/integrated-farming', imageSrc: '../frontend/src/assets/photos/IntegratedFarming/IntegratedFarming1.png' },
    { id: 'entrepreneurship', theme: 'agriculture-livelihood', title: 'Entrepreneurship Development Program', stats: [{ value: 'Skill', label: 'Development and training.' }], link: '/completed-projects/entrepreneurship', imageSrc: '../frontend/src/assets/photos/Entrepreneurship/Entrepreneurship1.png' },
    { id: 'livelihood-water', theme: 'agriculture-livelihood', title: 'Livelihood Development & Safe Drinking Water', stats: [{ value: 'Access', label: 'To clean resources.' }], link: '/completed-projects/livelihood-water', imageSrc: '../frontend/src/assets/photos/LivelihoodDevelopment/livelihoodDevelopment1.png' },
    { id: 'rksk', theme: 'health-sanitation', title: 'National Health Mission RKSK Program', stats: [{ value: 'Health', label: 'Adolescent health program.' }], link: '/completed-projects/national-health-mission', imageSrc: '../frontend/src/assets/photos/nationalhealth/NationalHealth1.png' },
    { id: 'asha', theme: 'health-sanitation', title: 'NHM ASHA Training Program', stats: [{ value: 'Training', label: 'For health workers.' }], link: '/completed-projects/nhm-asha', imageSrc: '../frontend/src/assets/photos/nhmASHA/nhaASHA1.png' },
    { id: 'sti-hiv', theme: 'health-sanitation', title: 'Targeted Intervention for STI and HIV', stats: [{ value: 'Awareness', label: 'And medical support.' }], link: '/completed-projects/targeted-intervention', imageSrc: '../frontend/src/assets/photos/targetedIntervention/targetedIntervention1.png' },
    { id: 'sanitation', theme: 'health-sanitation', title: 'Total Sanitation Campaign (TSC)', stats: [{ value: 'Sanitation', label: 'Household latrines & community hygiene promotion.' }, { value: 'RSM & Centers', label: 'Rural Sanitary Marts & production units in Bilaspur & Janjgir.' }], link: '/completed-projects/total-sanitation', imageSrc: null },
    { id: 'wfp', theme: 'health-sanitation', title: 'World Food Programme', stats: [{ value: 'Nutrition', label: 'Food security initiatives.' }], link: '/completed-projects/world-food-programme', imageSrc: '../frontend/src/assets/photos/WorldFood/WorldFood1.png' },
    { id: 'climate', theme: 'environment-climate', title: 'Climate Change Initiative', stats: [{ value: 'Action', label: 'Climate resilience.' }], link: '/completed-projects/climate-change', imageSrc: '../frontend/src/assets/photos/climatechange/enhanced_climate_1.png' },
    { id: 'wetland', theme: 'environment-climate', title: 'Environment and Wetland Conservation', stats: [{ value: 'Conservation', label: 'Protecting local wetlands.' }], link: '/completed-projects/environment-wetland', imageSrc: null },
    { id: 'child-help-line', theme: 'community-empowerment', title: 'Child Help Line 1098', stats: [{ value: '24/7', label: 'Emergency phone service.' }, { value: '10,000+', label: 'Calls answered.' }], link: '/completed-projects/child-help-line', imageSrc: '../frontend/src/assets/photos/childline/childline4.png' },
    { id: 'shg', theme: 'community-empowerment', title: 'Formation and Strengthening Self Help Group', stats: [{ value: 'Empowerment', label: 'Women and community groups.' }], link: '/completed-projects/self-help-group', imageSrc: '../frontend/src/assets/photos/selfhelpgroup/SelfHelpGroup1.png' }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
        
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)){
            fs.mkdirSync(uploadsDir);
        }

        for (const proj of projectData) {
            let headerImage = '';
            if (proj.imageSrc) {
                const source = path.join(__dirname, proj.imageSrc);
                if (fs.existsSync(source)) {
                    const fileName = path.basename(source);
                    const targetName = `project-${Date.now()}-${fileName}`;
                    const target = path.join(uploadsDir, targetName);
                    fs.copyFileSync(source, target);
                    headerImage = `/uploads/${targetName}`;
                    console.log(`Copied ${fileName}`);
                } else {
                    console.log(`Missing image: ${source}`);
                }
            }
            
            const exists = await Project.findOne({ title: proj.title });
            if (!exists) {
                await Project.create({
                    title: proj.title,
                    description: 'Migrated completed project',
                    category: 'completed',
                    theme: proj.theme,
                    link: proj.link,
                    stats: proj.stats,
                    headerImage: headerImage,
                    images: []
                });
                console.log(`Created DB entry for ${proj.title}`);
            }
        }
        
        console.log('Projects migration completed!');
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

connectDB();
