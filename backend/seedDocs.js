const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const Policy = require('./models/Policy');

const documentsToSeed = [
    // Annual Reports
    {
        title: 'Annual Report 2024-25',
        category: 'annual',
        sourcePath: '../frontend/public/Reports/Annual -Report-2024-25.pdf'
    },
    {
        title: 'Annual Report 2023-24',
        category: 'annual',
        sourcePath: '../frontend/public/Reports/Annual-Report-23-24.pdf'
    },
    {
        title: 'Annual Report 2022-23',
        category: 'annual',
        sourcePath: '../frontend/public/Reports/Annual-Report-2022-23.pdf'
    },
    // Audit Reports
    {
        title: 'Audit Report 2024-25',
        category: 'audit',
        sourcePath: '../frontend/public/Reports/Audit-report-2024-25.pdf'
    },
    {
        title: 'Audit Report 2023-24',
        category: 'audit',
        sourcePath: '../frontend/public/Reports/Audit-report-2023-24.pdf'
    },
    // Policies
    {
        title: 'Donor Management Policy',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/Donor-Management-Policy.pdf'
    },
    {
        title: 'Inventory Purchase & Sales Policy',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/Institutional-and-Project-Level-Inventory-Purchase-&-Sales-Policy.pdf'
    },
    {
        title: 'Project Operational Policies',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/Project-Operational-Policies.pdf'
    },
    {
        title: 'Statutory Compliance & Reporting',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/Statutory-Compliance-and-Stakeholder-Management-&-Reporting Policy.pdf'
    },
    {
        title: 'Travel Policy',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/SVSS-Travel-Policy.pdf'
    },
    // Organization Documents
    {
        title: 'SVSS New Profile 2025',
        category: 'organization',
        sourcePath: '../frontend/public/organization-document/SVSS-New-Profile-2025-1.docx'
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');

        for (const doc of documentsToSeed) {
            const source = path.join(__dirname, doc.sourcePath);
            if (!fs.existsSync(source)) {
                console.warn(`Source not found: ${source} — skipping`);
                continue;
            }
            const exists = await Policy.findOne({ title: doc.title });
            if (exists && exists.document && exists.document.startsWith('http')) {
                console.log(`SKIP (already Cloudinary): ${doc.title}`);
                continue;
            }
            console.log(`Uploading ${path.basename(source)} to Cloudinary...`);
            const result = await cloudinary.uploader.upload(source, {
                resource_type: 'raw',
                folder: 'svss_ngo/documents',
                use_filename: true,
                unique_filename: true
            });
            console.log(`✓ ${path.basename(source)} → ${result.secure_url}`);
            if (exists) {
                exists.document = result.secure_url;
                await exists.save();
            } else {
                await Policy.create({
                    title: doc.title,
                    category: doc.category,
                    content: '',
                    document: result.secure_url
                });
            }
        }

        console.log('Document seeding completed!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

connectDB();
