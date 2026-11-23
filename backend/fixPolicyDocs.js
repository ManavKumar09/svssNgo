/**
 * fixPolicyDocs.js
 * ----------------
 * Cloudinary free tier blocks public direct download of 'raw' files (PDFs, DOCX)
 * with a 401 "deny or ACL failure" error unless signed URLs are used.
 *
 * All our SVSS official documents and reports are already stored in frontend/public/
 * and served at high speed by Cloudflare Pages CDN at https://svssindia.com/...
 *
 * This script updates all Policy documents in MongoDB to point directly to these
 * reliable, fast Cloudflare Pages URLs so they open instantly in any browser.
 */

const mongoose = require('mongoose');
require('dotenv').config();
const Policy = require('./models/Policy');

const cfBase = 'https://svssindia.com';

const docMapping = [
    { title: 'Annual Report 2024-25', url: `${cfBase}/Reports/Annual%20-Report-2024-25.pdf` },
    { title: 'Annual Report 2023-24', url: `${cfBase}/Reports/Annual-Report-23-24.pdf` },
    { title: 'Annual Report 2022-23', url: `${cfBase}/Reports/Annual-Report-2022-23.pdf` },
    { title: 'Audit Report 2024-25', url: `${cfBase}/Reports/Audit-report-2024-25.pdf` },
    { title: 'Audit Report 2023-24', url: `${cfBase}/Reports/Audit-report-2023-24.pdf` },
    { title: 'Donor Management Policy', url: `${cfBase}/Policies/Donor-Management-Policy.pdf` },
    { title: 'Inventory Purchase & Sales Policy', url: `${cfBase}/Policies/Institutional-and-Project-Level-Inventory-Purchase-&-Sales-Policy.pdf` },
    { title: 'Project Operational Policies', url: `${cfBase}/Policies/Project-Operational-Policies.pdf` },
    { title: 'Statutory Compliance & Reporting', url: `${cfBase}/Policies/Statutory-Compliance-and-Stakeholder-Management-&-Reporting%20Policy.pdf` },
    { title: 'Travel Policy', url: `${cfBase}/Policies/SVSS-Travel-Policy.pdf` },
    { title: 'SVSS New Profile 2025', url: `${cfBase}/organization-document/SVSS-New-Profile-2025-1.docx` }
];

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    for (const item of docMapping) {
        const doc = await Policy.findOne({ title: item.title });
        if (doc) {
            doc.document = item.url;
            await doc.save();
            console.log(`✓ ${item.title} -> ${item.url}`);
        } else {
            console.log(`! Doc not found: ${item.title}`);
        }
    }

    console.log('\nAll Policy documents updated successfully!');
    process.exit(0);
}

main().catch(err => {
    console.error('Error updating policy docs:', err);
    process.exit(1);
});
