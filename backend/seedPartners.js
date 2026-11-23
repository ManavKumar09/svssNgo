const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Partner = require('./models/Partner');

dotenv.config();

const PARTNER_META = {
    'UNDP-logo.jpg': { name: 'United Nations Development Programme (UNDP)', category: 'donor' },
    'unicef.jpg': { name: 'UNICEF', category: 'donor' },
    'wfp.jpg': { name: 'World Food Programme (WFP)', category: 'donor' },
    'unhabitat.jpg': { name: 'UN-Habitat', category: 'donor' },
    'nabard.jpg': { name: 'NABARD', category: 'government' },
    'nabkisan.jpg': { name: 'NABKISAN Finance Ltd.', category: 'partner' },
    'govtofindia.jpg': { name: 'Government of India', category: 'government' },
    'governmentofmp.jpg': { name: 'Government of Madhya Pradesh', category: 'government' },
    'GOI-Agriculture.jpg': { name: 'Ministry of Agriculture & Farmers Welfare, GOI', category: 'government' },
    'Ministry-of-Information-Bro.jpg': { name: 'Ministry of Information & Broadcasting', category: 'government' },
    'develoment-commissioner-han.jpg': { name: 'Development Commissioner (Handicrafts)', category: 'government' },
    'panchyati-raj.jpg': { name: 'Panchayati Raj Department, Govt of MP', category: 'government' },
    'child-line.jpg': { name: 'Childline India Foundation (1098)', category: 'partner' },
    'nhm-mp.jpg': { name: 'National Health Mission (NHM) MP', category: 'government' },
    'mpcost.jpg': { name: 'MP Council of Science & Technology (MPCST)', category: 'government' },
    'mpsacs.jpg': { name: 'MP State AIDS Control Society (MPSACS)', category: 'government' },
    'nafed.jpg': { name: 'NAFED', category: 'government' },
    'sfac.jpg': { name: 'Small Farmers Agri-Business Consortium (SFAC)', category: 'government' },
    'pratham.jpg': { name: 'Pratham Education Foundation', category: 'partner' },
    'ipas.jpg': { name: 'Ipas Development Foundation', category: 'partner' },
    'dieago.jpg': { name: 'Diageo', category: 'corporate' },
    'Coca_Cola_NDTV_Support_My_S.jpg': { name: 'Coca-Cola NDTV Support My School', category: 'corporate' },
    'IGSSS.jpg': { name: 'Indo-Global Social Service Society (IGSSS)', category: 'partner' },
    'caf.jpg': { name: 'Charities Aid Foundation (CAF)', category: 'donor' },
    'cemca.jpg': { name: 'CEMCA', category: 'partner' },
    'ncstc.jpg': { name: 'NCSTC - Dept of Science & Technology', category: 'government' },
    'EPCO.jpg': { name: 'Environmental Planning & Coordination Organisation (EPCO)', category: 'government' },
    'Grow100.jpg': { name: 'Grow100', category: 'partner' },
    'lepra.jpg': { name: 'Lepra Society', category: 'partner' },
    'logo-tsc.jpg': { name: 'Total Sanitation Campaign (TSC)', category: 'government' },
    'mij.jpg': { name: 'MIJ Partner Organization', category: 'partner' }
};

const seedPartners = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/svss_ngo';
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected for Partners seeding');

        const sourceDir = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'photos', 'partners');
        const uploadDir = path.join(__dirname, 'uploads');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const files = fs.readdirSync(sourceDir);
        const partnerDocs = [];

        let orderCount = 1;
        for (const file of files) {
            const ext = path.extname(file);
            if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) continue;

            const sourcePath = path.join(sourceDir, file);
            const targetFilename = `partner-seed-${file}`;
            const targetPath = path.join(uploadDir, targetFilename);

            fs.copyFileSync(sourcePath, targetPath);

            const meta = PARTNER_META[file] || {
                name: path.basename(file, ext).replace(/[-_]/g, ' '),
                category: 'partner'
            };

            partnerDocs.push({
                name: meta.name,
                logo: `/uploads/${targetFilename}`,
                category: meta.category,
                websiteUrl: '',
                order: orderCount++
            });
        }

        // Clear existing partners
        await Partner.deleteMany();
        console.log('Existing partners cleared');

        const inserted = await Partner.insertMany(partnerDocs);
        console.log(`Successfully seeded ${inserted.length} partners & donors into MongoDB`);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding partners:', err);
        process.exit(1);
    }
};

seedPartners();
