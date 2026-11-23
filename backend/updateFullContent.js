const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const Project = require('./models/Project');

const fullProjectsData = [
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
        description: `The development & strengthen of poor women’s belonging from rural society. Total 100 numbers of SHG’s under the programme formed and all SHG linked with bank by opening of SHG Bank account in nasrullaganj block of Sehore District M.P. The development of SHG’s & members are initial stage the process of SHG development ongoing viz. Group meeting, Group saving, development of group norms/rules & regulation & training of records maintenance like group meeting minutes records, group savings & lending records. As per project norms for proper execution of the project, Project Implementation Monitoring committee (PIMC) formed by the organization the committee have members from NABARD, Lead bank Manager from bank of India, service area Branch manager of Bank of India, State Bank of India, Narmada Malwa Bank, Punjab National Bank, & representative of SVSS. PIMC meeting held in at every month or as per need of project at least 1 in a quarter.

Empowering Women in the Rural Economy:
Women play important roles in the rural economy as farmers, wage earners and entrepreneurs. They also take responsibility for the well-being of the members of their families, including food provision and care for children and the elderly. Rural women’s unpaid work, particularly in poor households, often includes collecting wood and water. Women from indigenous and grassroots communities are often also custodians of traditional knowledge, which is key for their communities’ livelihoods, resilience and culture. Yet, women in rural areas face constraints in engaging in economic activities because of gender-based discrimination and social norms, disproportionate involvement in unpaid work, and unequal access to education, healthcare, property, and financial and other services. They are also disproportionately vulnerable to the impacts of environmental disasters and climate change.

Promoting and ensuring gender equality, and empowering rural women through decent work and productive employment, not only contributes to inclusive and sustainable economic growth, but also enhances the effectiveness of poverty reduction and food security initiatives, as well as climate change mitigation and adaptation efforts. The International Labour Organization (ILO)’s Decent Work Agenda offers an integrated framework for rural women’s empowerment, underpinned by international labour standards, social dialogue and the recognition that rural women play a key role in climate action Empowerment is typically conceptualized in three domains: economic, political, and social.

Economic empowerment refers to the market domain, in which a person is an economic actor. Political empowerment refers to the state domain, in which a person is a civic actor. Social empowerment refers to the society domain, in which a person is a social actor (Alsop, Bertelsen, and Holland 2006; World Bank 2007). The manifestations and measurement of what empowerment is about, however, depend on the context and on the characteristics of each group in the society. Changes in empowerment for one person or group cannot be assumed to apply to other individuals or groups (Alsop, Bertelsen, and Holland 2006). Furthermore, little is known about whether changes in one realm of empowerment (such as economic) could have negative repercussions in another realm of empowerment (such as social). Women’s empowerment means creating the conditions for women to be able to make choices, which implies that women may have different preferences than men, but also different abilities to make choices because of gender inequalities in bargaining power.`
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
        description: `About the Initiative - A 24-Hour Lifeline for Vulnerable Children:
Initiated in 1998, CHILDLINE (1098) is India's premier 24-hour, toll-free emergency phone service for children in distress, proudly supported by the Ministry of Women & Child Development, Government of India.
More than just an emergency response, CHILDLINE acts as a critical link, connecting vulnerable children with essential long-term care and rehabilitation services. As a single-point contact, we facilitate immediate access to support, professional guidance, and active intervention.

Outcome & Impact - Grassroots Outreach in Sehore:
This year, Childline Sehore successfully reached 660 beneficiaries through targeted child rights protection schemes. To amplify our impact, we organized comprehensive awareness campaigns and orientation programs engaging diverse stakeholders—including schools, Anganwadis, community organizations, local transport operators, law enforcement, healthcare staff, and the general public.
Our grassroots initiatives featured extensive outreach drives and Open House sessions to educate the community on child rights, prevalent issues, and the vital 1098 helpline. With immense support from local authorities, our dedicated team visited 95 villages across 8 Tehsils in Sehore district, successfully establishing a robust, localized network of volunteers and support institutions.

National Scale - Expansion & Emergency Relief:
- National Growth: The past year has marked significant growth for the CHILDLINE network. Expanding from our presence in 569 districts in early 2020, our services are now actively operational in over 81% of the country. Today, the network spans 598 districts through 1,070 dedicated intervention units, and active Child Help Desks at 141 railway stations and 5 bus terminals.
- COVID-19 Response: Throughout the pandemic, CHILDLINE was at the forefront of the response. Working hand-in-hand with district administrations and civil society, we actively disseminated crucial health information, distributed hygiene kits, food, and medical supplies, and facilitated emergency relief for affected families. We continue to provide robust resources, prevention measures, and vital mental health support for children navigating crises.

Looking Ahead - System Integration & Specialized Care:
Recent government directives aim to integrate the Child Helpline (1098) with the Emergency Response Support System (ERSS - 112). While this shift seeks to streamline emergency responses, leading child rights advocates emphasize that CHILDLINE is much more than a standard emergency dispatch.
As experts point out, children require specialized support, immediate counseling, and sensitive intervention that goes beyond traditional police response. SVSS Bhopal remains steadfast in our commitment to ensuring that every child receives the professional, empathetic care they critically need, regardless of systemic transitions.`
    },
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
        description: `Project Overview - Enhancing Agriculture Productivity:
District Covered: Shahdol, Singroli, Anooppur, Dindori and Vidisha (covering 12 blocks in Madhya Pradesh)
Supported by: Farmer Welfare and Agriculture Development Dept. Govt. of Madhya Pradesh

While the land and water resources development programme creates a basis for productive agriculture, the agriculture productivity enhancement programme under the ATMA project aims to optimize agriculture productivity. Interventions are designed with the participation of farmers in technology development and dissemination, adopting the principle of participatory technology development (PTD).

During 2012-13, SVSS covered 852 families under this programme. With added zeal from these experiences, SVSS took the initiative in gearing up and energizing the demonstration programme. To create awareness about the programmes, a series of meetings were organized in every village of the operational GPs before implementation.

Demonstrations - Agriculture & Allied Crops:
- Demonstration (Agriculture): Under this programme, agriculture seed support (namely soybean) was provided to 60 farmers across 12 villages, along with organic manure, multi-micro nutrients, and Integrated Pest Management (IPM). For encouraging organic farming, we motivated 52 farmers to opt for Vermi compost units. Farmers use vermi compost for organic farming, and landless farmers sell the worms for good returns.
- Demonstration (Allied) - Vegetables: We have been focusing on vegetable cultivation for small and marginal farmers. We demonstrated 20 demos on various vegetables. While many opt for traditional methods, 78 new farmers adopted the trellis (Mandwa) system for creeper vegetables, achieving high production using cheaper local materials like Bamboo and Teak. Farmers have also successfully cultivated turmeric, ginger, onion, and garlic.
- Horticulture and Agro Forestry: We successfully demonstrated 4 plots of horticulture (flower crops) and agro-forestry. SVSS supports farmers to plant on fallow land, utilizing short-duration crops like papaya as intercropping. Cumulatively, 18 horticulture plots were developed, and about 10 farmers opted for flower crops like roses.

Farmer Education - Farmer Field School (FFS) & Exposure Visits:
The purpose of the Farmers Field School (FFS) is the extension of technologies through a participatory and trickle-down approach, grooming local leaders for future extension.
FFS is a virtual in-situ school where farmers receive hands-on training on various productivity enhancement technologies, with a primary focus on learning by doing. During the period, 12 farm schools were established in various villages, blocks, and districts. Typically, one FFS covers 50-80 farmers from one village and caters to their training needs on Good Agriculture Practices (GAP).
Farmers are taught progressive farming practices through participatory learning. Front Line Demonstration (FLD) plots exhibit specific techniques in isolation, encouraging farmers to experiment on their own fields. Inter and intra-village exposure visits are organized to other farmer's field school initiatives, agriculture universities, and KVKs, exposing farmers to various technologies to test and validate them under their own management conditions.

Institution Building - Capacity Building Programme:
The community institutions groomed for the agriculture productivity enhancement programme at the village level include SHGs, activity-based Livelihood Groups, Kishan clubs for general agriculture technology promotion, and vegetable growers groups.
The concept of lead farmers (Achiever farmers) is practiced to engage them as agents for disseminating preferred technologies developed through the FFS method. We conducted a total of 36 training programs during the reporting period, investing significant time and resources into building capacity for technology development and dissemination. Technical inputs were provided by the Department of Agriculture, and progress is reviewed jointly by the ATMA team and SVSS.`
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
        description: `Project Overview - Empowering Farming Communities:
District: Sehore, Bhopal
Supported by: National Bank for Agriculture & Rural Development (NABARD)

Agriculture has been the backbone of the country’s economy, as about 60-70% of the population still depends on farming activities for their livelihood security. The challenge before us is how to increase production/productivity and the income of farming communities through the adoption of new, appropriate technologies and the establishment of market linkages.

The SVSS team has facilitated 305 farmer clubs with a total membership of 4,575 farmers in the Sehore district and 99 Farmer clubs with a total membership of 1,485 farmers in the Bhopal district, with the active support of Regional Rural Banks and Cooperative banks.

Our Approach - Technology Transfer & Credit Counseling:
The key role of SVSS is the dissemination of locally appropriate technology, development of skills for the enhancement of production and productivity, and providing credit counseling and assistance with loan recovery.
Adoption of appropriate technologies by farmer clubs improves productivity, which generates additional credit demand from formal banking institutions over time and improves farmers’ income margins. In light of agricultural distress faced by farmers, SVSS provides facilitation support for transferring technology that enhances production in agriculture and related activities.
The objective of the programme is: "Development through credit, technology transfer, awareness and capacity building." The emphasis is on increasing the income of farmers by boosting production & productivity, adopting good agricultural practices, and developing marketing skills.

Project Activities:
Routine Activities:
- Formation of farmers club
- Maintenance and Preparation of plans
- Awareness & Orientation meets
- Identification of needs
- Organizing Rabi & Kharif Season expert meets
- Development of conversion linkages with line departments / institutions

Non-Routine Activities:
- PRA training exercise
- Skill training / AEDP / Leadership training
- Transfer & adoption of technologies – existing or new
- Exposure visits to demonstration sites
- Marketing related activities & Innovative activities

Structure & Future Outlook - Digitization & Membership Structure:
NABARD successfully implemented a pilot project on the “Digitization of Farmer’s Club data” in selected districts across seven states. The pilot is now being upscaled to an all-India level. Digitization helps maintain the sustainability of farmers’ clubs while giving them access to relevant IT services.
Each Farmer’s club can have a minimum of 10 members, with no upper limit. Each club has two democratically elected officers (Chief Coordinator and Associate Coordinator) who serve two-year terms. These officers, who must be residents of the club's area, are responsible for organizing meetings with experts, maintaining account books, and communicating effectively with the bank.`
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
        description: `Project Overview - Economic and Environment Security for Women:
Area: 6 Villages of Fanda Block of Bhopal District, MP
Target Group: 200 Women Farmers
Sponsor Agency: United Spirits Limited (USL - CSR Initiatives)

The projects would intervene with 200 farmers in the district of Bhopal and seek to achieve enhanced family incomes by Rs. 6,000-10,000 for 60% of participant women (including the money value of enhanced food sufficiency).
This is achieved through:
- Crop intensification of wheat and gram and diversification into commercial vegetable farming.
- Multi-cropping including long-tenure plantations of fruit trees and timber plants in 300 ha as Agro-horticulture and Agro-forestry.

Programme Activity - Capacity & Cadre Development:
- Building Institutional Capacity: Formation and development of village-level and cluster-level Women Farmers federations; federating the cluster-level federations with a block-level apex body/federation. According to the geographic situation, 6 village-level organizations and 2 cluster-level federations will be formed. We also develop and establish systems and procedures related to administration, accounts, HR, development of business plans, and statutory compliance.
- Cadre Development: In the form of Community Resource Persons (CRPs), progressive women farmers are identified by intensive community exercises. These CRPs will be capacitated through intensive trainings and exposure visits to strengthen their agriculture practices and enhance their capabilities as community trainers. It is targeted to develop 12 CRPs to scale up the impact of the project.

Sustainable Practices - Promotion of Sustainable Agriculture:
6 Farm Schools will be established and equipped with training and education material and Soil testing facilities, demonstrating drudgery reduction, vermicompost, FYM, and bio-pesticides.
- Education & Knowledge: The women farmers will get knowledge and exposure at the village level. Training focuses on Land and Water Management, Integrated Nutrient Management, Integrated Pest Management, and general agricultural problem-solving.
- Technology & Support: SMS-based extension services provide women farmers with access to information on weather, cropping practices, and market rates. Farmers' Diaries provide continuous technical guidance.
- Field Interventions: Activities include a Seed Security program (local seed preservation), promotion of Vermicompost and FYM (balancing organic and inorganic inputs), trial and demonstration of good practices, use of bio-fertilizer, crop spacing, and kitchen vegetable gardens.

Project Outcomes - Economic, Social & Environmental Impact:
- Economic: Increased agriculture productivity by 50% for each family. Food security will be ensured for 100% of the targeted families, along with an increase in their nutrition level. Market linkage for backward and forward integration will be ensured. Management of integrated pest, fertilizer, and water will result in 30-40% savings/gain at each farmer’s level. Sub-sector development (seed production, organic fertilizer, primary processing, animal husbandry) will energize the local economy.
- Social Impact: Capacitated women farmers groups and women-led apex organizations will carry collective bargaining power, increasing the recognition and dignity of women farmers. Improved knowledge and adoption of modern technologies will decrease drudgeries and hardship, leading women to focus more on children's education and developmental activities. This results in reduced migration, enhanced food security, and strengthens women's strategic role in agriculture.
- Environmental: The introduction of improved agronomy technologies and their adoption will positively enhance the soil and environment. Reduced use of water, recommended doses of fertilizers and chemicals, and the use of biological fertilizers and biological control measures for pests and diseases will have a significantly positive impact on the overall ecosystem.`
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
        description: `Capacity Building - Empowering Through Training:
We have provided a variety of training at the District, Block, and village levels for the benefit of the people. Our diverse training programs include:
- Medicinal Plant Cultivation
- Environmental education for School Teachers
- Capacity building for Panchayat members
- Vision Building and Leadership qualities for SHG members

Our training on Income Generation Activities included Packaging, Grading, Envelope manufacturing, jute thread making, silk rearing, Pickles preparation, Vermi Compost, Food Processing, etc.

Specialized Skills - Medicinal Farming Training:
The Youth Farmers Training program for 5 States on Medicinal Plants cultivation was held in Jaipur. A two-day training program was organized twice every month, with the Hahnemann Charitable Mission Society organizing hands-on training at Sunrise Organic Park, Pinjrapole.
In this program, young farmers from Gujarat, Kerala, Uttar Pradesh, Maharashtra, Haryana, and Uttarakhand took intensive training on cultivating medicinal crops such as Satavaria, Moringa, Safed Musli, Ashwagandha, and Stevia.
On the first day, detailed information about the utility of medicinal crops and advanced organic farming was given, including processes of grading, storage, state-level schemes, and bank subsidies. On the second day, farmers were given a live field demonstration of biological compost and manure.

Industry Insights - The Vital Role of Medicinal Plants:
Medicinal plants play a vital role in the pharmaceutical field. They are widely used in Ayurveda and are closely associated with human health.
They exist in natural forests, but their over-extraction has created a threat to their existence in nature, making farm field cultivation the only viable option for today's economic value addition for farmers. Keeping this in view, the Forest Research Institute (FRI), Dehradun conducted a 5-day training on “Cultivation and utilization of medicinal plants” for farmers of Uttarakhand.
During the inauguration by Dr. N. S. Bisht (IFS, Dy. Director General, ICFRE), he emphasized the wide scope of medicinal plant-based farming due to rich basic resources. He advised that knowledge of climatic and site suitability is crucial, and the quality of seedlings always counts because a good quality seedling produces a good quantity of product.
He also suggested forming Self Help Groups (SHGs) and Cooperatives at village and block levels to share knowledge and facilitate better marketing of produce. Emphasizing market demand, he noted that scientific harvesting, storage, and processing technology can significantly enhance productivity.`
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
        description: `Project Overview - Safe Drinking Water for Communities:
Project: Setting of RO Water Facility for Women SHGs (500LPM)
Project Areas: Amala Gram Panchayat, Block Fanda, Bhopal, MP
Beneficiaries: 250
Sponsoring Agency: United Spirits Ltd (USL) - DIAGEO

DIAGEO implements innovative strategies for improving the quality of life of under-served communities. Since May 2017, DIAGEO & SVSS began their journey with a single mission: providing rural communities with access to safe, potable drinking water.
Community Water Services installs and operates centers that reliably address water contamination. Currently, the Community RO water system provides safe water to over 35 villages in Madhya Pradesh. A dedicated team of 7 people makes the community RO Water system the most experienced women community water centre operator in Amala.

Partnership Strategy - Tripartite Business Model:
Community Water Services’ model is based on a tripartite partnership between a local community, a CSR donor (DIAGEO), and the implementing entity.

- The Community (Gram Panchayat) Provides:
  * A suitable location and reliable water source.
  * Power connection for plant capacity.
  * Support to SVSS for awareness, fee collection, and managing the plant.

- The Donor (DIAGEO) Provides:
  * Funding for fixed costs (building, machinery, installation, survey, mobilization).
  * Funding for any deficit in operation and maintenance costs.

- SVSS (Project Manager) Responsibility:
  * Selection of location, installation, and efficient operation of the water center.
  * Quality control – ensuring output meets national standards at all times.
  * Collecting affordable user fees (Rs. 4 to 5 per 20L) ensuring self-sustainability.

Project Impact - Enhancing and Scaling Social Projects:
The Community RO Water System employs around seven people across the village. About 100 households now have direct access to safe drinking water.
This social enterprise champions the cause of safe drinking water by dispersing 80 million liters per year to 608 people, including schools and government crèche centers across 40 villages stricken with highly contaminated water sources.
DIAGEO plays a significant role in enhancing and scaling-up social projects run by social enterprises. Communities at the bottom of the pyramid do not have enough purchasing capacity to set up capital-intensive services. External funders like DIAGEO facilitate setting up these units, doing a great service to local communities as part of their CSR efforts.`
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
        description: `Adolescent Health - Empowering Youth & Health Workers:
The Ministry of Health & Family Welfare & National Health Mission (NHM) With Collaboration with State Rural health Mission, GOMP has launched a health programme for adolescents in the age group of 10-19 years.
This program targets their nutrition, reproductive health and substance abuse, among other issues. The SVSS has been given the responsibility to train the adolescent children as master trainers along with ANM, ASHA health workers of the cluster. We provide technical hand-holding support at the field level as supportive supervision by our master trainers to sathiya. Five days of field supervision is undertaken by a 2-trainer team (1 male & 1 female) to facilitate sathiya peers.
Counseling services are provided by organization counselors at Adolescent Friendly Health Clinics (AFHC). SVSS implements the RKSK Programme in 2 Districts - Singroli & Shahdol of M.P.
- Singroli District: 3,316 peer educators, 43,940 other adolescents, 940 ASHA Trained, and 76 ANM through supportive supervision & counseling.
- Shahdol District: 6,603 peer educators, adolescents counseling, 264 ASHA, 22 ASHA facilitators & 21 ANM.

Impact & Outcome - Programme Activity and Outcome:
A large number of the adolescent population experienced increased awareness of the adverse effects and consequences of substance misuse. The program aimed to improve knowledge, attitudes, and behaviour in relation to SRH (Sexual and Reproductive Health).
We focused on reducing teenage pregnancies, improving birth preparedness, complication readiness, and providing early parenting support for adolescent parents. Furthermore, we helped them reach Adolescent Friendly Health Clinics (AFHC) to avail essential services.
The Rashtriya Kishor Swasthya Karyakram (National Adolescent Health Programme) comprehensively addresses the health needs of the 243 million adolescents. It introduces community-based interventions through peer educators and is underpinned by collaborations with other ministries and state governments.

Innovation - RKSK Dashboard & Pandemic Adaptation:
The RKSK Dashboard was launched by AS & MD (NHM) during the 2nd National SHWP Workshop in New Delhi. This dashboard brings disaggregated and pre-analysed data on all aspects of adolescent health and well-being on one platform. This easily accessible and vetted platform is created with the aim to support States and UTs to make data-driven decisions for both health and education programs. It has been developed under the guidance of the Adolescent Health Division, Ministry of Health and Family Welfare and supported by the WHO-India office.
COVID-19 Pandemic Response: The pandemic brought forth an important learning point on how to adapt in unprecedented times: peer educators could not reach out to enough adolescents as they did prior. MAMTA, in partnership with WHO India, introduced a mobile application ‘RKSK-Samajh’ for peer educators in the intervention blocks to provide them with information on RKSK six themes and COVID-19 preventive measures. With state approval, the application was developed, launched and validated for its acceptability among the RKSK peer educators.`
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
        description: `Empowerment & Training - ASHA Volunteers:
One of the key components of the mission is creating a band of female health volunteers, appropriately named “Accredited Social Health Activist” (ASHA) in each village.
These ASHAs act as a ‘bridge’ between the rural people and health service outlets, playing a central role in achieving national health and population policy goals. They are selected by the community and work on a voluntary basis. The induction training for ASHA is completed in 23 days spread across five rounds over 12 months, orienting them to their roles, responsibilities, community rapport building, and a rights-based approach to health.
As a part of this training, ASHAs are also introduced to important aspects of reproductive, maternal, newborn, child, and adolescent health.

Current Realities - Challenges in Rural Infrastructure & Care:
Healthcare is the right of every individual, but the lack of quality infrastructure, dearth of qualified medical functionaries, and non-access to basic medicines thwarts its reach to 60% of India's population. A majority of 700 million people live in rural areas where the condition of medical facilities is often deplorable. In rural India, where the number of Primary Health Care Centers (PHCs) is limited, many lack doctors, lab technicians, or pharmacists.
Rural healthcare infrastructure is a three-tiered network comprising a sub-center, primary health center (PHC), and community health center (CHC). Unfortunately, this setup is frequently in shambles. There are massive shortfalls in Sub-centers (18%), PHCs (22%), and CHCs (30%). Moreover, even when drugs are available, the gap between demand and supply leads to poor immunization and higher child mortality rates.
Rural women experience poorer health outcomes and have less access to health care than urban women, especially regarding maternal health. India accounts for the largest number of maternity deaths, a majority of which are in rural areas. Even in the private sector, health care is often confined to basic antenatal care and does not extend to critical services where medical care can save lives during complications.

Systemic Barriers - Workforce Shortages & Systemic Gaps:
The supply of primary care providers per capita is lower in rural areas. Travel to reach a primary care provider may be costly and burdensome, leading patients to substitute local primary care providers for sub-specialists, or forego care altogether resulting in a high number of emergency room (ER) visits. It is a common complaint that government health functionaries suffer from non-availability of medical staff, with surveys noting up to 45% absenteeism of doctors from PHCs.
Ineffectiveness of primary health care creates a breach in the referral system. Low faith in public health services causes overcrowding by health care seekers who bypass the first level of contact. Out-of-pocket (OOP) health expenses drove 55 million Indians into poverty in 2011-12, with 69% impoverished by expenditure on medicines alone. Government reluctance is evident as roughly only 0.9% of the GDP is allocated for health care.
Health literacy can also be a barrier. It impacts a patient's ability to understand health information from providers, especially concerning in rural communities with lower educational levels. Low health literacy makes residents reluctant to seek healthcare due to fear or frustration, highlighting the need for capacity development and limiting illicit, unqualified practitioners.`
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
        description: `About the Initiative - Focusing on Vulnerable Communities:
SVSS has undertaken the Targeted Intervention (TI) project focusing upon Female Sex Workers (FSW) and Men having sex with Men (MSM) since October 2008. The project is implemented in district Sehore covering the development blocks of Sehore, Ashta, and Nasrullaganj.
The project is supported by National AIDS Control Organization (NACO) under NACP-III. Madhya Pradesh State AIDS Control Society is the state-level agency to administer the grant and provide regular support. The goal of the project is to contribute in prevention and reversal of the HIV epidemic amongst the FSW, MSM of the Sehore district. SVSS has succeeded in building rapport with the target population and their community, providing a platform to the targeted community to exchange and share their concerns.

Key Activities & Achievements - Comprehensive Healthcare and Counseling:
During the project interventions, SVSS has succeeded in sensitizing the targeted high risk group population over vulnerabilities and risks associated with HIV/AIDS by providing counseling services and quality STI treatments. The HRGs were provided behavior change services related to safer sex practices.
- Behavior change communication: 8,930 one-to-one contacts, 248 one-to-group contacts.
- Condom promotion: 320,400 free distributions, 12,380 from outlets, 769 social marketing.
- STI Management: 2,199 STI treatments, 867 RMC.
- Counseling: 778 counseling sessions, 137 group sessions.
- Enabling Environment: 10 advocacy meetings, 12 networking meetings.
- Community & Support: 9 community immediate needs addressed, 7 PLWHA support, 2 GIPA.
- Testing: 756 HIV testing referrals, 1,142 VDRL testing.

Historical Context - National AIDS Control Programme (NACP):
In 1992, the Government launched the first National AIDS Control Programme (NACP I) with an IDA Credit of USD 84 million and demonstrated its commitment to combat the disease.
NACP I was implemented with an objective of slowing down the spread of HIV infections so as to reduce morbidity, mortality and impact of AIDS in the country. National AIDS Control Board (NACB) was constituted and an autonomous National AIDS Control Organization (NACO) was set up to implement the project. The first phase focused on awareness generation, setting up surveillance system for monitoring HIV epidemic, measures to ensure access to safe blood and preventive services for high risk group populations.
In November 1999, the second National AIDS Control Project (NACP II) was launched. Key policy initiatives included the scale up of Targeted Interventions, launch of National Anti-Retroviral Treatment (ART) programme, and setting up of State AIDS Control Societies.
In July 2007, the third phase of the national programme (NACP III) was launched with the goal of Halting and Reversing the Epidemic, scaling up prevention efforts among High Risk Groups (HRG) and General Population and integrating them with Care, Support & Treatment (CST) services.`
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
        description: `Project Overview - Household Sanitation & Community Mobilization:
Project: Total Sanitation Campaign (TSC)
Project Areas: Bilaspur & Janjgir Districts (including Pendra Block), Chhattisgarh
Sponsoring & Funding Agency: Public Health & Engineering Department (PHED) & UNICEF

SVSS has been actively promoting household toilet construction and ensuring its regular, proper use across rural areas. We educate rural communities about various techniques for low-cost toilet construction and motivate families to build individual household latrines under the Total Sanitation Campaign (TSC).
Through comprehensive capacity building of local stakeholders, SVSS established and operated Rural Sanitary Marts (RSM) and Production Centers in Bilaspur and Janjgir districts of Chhattisgarh, with a focused operational base in Pendra block of Bilaspur district. These centers provide affordable, quality sanitary materials and hardware to local communities.
Our dedicated field teams also mobilized and prepared the communities for verification visits by evaluation teams for the prestigious Nirmal Block Prize, recognizing areas that have made outstanding strides toward eliminating open defecation.

National Initiative - Evolution of the Total Sanitation Campaign (TSC):
The Government of India launched the Central Rural Sanitation Programme (CRSP) in 1986 with the objective of accelerating sanitation coverage in rural areas. In 1999, the programme was restructured, exhibiting a paradigm shift from a supply-driven subsidy approach to a demand-driven, community-led campaign: the Total Sanitation Campaign (TSC), implemented by the Ministry of Rural Development, Government of India.
The core objectives of the campaign include:
- Quality of Life: Improve the general quality of life and health standards in rural areas.
- Accelerated Coverage: Accelerate sanitation coverage through universal access to toilets in rural households.
- Community & PRI Motivation: Motivate communities and Panchayati Raj Institutions through health education and sustained awareness creation.
- School & Anganwadi Sanitation: Cover primary schools and Anganwadi/Balwadi centres with safe sanitation facilities and promote hygiene habits among children.
- Cost-Effective Technologies: Encourage cost-effective, appropriate technologies for ecologically safe and sustainable sanitation.
- Environmental Sanitation: Develop community-managed environmental sanitation systems focusing on solid and liquid waste management.

Programme Components - Key Expenditure & Delivery Components:
- Start-Up Activities: Conducting baseline surveys, assessing local community needs, and preparing village sanitation plans.
- Information, Education and Communication (IEC): Organizing awareness drives, interpersonal communication, and behavior change campaigns.
- Rural Sanitary Marts & Production Centres: Setting up local manufacturing and distribution hubs for low-cost, quality sanitary hardware.
- Provision of Revolving Fund: Providing revolving funds at the district level to support self-help groups and community financing for sanitation.
- Individual Household Latrines (IHHL): Financial incentives and technical handholding for rural households to build and maintain toilets.
- Community Sanitary Complexes: Constructing clean, shared sanitary complexes in public and community locations.
- Institutional Toilets: Building dedicated toilets and handwashing facilities in rural schools and Anganwadi/Balwadi centres.
- Ecological Sanitation: Promoting eco-friendly sanitation solutions that conserve water and safely recycle nutrients.
- Solid and Liquid Waste Management: Establishing systems for soak pits, composting, and village-level waste disposal.
- Administrative Charges: Supporting project management, monitoring, and capacity building of field staff and stakeholders.

Panchayati Raj & Governance - Institutional Framework & Community Partnership:
Sanitation is included in the 11th Schedule of the Constitution of India and is entrusted as the responsibility of the Panchayats. Implementation follows a decentralized framework across three tiers:
- District Level (Zilla Panchayat): Implements the overall project, approves plans, and tracks district-wide progress.
- Block Level (Panchayat Samiti): Coordinates field activities, training, and verification across villages.
- Village Level (Gram Panchayat): Plays a pivotal role in direct implementation, community mobilization, and maintenance of clean surroundings.
Gram Panchayats work closely alongside Non-Governmental Organisations (NGOs) such as SVSS to mobilize people for toilet construction and ensure the safe disposal of waste.`
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
        description: `Sponsored Agency: Department of Forest Govt. of Madhya Pradesh

SVSS builds the capacity of the community members on a cluster basis to acquire entrepreneurship skills and to provide long-term handholding support to community groups to successfully run business enterprises. Similarly, the CBO leaders are imparted training and subsequently refresher training on handholding to Joint Forest Management Committees (JFMC).

The community members are also trained on major forest policies that have a bearing on the local community, the major MP JFMC resolutions and their implementations, and biodiversity and its importance. Training also covers the Tribal Forest Rights Act, social issues & conflict management, sustainable forest management, soil & water conservation, development needs identification, and micro-planning of JFMC committees.
Organization is working with 60 JFMC in Burhanpur district of Madhya Pradesh under World Food Programme & Department of Forest Madhya Pradesh.

Community Tenure - Formal Community Management of Forests:
A brief listing of various forms of formal community tenure and management of forests both past and present:
- 1900s: Forest Cooperatives in the Madras Presidency.
- 1927: Section 28 - Village Forest Provision of the Indian Forest Act.
- 1930s onwards: Van Panchayats in Uttarakhand.
- 1940s: Cooperative Forest Societies in Kangra (earlier Punjab, now Himachal Pradesh).
- 1980s: Woodlots on panchayat lands under Social Forestry (with Revenue sharing agreements).
- 1990 onwards: Forest Protection Committees (FPCs) under JFM.
- Recent: Community Forest Rights & Resource (CFRt & CFRe) under the FRA.

JFMC Membership - Who Can Become a Member?:
All adult members residing within the revenue boundaries of the area where a JFMC is being proposed are eligible and must be made members.
The area could be a village or group of villages, a hamlet, or a combination of whole villages and hamlets of other villages, depending on location and historical relations and forest use patterns. Membership criteria are as per the JFM resolution of the state. Membership for a JFMC is open for all members of the gram sabha – i.e., voting adults.
Members may consider putting a non-resident member option in their byelaws. This will allow members who live outside the village to also participate in the activities of the JFMC, without necessarily having to be on-site. Byelaws should consider the following with respect to non-resident members: Voting rights, Level of contributions, Share in forest produce (self collected), and Share in net income.

The Value of Forests - A Repository of Biodiversity:
Forests are the most valuable Natural Resource, which have been nurturing the need and greed of man since time immemorial. They are the source of timber, water, fuel, and fodder and are looked upon as the most critical link in photosynthesis and as a repository of biodiversity having an immense importance for global eco-systems.`
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
        description: `Energy Solutions - Utilizing Biomass & Reducing Drudgery:
Promotion for utilizing Biomass & social empowerment of tribal women to protect forest, forest land & resource, environment from degradation with livelihood potential with drudgery reduction.
As wood, agriculture residues, coal, cattle dung cake are the primary energy sources for cooking in rural areas. Traditional chullhas, commonly used in rural areas, however are efficient but environmentally undesirable. In this contrast improved multi fuel cooking stove / chullhas are scientifically designed for potential regulation of heat flow & better fuel utilization, improved chullhas have heat transfer efficiency of 20-25% as compared to 8-10% in case of traditional chullhas.
In this context in view to conserve forest, SVSS taken initiative & promote alternative such as briquette can be used for every day heating/cooking works, briquettes are made from dried leaf, dung, saw dust, agriculture waste like wheat, paddy, straw seed cases bamboo dust, cotton, mustard, sunflower stalks & all other agro forest produces residues.
The use of bio mass briquettes is environment friendly and does not produce sulfur on burning has higher thermal capacity than normal coal and more heat on burning, is smokeless the food prepared by using briquette is reduce drudgery to the women in the kitchen upto 4 or 5 point scale. This technology is friendly, hygienic & Briquettes are easy to handle & transportable.

Key Objectives - Conservation & Community Impact:
By use of briquettes & improved chulhas with social diversifications following objectives can be achieved:
- Conservation of fuel wood & other biomass.
- Control of deforestation & environmental degradation.
- Provide employment opportunities to rural people & enhance participatory approach.
- Reduction in drudgery of women & girl children for cooking in smoky kitchen.
- Briquettes are cheaper than coal has no sulfur so very less pollution on burning.
- The project is supported by M.P. Council of Science & Technology Govt. of M.P.

Broader Issues - Forest Resources & Land Use:
The second major grouping of forest sector issues surrounds the question of conservation of forest resources and the related issues of land use. As with all nations, the countries of the Asia Pacific Region face questions regarding the priority of land use in the face of dense populations, generally low levels of economic development and social wellbeing. Land is being converted to alternative, non-forestry uses as indicated by the statistics on deforestation. Cut-over lands are left idle and forests are degraded as local residents seek improvements in daily living if only temporarily achieved by land clearing, gathering of fuelwood, or premature harvesting for a subsistence income or personal local utilization.
Forest land has traditionally been defined based on a combination of current use and biological potential or capacity. Less frequently economic criteria setting priorities for land allocation have been utilized.`
    },
    {
        title: 'Environment and Wetland Conservation',
        category: 'completed',
        theme: 'environment-climate',
        link: '/completed-projects/environment-wetland',
        stats: [{ value: 'Conservation', label: 'Protecting local wetlands.' }],
        headerSrc: null,
        gallerySrcs: [],
        description: `Project Overview - Environmental Awareness & Action:
Programme: National Environment Awareness Campaign (NEAC)
Financial Assistance: Ministry of Environment & Forest, Govt. of India (via nodal agency EPCO, Bhopal)

We are actively involved in generating awareness through seminars, workshops, plantation programmes, and training sessions designed to foster community participation. Our initiatives focus on critical issues such as the intersection of women and the environment, cultivation of medicinal plants, techniques for maintaining clean water resources, and combatting environmental pollution.
Our approach ensures that local communities are not just passive recipients of information, but active participants in safeguarding their natural surroundings.

Wetland Conservation - Bhojwetland Project: Preserving Bhopal's Lakes:
Funding: Japan Bank for International Cooperation (JBIC)
We actively participated in wetland conservation efforts under the Bhojwetland Project, focusing on the conservation of the Upper and Lower lakes of Bhopal. A key component of our involvement was comprehensive awareness generation across both rural and urban catchment areas surrounding these vital water bodies.
To engage different target groups effectively, we organized a variety of interactive events:
- Seminars and community rallies.
- Educational quiz programmes for youth.
- Painting competitions for school children.
- Targeted outreach for rural communities and school teachers.

Medicinal Plants - Traditional Knowledge & Conservation:
Medicinal plants, or medicinal herbs, have been discovered and used in healing practices since prehistoric times. Plants synthesize hundreds of chemical compounds for defense and protection against insects, fungi, diseases, and herbivorous mammals.
Historical records of herbs date back to the Sumerian civilization (c. 3000 BC), the Ebers Papyrus from ancient Egypt (c. 1550 BC), and the works of Greek physician Dioscorides (c. 60 AD). Today, drug research continues to utilize ethnobotany to search for pharmacologically active substances, yielding hundreds of useful compounds like aspirin, digoxin, quinine, and opium.
While medicinal plants are widely used as folk medicine in non-industrialized societies due to their availability and affordability, they face significant modern challenges. The World Health Organization coordinates networks to encourage their safe and rational use amidst a poorly regulated botanical herbal market. Furthermore, these plants face severe environmental threats from climate change, habitat destruction, and over-collection driven by market demand.

Women & Environment - Gender Equality in Sustainable Development:
Around the world, women play distinct and crucial roles in managing natural resources. They are deeply involved in managing plants and animals in forests, drylands, wetlands, and agriculture. They hold primary responsibility for collecting water, fuel, and fodder for domestic use and income generation, effectively overseeing local land and water resources.
In doing so, women contribute immense time, energy, skills, and personal vision to family and community development. Their extensive, hands-on experience makes them an invaluable source of knowledge and expertise on environmental management and appropriate conservation actions.
Despite these contributions, a wide gender gap remains. Research highlights that gender equality is essential for economies and that sustainable development is impossible without equity. Gender equality and equity are not only fundamental human rights and matters of social justice, but they are also absolute prerequisites for successful environmental conservation, sustainable development, and human security.`
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
        description: `Producer Organization Development Fund (PODF) - Details of the ongoing FPOs supported by NABARD MP RO:

Active Farmer Producer Organizations (FPOs) promoted and supported by NABARD Madhya Pradesh Regional Office across Bhopal and Sehore districts:
1. Devnarayan Farmer Producer Company L.T.D (Date: 10.10.2018 | State: Madhya Pradesh | District: Bhopal | Block: Fanda)
2. Reva Farmer Producer Company L.T.D (Date: 13.12.2011 | State: Madhya Pradesh | District: Sehore | Block: Jamoniya Talab)
3. Gopala Dudgh Upatadak Farmer Producer Company L.T.D (Date: 02.11.2015 | State: Madhya Pradesh | District: Sehore | Block: Sehore)
4. Heera Seeds Producer Company L.T.D (Date: 02.11.2015 | State: Madhya Pradesh | District: Sehore | Block: Icchawar)
5. Erda Farmer Producer Company L.T.D (Date: 24.01.2020 | State: Madhya Pradesh | District: Sehore | Block: Sehore)
6. Parvati Milk Producer Company L.T.D (Date: 21.10.2015 | State: Madhya Pradesh | District: Bhopal | Block: Fanda)
7. Sidrapur Agro Producer Company L.T.D (Date: 21.04.2019 | State: Madhya Pradesh | District: Sehore | Block: Sehore)
8. Varidhi Kisan Producer Company L.T.D (Date: 15.01.2020 | State: Madhya Pradesh | District: Sehore | Block: Sehore)
9. Bhojpal Farmer Producer Company L.T.D (Date: 23.04.2018 | State: Madhya Pradesh | District: Bhopal | Block: Bairasiya)
10. Evraj Seeds Producer Company L.T.D (Date: 18.04.2019 | State: Madhya Pradesh | District: Bhopal | Block: Bairasiya)
11. Kharpi Farmers Producer Company L.T.D (Date: 06.03.2019 | State: Madhya Pradesh | District: Bhopal | Block: Bhopal)
12. Urjit Farmer Producer Company L.T.D (Date: 30.01.2019 | State: Madhya Pradesh | District: Bhopal | Block: Phanda)

Key Project Interventions:
- Organizing small and marginal farmers into registered legal Producer Companies.
- Providing business development, accounting, and leadership training to Board of Directors.
- Facilitating direct market access, bulk input purchases, and credit linkages.`
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
        description: `Formation and Promotion of 10,000 Farmer Producer Organizations (FPOs) under Central Sector Scheme (CSS):
Details of the ongoing FPOs supported by various implementation agencies including NABARD MP RO and NAFED CG across Madhya Pradesh and Chhattisgarh:

1. Ajyodhya Far. Producer company Limited (Date: 18-11-2021 | Organization: NABARD MP RO | District: Shajapur | Block: Shajapur, MP)
2. Kalapipal Far.Pro.Com. LTD (Date: 18-08-2021 | Organization: NABARD MP RO | District: Shajapur | Block: Kalapipal, MP)
3. Kanchanvarni Far. Pro.Com.LTD. (Date: 05-08-2021 | Organization: NABARD MP RO | District: Shajapur | Block: Shujalpur, MP)
4. Vat Savitri Jaivik Far.pro. Com. LTD. (Date: 21-07-2021 | Organization: NABARD MP RO | District: Bhopal | Block: Phanda, MP)
5. Semrighat Far.Pro.Com. LTD. (Date: 09-05-2022 | Organization: NABARD MP RO | District: Raisen | Block: Badi, MP)
6. Kisanoday Far. Pro. Com. LTD. (Date: 26-04-2022 | Organization: NABARD MP RO | District: Raisen | Block: Sanchi, MP)
7. Jai Balram Food and Crop Silwani Far. Pro. Com (Date: 31-03-2022 | Organization: NABARD MP RO | District: Raisen | Block: Silwani, MP)
8. Chandrakeshar Food and Agritech Pro.Com LTD. (Date: 31-03-2022 | Organization: NABARD MP RO | District: Dewas | Block: Kannod, MP)
9. Narmadeshwar Far.Pro. Com. LTD. (Date: 14-04-2022 | Organization: NABARD MP RO | District: Dewas | Block: Khategaon, MP)
10. Sivan Jaivik Far.Pro.Com. LTD. (Date: 05-08-2021 | Organization: NABARD MP RO | District: Sehore | Block: Sehore, MP)
11. Mo. Badodiya Far. Pro.Com. LTD. (Date: 28-07-2022 | Organization: NABARD MP RO | District: Shajapur | Block: Mohan Badodiya, MP)
12. Rehti Crop Producer Company LTD (Date: 16-11-2022 | Organization: NABARD MP RO | District: Sehore | Block: Rehti, MP)
13. Bherundakanth Farmer Producer Co. LTD. (Date: 06-12-2022 | Organization: NABARD MP RO | District: Sehore | Block: Nasrullaganj, MP)
14. Bijadandi Farmer Producer Company Limited (Date: 12-08-2021 | Organization: NABARD MP RO | District: Mandla | Block: Bijadandi, MP)
15. Mawai Farmer Producer Company Limited (Date: 18-08-2021 | Organization: NABARD MP RO | District: Mandla | Block: Mawai, MP)
16. Farmotech Fed Far.Pro.Com. LTD (Date: 24-01-2022 | Organization: NAFED CG | District: Bilaspur | Block: Masturi, CG)
17. Kota mahamaya Fed.Far.Pro.Com. LTD (Date: 25-03-2022 | Organization: NAFED CG | District: Bilaspur | Block: kota, CG)
18. Bilha Upajau Fed. Far.pro. Com.LTD (Date: 08-03-2022 | Organization: NAFED CG | District: Bilaspur | Block: Bilha, CG)
19. Aagranchal Fed.Far.Pro.Com. LTD (Date: 06-06-2022 | Organization: NAFED CG | District: Mungeli | Block: Mungeli, CG)
20. Ultapani Valley Fed.Far. Pro. Com.LTD (Date: 17-06-2022 | Organization: NAFED CG | District: Sarguja | Block: Mainpat, CG)
21. Surguja karmayogi Agrofed Farmer Producer company LTD. (Date: 19-08-2021 | Organization: NAFED CG | District: Sarguja | Block: Lundra, CG)
22. Khudiya fed farmer producer company LTD. (Date: 18-07-2022 | Organization: NAFED CG | District: Mungeli | Block: Lormi, CG)
23. SANKALP SHAKTI AGROFED KRISHAK UTPADAK BAHUDDESH (Date: 02-07-2021 | Organization: NAFED CG | District: Koriya | Block: Baikunthpur, CG)
24. SONHAT GAURAV AGROFED KRISHAK UTPADAK BAHUDDESH (Date: 02-07-2021 | Organization: NAFED CG | District: Koriya | Block: Sonhut, CG)

Key Activities:
- Baseline diagnostic assessments, mobilization of smallholder farmers into FPOs.
- Governance, statutory licensing, equity mobilization, and business planning.
- Establishing input shops, aggregation centers, sorting/grading facilities, and market linkages.`
    }
];

const updateAllProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');

        for (const proj of fullProjectsData) {
            const existing = await Project.findOne({ title: proj.title });
            if (existing) {
                existing.description = proj.description;
                existing.category = proj.category;
                existing.theme = proj.theme;
                existing.link = proj.link;
                existing.stats = proj.stats;
                await existing.save();
                console.log(`Updated full description for: ${proj.title}`);
            } else {
                await Project.create(proj);
                console.log(`Created new project: ${proj.title}`);
            }
        }

        console.log('All 16 projects updated with 100% full, verbatim content!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

updateAllProjects();
