const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const TeamMember = require('./models/TeamMember');

dotenv.config();

const teamData = [
    // Executive Members
    {
        name: 'Sanjoy Kumar Sharma',
        role: 'President',
        order: 1,
        category: 'executive',
        sourceImg: 'President.jpeg',
        destImg: '/uploads/team-president.jpeg',
        detail: 'A seasoned development professional with over 35 years of experience in planning, executing, managing, and evaluating development projects. Adept at mentoring and building the capacity of diverse teams to deliver impactful results across various sectors. Maintains strong, collaborative relationships with INGOs, NGOs, corporate partners, and government officials.'
    },
    {
        name: 'Ranjan Kumar',
        role: 'Vice President',
        order: 2,
        category: 'executive',
        sourceImg: 'vicepresident.jpeg',
        destImg: '/uploads/team-vicepresident.jpeg',
        detail: 'Ranjan Kumar is a seasoned development professional and natural resource management expert with extensive experience in community development, sustainable livelihoods, environmental management, capacity building, and rural entrepreneurship. He has successfully coordinated and implemented a wide range of development projects supported by government institutions, NABARD, DST, UNDP, UNICEF, UNFPA, and other national and international organizations.'
    },
    {
        name: 'Sujoy Aich',
        role: 'Secretary',
        order: 3,
        category: 'executive',
        sourceImg: 'Secretary.jpeg',
        destImg: '/uploads/team-secretary.jpeg',
        detail: 'A Master of Social Work and seasoned development professional with over 25 years of experience in the social sector, collaborating with national and international funding agencies. He possesses strong expertise in liaising, networking, planning, and grassroots mobilization, driving transformative change in livelihood, rural development, and agriculture.'
    },
    {
        name: 'Dhirendra Kushwaha',
        role: 'Treasurer',
        order: 4,
        category: 'executive',
        sourceImg: 'Treasure.jpeg',
        destImg: '/uploads/team-treasurer.jpeg',
        detail: 'A dedicated development professional, social scientist, and social worker serving the sector since 1996. He has contributed to numerous programs supported by national and international agencies. His core expertise lies in program design, management, and assessment of development interventions, as well as developing micro-plans using participatory approaches.'
    },
    {
        name: 'Shipra Dey',
        role: 'Executive Member',
        order: 5,
        category: 'executive',
        sourceImg: 'ExecutiveMember.jpeg',
        destImg: '/uploads/team-exec1.jpeg',
        detail: 'An educationist and Rashtrapati Awardee in Bharat Scouts & Guides, she serves as a social and cultural envoy and is a national-level painting competition winner. With over 20 years of experience as a professionally trained Montessori educator, she is an exceptional career and study counselor.'
    },
    {
        name: 'Urvashi Wadhwa',
        role: 'Executive Member',
        order: 6,
        category: 'executive',
        sourceImg: 'ExecutiveMember2.jpeg',
        destImg: '/uploads/team-exec2.jpeg',
        detail: 'An academic language educationist, Urvashi is a professional educator and social worker with over three decades of experience. She is dedicated to imparting the highest quality of knowledge to her students, empowering them to excel in their lives.'
    },
    {
        name: 'Sanjay Khade',
        role: 'Executive Member',
        order: 7,
        category: 'executive',
        sourceImg: 'ExecutiveMember3.jpeg',
        destImg: '/uploads/team-exec3.jpeg',
        detail: 'A Social Networking Expert, Sanjay is a journalist across print and digital media, as well as an enthusiastic social activist. He brings extensive expertise in the research and production of documentaries and video series spanning social, cultural, and current affairs topics.'
    },
    {
        name: 'Ravindra Shankar Roy',
        role: 'Executive Member',
        order: 8,
        category: 'executive',
        sourceImg: 'ExecutiveMember4.jpeg',
        destImg: '/uploads/team-exec4.jpeg',
        detail: 'Holding a Master\'s degree in Fine Arts from Visva-Bharati University, Shantiniketan, this acclaimed artist has participated in prestigious global exhibitions. Recognized with awards from Bharat Bhavan and the MP State Art Exhibition, and holds a National Fellowship from the Ministry of Culture, CCRT.'
    },
    {
        name: 'Ajay Soni',
        role: 'Executive Member',
        order: 9,
        category: 'executive',
        sourceImg: 'ExecutiveMember5.jpeg',
        destImg: '/uploads/team-exec5.jpeg',
        detail: 'A dedicated social worker and entrepreneur, Ajay Soni has made significant contributions to skill development, education, vocational training, and information technology. Highly popular among the youth, he organizes engaging social and cultural activities.'
    },

    // Staff Members
    {
        name: 'Vaibhav Dwivedi',
        role: 'Consultant',
        order: 1,
        category: 'staff',
        sourceImg: 'staff1.jpeg',
        destImg: '/uploads/team-staff1.jpeg',
        detail: 'Consultant providing advisory and program development support across SVSS initiatives.'
    },
    {
        name: 'Rajendra Singh Gahlot',
        role: 'Project Coordinator',
        order: 2,
        category: 'staff',
        sourceImg: 'staff2.jpeg',
        destImg: '/uploads/team-staff2.jpeg',
        detail: 'Project Coordinator | MSc, PGDCA with 10-15 years of extensive development sector experience.'
    },
    {
        name: 'Jayant Dey',
        role: 'Project Coordinator',
        order: 3,
        category: 'staff',
        sourceImg: 'staff3.jpeg',
        destImg: '/uploads/team-staff3.jpeg',
        detail: 'Project Coordinator | B.Com, PGDCA with 10-15 years of professional project coordination experience.'
    },
    {
        name: 'Vimal Sharma',
        role: 'CEO - FPO',
        order: 4,
        category: 'staff',
        sourceImg: 'staff4.jpeg',
        destImg: '/uploads/team-staff4.jpeg',
        detail: 'Chief Executive Officer (CEO) - Farmer Producer Organization (FPO).'
    },
    {
        name: 'Rishabh',
        role: 'Staff Member',
        order: 5,
        category: 'staff',
        sourceImg: 'staff5.jpeg',
        destImg: '/uploads/team-staff5.jpeg',
        detail: 'Dedicated staff member supporting project operations and community coordination.'
    },
    {
        name: 'Preeti Dhurwey',
        role: 'MIS Expert',
        order: 6,
        category: 'staff',
        sourceImg: 'staff6.jpeg',
        destImg: '/uploads/team-staff6.jpeg',
        detail: 'MIS Expert | B.Com with 5 years of experience in data management, reporting, and monitoring.'
    }
];

const seedTeam = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/svss_ngo';
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('Connected to database.');

        // Ensure uploads directory exists
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Clean out any previous dummy staff entries
        await TeamMember.deleteMany({ category: 'staff' });
        console.log('Refreshed staff members collection.');

        // Copy source images if available in frontend
        const frontendPhotosDir = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'photos', 'Team');

        for (const item of teamData) {
            let imagePath = '';
            if (fs.existsSync(frontendPhotosDir)) {
                const srcPath = path.join(frontendPhotosDir, item.sourceImg);
                const destFileName = path.basename(item.destImg);
                const destPath = path.join(uploadsDir, destFileName);
                if (fs.existsSync(srcPath)) {
                    fs.copyFileSync(srcPath, destPath);
                    imagePath = item.destImg;
                }
            }

            const existing = await TeamMember.findOne({ name: item.name });
            if (existing) {
                existing.role = item.role;
                existing.order = item.order;
                existing.detail = item.detail;
                existing.category = item.category || 'executive';
                if (imagePath) existing.image = imagePath;
                await existing.save();
                console.log(`Updated team member: ${item.name} (${existing.category})`);
            } else {
                await TeamMember.create({
                    name: item.name,
                    role: item.role,
                    detail: item.detail,
                    order: item.order,
                    category: item.category || 'executive',
                    image: imagePath || ''
                });
                console.log(`Created team member: ${item.name} (${item.category})`);
            }
        }

        console.log('\n========================================');
        console.log('Team members (Executive & Staff) seeded successfully!');
        console.log('========================================\n');
        process.exit(0);
    } catch (err) {
        console.error('Failed to seed team members:', err.message);
        process.exit(1);
    }
};

seedTeam();
