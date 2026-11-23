const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const Project = require('./models/Project');

const allProjects = [
    {
        title: 'AER under ATMA',
        category: 'completed',
        theme: 'agriculture-livelihood',
        link: '/completed-projects/aer-atma',
        stats: [{ value: 'Ongoing', label: 'Agriculture extension.' }],
        headerSrc: '../frontend/src/assets/photos/Aer/Aer1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/Aer/Aer2.png',
            '../frontend/src/assets/photos/Aer/Aer3.png',
            '../frontend/src/assets/photos/Aer/Aer4.png',
            '../frontend/src/assets/photos/Aer/Aer5.png'
        ],
        description: `Enhancing Agriculture Productivity under the ATMA project across Shahdol, Singroli, Anooppur, Dindori and Vidisha districts (12 blocks in MP), supported by Farmer Welfare and Agriculture Development Dept. Govt. of Madhya Pradesh.\n\nInterventions include:\n- Demonstration on agriculture seed support (Soybean, organic manure, IPM) and 52 Vermi-compost units.\n- Vegetable cultivation with trellis (Mandwa) systems for creeper crops and agro-forestry.\n- 12 Farmer Field Schools (FFS) established covering 50-80 farmers each on Good Agriculture Practices (GAP).\n- 36 capacity-building training programs organized for SHGs, Kisan Clubs, and vegetable grower groups.`
    },
    {
        title: 'Farmer Club Promotion',
        category: 'completed',
        theme: 'agriculture-livelihood',
        link: '/completed-projects/farmer-club',
        stats: [{ value: 'Multiple', label: 'Clubs formed.' }],
        headerSrc: '../frontend/src/assets/photos/fcp/fcp1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/fcp/fcp2.png',
            '../frontend/src/assets/photos/fcp/fcp3.png'
        ],
        description: `Empowering farming communities across Sehore and Bhopal districts with the support of NABARD, Regional Rural Banks, and Cooperative Banks.\n\nKey achievements & interventions:\n- Facilitated 305 Farmer Clubs with 4,575 member farmers in Sehore district.\n- Facilitated 99 Farmer Clubs with 1,485 member farmers in Bhopal district.\n- Technology transfer, skill development, credit counseling, and loan recovery assistance.\n- Implementation of digitization of farmers' club records for institutional sustainability.`
    },
    {
        title: 'Integrated Farming & Eco-friendly Agriculture',
        category: 'completed',
        theme: 'agriculture-livelihood',
        link: '/completed-projects/integrated-farming',
        stats: [{ value: 'Sustainable', label: 'Farming practices.' }],
        headerSrc: '../frontend/src/assets/photos/IntegratedFarming/IntegratedFarming1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/IntegratedFarming/IntegratedFarming2.png',
            '../frontend/src/assets/photos/IntegratedFarming/IntegratedFarming3.png'
        ],
        description: `Economic and Environment Security for Women Farmers across 6 villages in Fanda Block, Bhopal District, supported by United Spirits Limited (USL - CSR).\n\nKey interventions:\n- Working directly with 200 women farmers to increase family incomes by Rs. 6,000-10,000.\n- Crop intensification (wheat, gram) and commercial vegetable diversification.\n- Establishment of 6 Farm Schools equipped with soil testing and bio-pesticide demos.\n- Formation of village-level Women Farmers Federations and training 12 Community Resource Persons (CRPs).`
    },
    {
        title: 'Entrepreneurship Development Program',
        category: 'completed',
        theme: 'agriculture-livelihood',
        link: '/completed-projects/entrepreneurship',
        stats: [{ value: 'Skill', label: 'Development and training.' }],
        headerSrc: '../frontend/src/assets/photos/Entrepreneurship/Entrepreneurship1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/Entrepreneurship/Entrepreneurship2.png',
            '../frontend/src/assets/photos/Entrepreneurship/Entrepreneurship3.png'
        ],
        description: `Entrepreneurship Development and Vocational Skill Training initiative empowering rural youth and women to build self-sustaining micro-enterprises.\n\nKey focus areas:\n- Technical skills training in agro-processing, tailoring, handicrafts, and small trades.\n- Business management, financial literacy, accounting, and government scheme linkages.\n- Mentorship and market backward/forward integration for aspiring rural entrepreneurs.`
    },
    {
        title: 'Livelihood Development & Safe Drinking Water',
        category: 'completed',
        theme: 'agriculture-livelihood',
        link: '/completed-projects/livelihood-water',
        stats: [{ value: 'Access', label: 'To clean resources.' }],
        headerSrc: '../frontend/src/assets/photos/LivelihoodDevelopment/livelihoodDevelopment1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/LivelihoodDevelopment/livelihoodDevelopment2.png',
            '../frontend/src/assets/photos/LivelihoodDevelopment/livelihoodDevelopment3.png'
        ],
        description: `Integrated community watershed, safe drinking water, and sustainable livelihoods program in backward rural clusters.\n\nKey interventions:\n- Installation and rejuvenation of safe community drinking water sources and water filtration.\n- Watershed management, bunding, and rainwater harvesting structures.\n- Sustainable livelihood diversification for landless and smallholder farm families.`
    },
    {
        title: 'National Health Mission RKSK Program',
        category: 'completed',
        theme: 'health-sanitation',
        link: '/completed-projects/national-health-mission',
        stats: [{ value: 'Health', label: 'Adolescent health program.' }],
        headerSrc: '../frontend/src/assets/photos/nationalhealth/NationalHealth1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/nationalhealth/NationalHealth2.png',
            '../frontend/src/assets/photos/nationalhealth/NationalHealth3.png'
        ],
        description: `Rashtriya Kishor Swasthya Karyakram (RKSK) under National Health Mission (NHM) dedicated to holistic adolescent health.\n\nKey components:\n- Adolescent Friendly Health Clinics (AFHC) mobilization and counseling sessions.\n- Nutrition awareness, prevention of anemia, menstrual hygiene education, and distribution of sanitary napkins.\n- Awareness campaigns against substance abuse, early marriage, and mental health challenges.`
    },
    {
        title: 'NHM ASHA Training Program',
        category: 'completed',
        theme: 'health-sanitation',
        link: '/completed-projects/nhm-asha',
        stats: [{ value: 'Training', label: 'For health workers.' }],
        headerSrc: '../frontend/src/assets/photos/nhmASHA/nhaASHA1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/nhmASHA/nhaASHA2.png',
            '../frontend/src/assets/photos/nhmASHA/nhaASHA3.png'
        ],
        description: `Capacity building and modular training for Accredited Social Health Activists (ASHAs) under the National Health Mission.\n\nKey training focus:\n- Maternal and neonatal healthcare, institutional delivery facilitation, and high-risk pregnancy tracking.\n- Universal immunization tracking, child malnutrition screening, and disease surveillance.\n- Interpersonal communication skills and community mobilization techniques.`
    },
    {
        title: 'Targeted Intervention for STI and HIV',
        category: 'completed',
        theme: 'health-sanitation',
        link: '/completed-projects/targeted-intervention',
        stats: [{ value: 'Awareness', label: 'And medical support.' }],
        headerSrc: '../frontend/src/assets/photos/targetedIntervention/targetedIntervention1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/targetedIntervention/targetedIntervention2.png',
            '../frontend/src/assets/photos/targetedIntervention/targetedIntervention3.png'
        ],
        description: `Targeted Intervention project supported by Madhya Pradesh State AIDS Control Society (MPSACS) for prevention and control of HIV/AIDS and Sexually Transmitted Infections (STIs).\n\nKey interventions:\n- Regular health camps, STI diagnosis, treatment, and integrated testing center referrals.\n- Behavior Change Communication (BCC), safe health practices promotion, and counseling.\n- Community mobilization and stigma reduction in vulnerable populations.`
    },
    {
        title: 'Total Sanitation Campaign (TSC)',
        category: 'completed',
        theme: 'health-sanitation',
        link: '/completed-projects/total-sanitation',
        stats: [
            { value: 'Sanitation', label: 'Household latrines & community hygiene promotion.' },
            { value: 'RSM & Centers', label: 'Rural Sanitary Marts & production units in Bilaspur & Janjgir.' }
        ],
        headerSrc: null,
        gallerySrcs: [],
        description: `Promoting household toilet construction and proper hygienic usage across rural areas under Total Sanitation Campaign (TSC) funded by PHED & UNICEF.\n\nKey interventions:\n- Running Rural Sanitary Marts (RSM) and low-cost sanitary production centers in Bilaspur & Janjgir districts (Chhattisgarh state).\n- Community mobilization in block Pendra for Open Defecation Free (ODF) achievement.\n- Information, Education & Communication (IEC) rallies, mason trainings, and school hygiene campaigns.`
    },
    {
        title: 'World Food Programme',
        category: 'completed',
        theme: 'health-sanitation',
        link: '/completed-projects/world-food-programme',
        stats: [{ value: 'Nutrition', label: 'Food security initiatives.' }],
        headerSrc: '../frontend/src/assets/photos/WorldFood/WorldFood1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/WorldFood/WorldFood2.png',
            '../frontend/src/assets/photos/WorldFood/WorldFood3.png'
        ],
        description: `Community food security and supplementary nutrition monitoring in partnership with the World Food Programme (WFP).\n\nKey initiatives:\n- Strengthening public distribution system awareness and Anganwadi center services.\n- Nutrition education for mothers and children to combat stunting and acute malnutrition.\n- Community-level grain storage and vulnerable household food entitlements tracking.`
    },
    {
        title: 'Climate Change Initiative',
        category: 'completed',
        theme: 'environment-climate',
        link: '/completed-projects/climate-change',
        stats: [{ value: 'Action', label: 'Climate resilience.' }],
        headerSrc: '../frontend/src/assets/photos/climatechange/enhanced_climate_1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/climatechange/enhanced_climate_2.png',
            '../frontend/src/assets/photos/climatechange/enhanced_climate_3.png'
        ],
        description: `Climate change adaptation and environmental resilience initiative empowering rural communities.\n\nKey initiatives:\n- Promoting climate-resilient cropping patterns, organic farming, and water conservation.\n- Solar energy and eco-friendly technology demonstration in rural households.\n- Awareness workshops on biodiversity preservation, afforestation, and carbon reduction.`
    },
    {
        title: 'Environment and Wetland Conservation',
        category: 'completed',
        theme: 'environment-climate',
        link: '/completed-projects/environment-wetland',
        stats: [{ value: 'Conservation', label: 'Protecting local wetlands.' }],
        headerSrc: null,
        gallerySrcs: [],
        description: `Awareness generation through seminars, workshops, plantation drives, and community training under NEAC (Ministry of Environment & Forests / EPCO Bhopal) and Bhojwetland Project (funded by JBIC).\n\nKey activities:\n- Conservation of Upper and Lower Lakes of Bhopal with rural and urban catchment awareness.\n- School rallies, quizzes, painting competitions, and teacher training.\n- Cultivation and preservation of medicinal plants and clean water resource management.`
    },
    {
        title: 'Child Help Line 1098',
        category: 'completed',
        theme: 'community-empowerment',
        link: '/completed-projects/child-help-line',
        stats: [
            { value: '24/7', label: 'Emergency phone service.' },
            { value: '10,000+', label: 'Calls answered.' }
        ],
        headerSrc: '../frontend/src/assets/photos/childline/childline4.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/childline/childline1.png',
            '../frontend/src/assets/photos/childline/childline2.png',
            '../frontend/src/assets/photos/childline/childline3.png'
        ],
        description: `24/7 emergency toll-free child protection and outreach helpline (1098) operating for children in difficult circumstances.\n\nKey interventions:\n- Emergency rescue, medical assistance, legal aid, and temporary shelter for children in distress.\n- Prevention of child labor, child marriage, trafficking, and abuse.\n- Reintegration of runaways and orphaned children with families and specialized care homes.`
    },
    {
        title: 'Formation and Strengthening Self Help Group',
        category: 'completed',
        theme: 'community-empowerment',
        link: '/completed-projects/self-help-group',
        stats: [{ value: 'Empowerment', label: 'Women and community groups.' }],
        headerSrc: '../frontend/src/assets/photos/selfhelpgroup/SelfHelpGroup1.png',
        gallerySrcs: [
            '../frontend/src/assets/photos/selfhelpgroup/SelfHelpGroup2.png',
            '../frontend/src/assets/photos/selfhelpgroup/SelfHelpGroup3.png'
        ],
        description: `Social mobilization, financial inclusion, and economic empowerment of rural women through Self Help Groups (SHGs).\n\nKey interventions:\n- Formation of women SHGs, establishing regular thrift savings, and internal loaning discipline.\n- Bank account opening, credit linkage, and livelihood enterprise training.\n- Capacity building of group leaders and federating SHGs into village organizations.`
    },
    {
        title: 'PODF (Producer Organization Development Fund)',
        category: 'current',
        theme: 'agriculture-livelihood',
        link: '/current-projects/podf',
        stats: [
            { value: '12', label: 'Active Projects supported by NABARD MP RO.' },
            { value: 'Ongoing', label: 'Empowering local farmers through cooperative models.' }
        ],
        headerSrc: null,
        gallerySrcs: [],
        description: `Active Farmer Producer Organization (FPO) development under Producer Organization Development Fund (PODF) supported by NABARD MP Regional Office.\n\nKey ongoing activities:\n- Mobilizing small and marginal farmers into registered Producer Companies.\n- Setting up input supply shops, aggregation centers, and business plans.\n- Providing market linkages, value addition training, and working capital access.`
    },
    {
        title: 'CSS (Central Sector Scheme)',
        category: 'current',
        theme: 'agriculture-livelihood',
        link: '/current-projects/css',
        stats: [
            { value: '15', label: 'Projects under Formation and Promotion of 10,000 FPOs.' },
            { value: 'Active', label: 'NABARD MP RO supported projects across various districts.' }
        ],
        headerSrc: null,
        gallerySrcs: [],
        description: `Active implementation of the Central Sector Scheme for Formation and Promotion of 10,000 FPOs across Madhya Pradesh.\n\nKey ongoing activities:\n- Cluster identification, baseline diagnostic studies, and farmer mobilization.\n- Board of Directors (BOD) training, governance establishment, and legal compliance.\n- Product branding, quality sorting, and forward market tie-ups with agribusinesses.`
    }
];

const runMigration = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');

        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)){
            fs.mkdirSync(uploadsDir);
        }

        for (const proj of allProjects) {
            let headerImage = '';
            if (proj.headerSrc) {
                const source = path.join(__dirname, proj.headerSrc);
                if (fs.existsSync(source)) {
                    const fileName = path.basename(source);
                    const targetName = `project-${fileName}`;
                    const target = path.join(uploadsDir, targetName);
                    fs.copyFileSync(source, target);
                    headerImage = `/uploads/${targetName}`;
                    console.log(`Copied Header: ${fileName}`);
                }
            }

            const images = [];
            if (proj.gallerySrcs && proj.gallerySrcs.length > 0) {
                for (const gSrc of proj.gallerySrcs) {
                    const source = path.join(__dirname, gSrc);
                    if (fs.existsSync(source)) {
                        const fileName = path.basename(source);
                        const targetName = `gallery-${fileName}`;
                        const target = path.join(uploadsDir, targetName);
                        fs.copyFileSync(source, target);
                        images.push(`/uploads/${targetName}`);
                        console.log(`Copied Gallery Image: ${fileName}`);
                    }
                }
            }

            // Update or Create
            const existing = await Project.findOne({ title: proj.title });
            if (existing) {
                existing.description = proj.description;
                existing.category = proj.category;
                existing.theme = proj.theme;
                existing.link = proj.link;
                existing.stats = proj.stats;
                if (headerImage) existing.headerImage = headerImage;
                if (images.length > 0) existing.images = images;
                await existing.save();
                console.log(`Updated project: ${proj.title}`);
            } else {
                await Project.create({
                    title: proj.title,
                    description: proj.description,
                    category: proj.category,
                    theme: proj.theme,
                    link: proj.link,
                    stats: proj.stats,
                    headerImage,
                    images
                });
                console.log(`Created new project: ${proj.title}`);
            }
        }

        console.log('All projects re-seeded with full content and gallery images!');
        process.exit();
    } catch (err) {
        console.error('Error during migration:', err);
        process.exit(1);
    }
};

runMigration();
