import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './TeamPage.css';

// Import executive photos
import PresidentImg from '../../assets/photos/Team/President.jpeg';
import VicePresidentImg from '../../assets/photos/Team/vicepresident.jpeg';
import SecretaryImg from '../../assets/photos/Team/Secretary.jpeg';
import TreasurerImg from '../../assets/photos/Team/Treasure.jpeg';
import ExecMember1 from '../../assets/photos/Team/ExecutiveMember.jpeg';
import ExecMember2 from '../../assets/photos/Team/ExecutiveMember2.jpeg';
import ExecMember3 from '../../assets/photos/Team/ExecutiveMember3.jpeg';
import ExecMember4 from '../../assets/photos/Team/ExecutiveMember4.jpeg';
import ExecMember5 from '../../assets/photos/Team/ExecutiveMember5.jpeg';

// Import staff photos
import Staff1 from '../../assets/photos/Team/staff1.jpeg';
import Staff2 from '../../assets/photos/Team/staff2.jpeg';
import Staff3 from '../../assets/photos/Team/staff3.jpeg';
import Staff4 from '../../assets/photos/Team/staff4.jpeg';
import Staff5 from '../../assets/photos/Team/staff5.jpeg';
import Staff6 from '../../assets/photos/Team/staff6.jpeg';

const defaultExecutiveMembers = [
    { id: 1, name: 'Sanjoy Kumar Sharma', role: 'President', image: PresidentImg, detail: 'A seasoned development professional with over 35 years of experience in planning, executing, managing, and evaluating development projects. Adept at mentoring and building the capacity of diverse teams to deliver impactful results across various sectors. Maintains strong, collaborative relationships with INGOs, NGOs, corporate partners, and government officials.', category: 'executive' },
    { id: 9, name: 'Ranjan Kumar', role: 'Vice President', image: VicePresidentImg, detail: 'Ranjan Kumar is a seasoned development professional and natural resource management expert with extensive experience in community development, sustainable livelihoods, environmental management, capacity building, and rural entrepreneurship. He has successfully coordinated and implemented a wide range of development projects supported by government institutions, NABARD, DST, UNDP, UNICEF, UNFPA, and other national and international organizations. His areas of expertise include sustainable management and value addition of Non-Timber Forest Produce (NTFP), scientific honey harvesting and processing, promotion of Self-Help Groups (SHGs) and Farmer Producer Organizations (FPOs), women’s empowerment, financial inclusion, agriculture-based livelihoods, climate resilience, and small enterprise development. With strong leadership, project planning, training, and community mobilization skills, he has worked closely with tribal communities, forest-dependent households, women’s groups, farmers, and marginalized populations to create sustainable livelihood opportunities and strengthen local institutions. His professional commitment is focused on integrating technology, natural resource conservation, community participation, and market-oriented approaches to achieve inclusive and sustainable rural development.', category: 'executive' },
    { id: 2, name: 'Sujoy Aich', role: 'Secretary', image: SecretaryImg, detail: 'A Master of Social Work and seasoned development professional with over 25 years of experience in the social sector, collaborating with national and international funding agencies. He possesses strong expertise in liaising, networking, planning, and grassroots mobilization, driving transformative change in livelihood, rural development, and agriculture.', category: 'executive' },
    { id: 3, name: 'Dhirendra Kushwaha', role: 'Treasurer', image: TreasurerImg, detail: 'A dedicated development professional, social scientist, and social worker serving the sector since 1996. He has contributed to numerous programs supported by national and international agencies. His core expertise lies in program design, management, and assessment of development interventions, as well as developing micro-plans using participatory approaches. He brings specialized knowledge in women\'s empowerment, agriculture, health and hygiene, and adolescent and gender issues.', category: 'executive' },
    { id: 4, name: 'Shipra Dey', role: 'Executive Member', image: ExecMember1, detail: 'An educationist and Rashtrapati Awardee in Bharat Scouts & Guides, she serves as a social and cultural envoy and is a national-level painting competition winner. With over 20 years of experience as a professionally trained Montessori educator, she is an exceptional career and study counselor, dedicated to guiding children and youth toward their goals through physical and mental fitness.', category: 'executive' },
    { id: 5, name: 'Urvashi Wadhwa', role: 'Executive Member', image: ExecMember2, detail: 'An academic language educationist, Urvarshi is a professional educator and social worker with over three decades of experience. She is dedicated to imparting the highest quality of knowledge to her students, empowering them to excel in their lives. As a language teacher, cultivating fluency, pronunciation, writing, and oratory skills is her primary objective.', category: 'executive' },
    { id: 6, name: 'Sanjay Khade', role: 'Executive Member', image: ExecMember3, detail: 'A Social Networking Expert, Sanjay is a journalist across print and digital media, as well as an enthusiastic social activist. He brings extensive expertise in the research and production of documentaries and video series spanning social, cultural, motivational, and current affairs topics. Additionally, he specializes in large-scale event coverage, live telecasts, and online streaming across social media platforms.', category: 'executive' },
    { id: 7, name: 'Ravindra Shankar Roy', role: 'Executive Member', image: ExecMember4, detail: 'Holding a Master\'s degree in Fine Arts from Visva-Bharati University, Shantiniketan, this acclaimed artist has participated in prestigious global exhibitions, including the International Triennial of Graphic Art in Macedonia and the Biennial International De Grabado. Recognized with awards from Bharat Bhavan and the MP State Art Exhibition, they have also earned accolades for Clay Animation and hold a National Fellowship from the Ministry of Culture, CCRT.', category: 'executive' },
    { id: 8, name: 'Ajay Soni', role: 'Executive Member', image: ExecMember5, detail: 'A dedicated social worker and entrepreneur, Ajay Soni has made significant contributions to skill development, education, vocational training, and information technology. Highly popular among the youth, he organizes engaging social and cultural activities for children and young adults, and serves as an expert consultant in professional skill development and IT.', category: 'executive' },
];

const defaultStaffMembers = [
    {
        id: 's1',
        name: 'Vaibhav Dwivedi',
        role: 'Consultant',
        image: Staff1,
        detail: 'Consultant providing advisory and program development support across SVSS initiatives.',
        category: 'staff'
    },
    {
        id: 's2',
        name: 'Rajendra Singh Gahlot',
        role: 'Project Coordinator',
        image: Staff2,
        detail: 'Project Coordinator | MSc, PGDCA with 10-15 years of extensive development sector experience.',
        category: 'staff'
    },
    {
        id: 's3',
        name: 'Jayant Dey',
        role: 'Project Coordinator',
        image: Staff3,
        detail: 'Project Coordinator | B.Com, PGDCA with 10-15 years of professional project coordination experience.',
        category: 'staff'
    },
    {
        id: 's4',
        name: 'Vimal Sharma',
        role: 'CEO - FPO',
        image: Staff4,
        detail: 'Chief Executive Officer (CEO) - Farmer Producer Organization (FPO).',
        category: 'staff'
    },
    {
        id: 's5',
        name: 'Rishabh',
        role: 'Staff Member',
        image: Staff5,
        detail: 'Dedicated staff member supporting project operations and community coordination.',
        category: 'staff'
    },
    {
        id: 's6',
        name: 'Preeti Dhurwey',
        role: 'MIS Expert',
        image: Staff6,
        detail: 'MIS Expert | B.Com with 5 years of experience in data management, reporting, and monitoring.',
        category: 'staff'
    }
];

const TeamPage = () => {
    const [executiveMembers, setExecutiveMembers] = useState(defaultExecutiveMembers);
    const [staffMembers, setStaffMembers] = useState(defaultStaffMembers);
    const [activeTab, setActiveTab] = useState('executive'); // 'executive' or 'staff'

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/team');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const executives = [];
                        const staff = [];

                        data.forEach((member, idx) => {
                            let imgUrl = member.image;
                            if (imgUrl && !imgUrl.startsWith('http')) {
                                imgUrl = `https://svssngo.onrender.com${imgUrl}`;
                            }

                            const defaultFallbackMap = {
                                'Sanjoy Kumar Sharma': PresidentImg,
                                'Ranjan Kumar': VicePresidentImg,
                                'Sujoy Aich': SecretaryImg,
                                'Dhirendra Kushwaha': TreasurerImg,
                                'Shipra Dey': ExecMember1,
                                'Urvashi Wadhwa': ExecMember2,
                                'Sanjay Khade': ExecMember3,
                                'Ravindra Shankar Roy': ExecMember4,
                                'Ajay Soni': ExecMember5,
                                'Vaibhav Dwivedi': Staff1,
                                'Rajendra Singh Gahlot': Staff2,
                                'Jayant Dey': Staff3,
                                'Vimal Sharma': Staff4,
                                'Rishabh': Staff5,
                                'Preeti Dhurwey': Staff6
                            };

                            const memberFallback = defaultFallbackMap[member.name] || 
                                (isStaff ? defaultStaffMembers[staff.length % defaultStaffMembers.length]?.image : defaultExecutiveMembers[executives.length % defaultExecutiveMembers.length]?.image);

                            if (!imgUrl) {
                                imgUrl = memberFallback;
                            }

                            const formattedMember = {
                                id: member._id || member.id || idx,
                                name: member.name,
                                role: member.role,
                                detail: member.detail,
                                image: imgUrl || memberFallback,
                                fallbackImage: memberFallback,
                                category: member.category || 'executive'
                            };

                            if (isStaff) {
                                staff.push(formattedMember);
                            } else {
                                executives.push(formattedMember);
                            }
                        });

                        if (executives.length > 0) {
                            setExecutiveMembers(executives);
                        }
                        if (staff.length > 0) {
                            setStaffMembers(staff);
                        }
                    }
                }
            } catch (err) {
                console.log('Using fallback default team members:', err.message);
            }
        };

        fetchTeam();
    }, []);

    const renderMemberCard = (member, fallbackImg) => (
        <div key={member.id} className="team-card">
            <div className="team-image-container">
                <img 
                    src={member.image} 
                    alt={member.name} 
                    className="team-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImg;
                    }}
                />
            </div>
            <div className="team-info">
                <div className="team-info-header">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-detail">{member.detail || 'Dedicated to driving community development and empowerment initiatives with SVSS.'}</p>
                </div>
                <p className="team-role">{member.role}</p>
            </div>
        </div>
    );

    return (
        <>
            <div className="team-page-header">
                <Navbar textTheme="dark" />
            </div>
            <div className="team-page">
                <div className="team-header">
                    <h1 className="team-title">Our Team</h1>
                    <p className="team-subtitle">
                        Meet the dedicated leaders, specialists, and ground coordinators driving our grassroots mission forward.
                    </p>
                </div>
                
                {/* Horizontal Category Tabs (Matching Documents Page Style) */}
                <div className="tabs-container">
                    <button
                        className={`tab-btn ${activeTab === 'executive' ? 'active' : ''}`}
                        onClick={() => setActiveTab('executive')}
                    >
                        Executive Members
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
                        onClick={() => setActiveTab('staff')}
                    >
                        Staff Members
                    </button>
                </div>

                {/* Tab Content Display */}
                <div className="team-content-container">
                    {activeTab === 'executive' && (
                        <div className="team-grid animate-fade-in">
                            {executiveMembers.map((member) => renderMemberCard(member, member.fallbackImage || PresidentImg))}
                        </div>
                    )}

                    {activeTab === 'staff' && (
                        <div className="team-grid animate-fade-in">
                            {staffMembers.map((member) => renderMemberCard(member, member.fallbackImage || Staff1))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TeamPage;
