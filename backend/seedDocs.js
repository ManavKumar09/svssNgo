const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const Policy = require('./models/Policy');

const documentsToMigrate = [
    // Annual Reports
    {
        title: 'Annual Report 2024-25',
        category: 'annual',
        sourcePath: '../frontend/public/Reports/Annual -Report-2024-25.pdf',
        targetName: 'Annual-Report-2024-25.pdf'
    },
    {
        title: 'Annual Report 2023-24',
        category: 'annual',
        sourcePath: '../frontend/public/Reports/Annual-Report-23-24.pdf',
        targetName: 'Annual-Report-23-24.pdf'
    },
    {
        title: 'Annual Report 2022-23',
        category: 'annual',
        sourcePath: '../frontend/public/Reports/Annual-Report-2022-23.pdf',
        targetName: 'Annual-Report-2022-23.pdf'
    },
    // Audit Reports
    {
        title: 'Audit Report 2024-25',
        category: 'audit',
        sourcePath: '../frontend/public/Reports/Audit-report-2024-25.pdf',
        targetName: 'Audit-report-2024-25.pdf'
    },
    {
        title: 'Audit Report 2023-24',
        category: 'audit',
        sourcePath: '../frontend/public/Reports/Audit-report-2023-24.pdf',
        targetName: 'Audit-report-2023-24.pdf'
    },
    // Policies
    {
        title: 'Donor Management Policy',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/Donor-Management-Policy.pdf',
        targetName: 'Donor-Management-Policy.pdf'
    },
    {
        title: 'Inventory Purchase & Sales Policy',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/Institutional-and-Project-Level-Inventory-Purchase-&-Sales-Policy.pdf',
        targetName: 'Institutional-and-Project-Level-Inventory-Purchase-and-Sales-Policy.pdf'
    },
    {
        title: 'Project Operational Policies',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/Project-Operational-Policies.pdf',
        targetName: 'Project-Operational-Policies.pdf'
    },
    {
        title: 'Statutory Compliance & Reporting',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/Statutory-Compliance-and-Stakeholder-Management-&-Reporting Policy.pdf',
        targetName: 'Statutory-Compliance-and-Stakeholder-Management-and-Reporting-Policy.pdf'
    },
    {
        title: 'Travel Policy',
        category: 'policy',
        sourcePath: '../frontend/public/Policies/SVSS-Travel-Policy.pdf',
        targetName: 'SVSS-Travel-Policy.pdf'
    },
    // Organization Documents
    {
        title: 'SVSS New Profile 2025',
        category: 'organization',
        sourcePath: '../frontend/public/organization-document/SVSS-New-Profile-2025-1.docx',
        targetName: 'SVSS-New-Profile-2025-1.docx'
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
        
        // Ensure uploads directory exists
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)){
            fs.mkdirSync(uploadsDir);
        }

        for (const doc of documentsToMigrate) {
            const source = path.join(__dirname, doc.sourcePath);
            const target = path.join(uploadsDir, doc.targetName);
            
            if (fs.existsSync(source)) {
                fs.copyFileSync(source, target);
                console.log(`Copied ${doc.targetName}`);
                
                // Create document entry if it doesn't already exist
                const exists = await Policy.findOne({ title: doc.title });
                if (!exists) {
                    await Policy.create({
                        title: doc.title,
                        category: doc.category,
                        content: '',
                        document: `/uploads/${doc.targetName}`
                    });
                    console.log(`Created DB entry for ${doc.title}`);
                }
            } else {
                console.log(`Source not found: ${source}`);
            }
        }
        
        console.log('Migration completed!');
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

connectDB();
