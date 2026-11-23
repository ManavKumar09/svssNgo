import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './TotalSanitationPage.css';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const TotalSanitationPage = () => {
    return (
        <div className="total-sanitation-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>

            {/* Hero Section */}
            <section className="project-hero">
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Total Sanitation Campaign</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Total Sanitation Campaign</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">

                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Project Overview</span>
                        <h2>Household Sanitation & Community Mobilization</h2>
                        <p><strong>Project:</strong> Total Sanitation Campaign (TSC)</p>
                        <p><strong>Project Areas:</strong> Bilaspur & Janjgir Districts (including Pendra Block), Chhattisgarh</p>
                        <p><strong>Sponsoring & Funding Agency:</strong> Public Health & Engineering Department (PHED) & UNICEF</p>
                        <p>
                            SVSS has been actively promoting household toilet construction and ensuring its regular, proper use across rural areas. We educate rural communities about various techniques for low-cost toilet construction and motivate families to build individual household latrines under the Total Sanitation Campaign (TSC).
                        </p>
                        <p>
                            Through comprehensive capacity building of local stakeholders, SVSS established and operated <strong>Rural Sanitary Marts (RSM)</strong> and <strong>Production Centers</strong> in Bilaspur and Janjgir districts of Chhattisgarh, with a focused operational base in Pendra block of Bilaspur district. These centers provide affordable, quality sanitary materials and hardware to local communities.
                        </p>
                        <p>
                            Our dedicated field teams also mobilized and prepared the communities for verification visits by evaluation teams for the prestigious <strong>Nirmal Block Prize</strong>, recognizing areas that have made outstanding strides toward eliminating open defecation.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <div className="blank-photo-placeholder"></div>
                    </div>
                </div>

                {/* Section 2: National Campaign & Objectives */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">National Initiative</span>
                        <h2>Evolution of the Total Sanitation Campaign (TSC)</h2>
                        <p>
                            The Government of India launched the Central Rural Sanitation Programme (CRSP) in 1986 with the objective of accelerating sanitation coverage in rural areas. In 1999, the programme was restructured, exhibiting a paradigm shift from a supply-driven subsidy approach to a demand-driven, community-led campaign: the <strong>Total Sanitation Campaign (TSC)</strong>, implemented by the Ministry of Rural Development, Government of India.
                        </p>
                        <p>
                            The broader goal of the TSC is to eradicate the practice of open defecation. The core objectives of the campaign include:
                        </p>
                        <ul className="activities-list">
                            <li><strong>Quality of Life:</strong> Improve the general quality of life and health standards in rural areas.</li>
                            <li><strong>Accelerated Coverage:</strong> Accelerate sanitation coverage through universal access to toilets in rural households.</li>
                            <li><strong>Community & PRI Motivation:</strong> Motivate communities and Panchayati Raj Institutions through health education and sustained awareness creation.</li>
                            <li><strong>School & Anganwadi Sanitation:</strong> Cover primary schools and Anganwadi/Balwadi centres with safe sanitation facilities and promote hygiene habits among children.</li>
                            <li><strong>Cost-Effective Technologies:</strong> Encourage cost-effective, appropriate technologies for ecologically safe and sustainable sanitation.</li>
                            <li><strong>Environmental Sanitation:</strong> Develop community-managed environmental sanitation systems focusing on solid and liquid waste management.</li>
                        </ul>
                    </div>
                    <div className="project-image-content">
                        <div className="blank-photo-placeholder"></div>
                    </div>
                </div>

                {/* Section 3: Campaign Components */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">Programme Components</span>
                        <h2>Key Expenditure & Delivery Components</h2>
                        <p className="lead-paragraph">
                            Funding and implementation under the Total Sanitation Campaign are channeled across comprehensive operational components:
                        </p>
                        <div style={{ textAlign: 'left', marginTop: '25px' }}>
                            <ul className="activities-list">
                                <li><strong>Start-Up Activities:</strong> Conducting baseline surveys, assessing local community needs, and preparing village sanitation plans.</li>
                                <li><strong>Information, Education and Communication (IEC):</strong> Organizing awareness drives, interpersonal communication, and behavior change campaigns.</li>
                                <li><strong>Rural Sanitary Marts & Production Centres:</strong> Setting up local manufacturing and distribution hubs for low-cost, quality sanitary hardware.</li>
                                <li><strong>Provision of Revolving Fund:</strong> Providing revolving funds at the district level to support self-help groups and community financing for sanitation.</li>
                                <li><strong>Individual Household Latrines (IHHL):</strong> Financial incentives and technical handholding for rural households to build and maintain toilets.</li>
                                <li><strong>Community Sanitary Complexes:</strong> Constructing clean, shared sanitary complexes in public and community locations.</li>
                                <li><strong>Institutional Toilets:</strong> Building dedicated toilets and handwashing facilities in rural schools and Anganwadi/Balwadi centres.</li>
                                <li><strong>Ecological Sanitation:</strong> Promoting eco-friendly sanitation solutions that conserve water and safely recycle nutrients.</li>
                                <li><strong>Solid and Liquid Waste Management:</strong> Establishing systems for soak pits, composting, and village-level waste disposal.</li>
                                <li><strong>Administrative Charges:</strong> Supporting project management, monitoring, and capacity building of field staff and stakeholders.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Section 4: Panchayati Raj & Governance */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Panchayati Raj & Governance</span>
                        <h2>Institutional Framework & Community Partnership</h2>
                        <p>
                            Sanitation is included in the <strong>11th Schedule of the Constitution of India</strong> and is entrusted as the responsibility of the Panchayats. Implementation follows a decentralized framework across three tiers:
                        </p>
                        <ul className="activities-list">
                            <li><strong>District Level (Zilla Panchayat):</strong> Implements the overall project, approves plans, and tracks district-wide progress.</li>
                            <li><strong>Block Level (Panchayat Samiti):</strong> Coordinates field activities, training, and verification across villages.</li>
                            <li><strong>Village Level (Gram Panchayat):</strong> Plays a pivotal role in direct implementation, community mobilization, and maintenance of clean surroundings.</li>
                        </ul>
                        <p>
                            Gram Panchayats work closely alongside Non-Governmental Organisations (NGOs) such as SVSS to mobilize people for toilet construction and ensure the safe disposal of waste. Panchayats hold primary responsibility for operating and maintaining common sanitary facilities.
                        </p>
                        <p>
                            Additionally, Panchayats contribute from their own resources for school and Anganwadi sanitation facilities, as well as supporting the opening and operation of Production Centres and Rural Sanitary Marts.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <div className="blank-photo-placeholder"></div>
                    </div>
                </div>

            </FadeIn>

            <Footer />
        </div>
    );
};

export default TotalSanitationPage;
