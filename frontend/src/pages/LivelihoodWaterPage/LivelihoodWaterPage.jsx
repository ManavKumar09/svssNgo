import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './LivelihoodWaterPage.css';
import livelihoodDevelopment1 from '../../assets/photos/LivelihoodDevelopment/livelihoodDevelopment1.png';
import livelihoodDevelopment2 from '../../assets/photos/LivelihoodDevelopment/livelihoodDevelopment2.png';
import livelihoodDevelopment3 from '../../assets/photos/LivelihoodDevelopment/livelihoodDevelopment3.png';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const LivelihoodWaterPage = () => {
    return (
        <div className="livelihood-water-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${livelihoodDevelopment1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Livelihood Development & Safe Drinking Water</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Livelihood & Safe Drinking Water</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Project Overview</span>
                        <h2>Safe Drinking Water for Communities</h2>
                        <p><strong>Project:</strong> Setting of RO Water Facility for Women SHGs (500LPM)</p>
                        <p><strong>Project Areas:</strong> Amala Gram Panchayat, Block Fanda, Bhopal, MP</p>
                        <p><strong>Beneficiaries:</strong> 250</p>
                        <p><strong>Sponsoring Agency:</strong> United Spirits Ltd (USL) - DIAGEO</p>
                        <p>
                            DIAGEO implements innovative strategies for improving the quality of life of under-served communities. Since May 2017, DIAGEO & SVSS began their journey with a single mission: providing rural communities with access to safe, potable drinking water.
                        </p>
                        <p>
                            Community Water Services installs and operates centers that reliably address water contamination. Currently, the Community RO water system provides safe water to over 35 villages in Madhya Pradesh. A dedicated team of 7 people makes the community RO Water system the most experienced women community water centre operator in Amala.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={livelihoodDevelopment2} alt="Safe Drinking Water Facility" />
                    </div>
                </div>

                {/* Section 2: Business Model */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Partnership Strategy</span>
                        <h2>Tripartite Business Model</h2>
                        <p>
                            Community Water Services’ model is based on a tripartite partnership between a local community, a CSR donor (DIAGEO), and the implementing entity. 
                        </p>
                        
                        <div className="roles-container" style={{ marginTop: '20px' }}>
                            <div className="role-box">
                                <h3>The Community (Gram Panchayat) Provides:</h3>
                                <ul className="activities-list">
                                    <li>A suitable location and reliable water source.</li>
                                    <li>Power connection for plant capacity.</li>
                                    <li>Support to SVSS for awareness, fee collection, and managing the plant.</li>
                                </ul>
                            </div>
                            
                            <div className="role-box">
                                <h3>The Donor (DIAGEO) Provides:</h3>
                                <ul className="activities-list">
                                    <li>Funding for fixed costs (building, machinery, installation, survey, mobilization).</li>
                                    <li>Funding for any deficit in operation and maintenance costs.</li>
                                </ul>
                            </div>
                            
                            <div className="role-box">
                                <h3>SVSS (Project Manager) Responsibility:</h3>
                                <ul className="activities-list">
                                    <li>Selection of location, installation, and efficient operation of the water center.</li>
                                    <li>Quality control – ensuring output meets national standards at all times.</li>
                                    <li>Collecting affordable user fees (Rs. 4 to 5 per 20L) ensuring self-sustainability.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="project-image-content" style={{ alignSelf: 'flex-start' }}>
                        <img src={livelihoodDevelopment3} alt="Community Water Management" />
                    </div>
                </div>

                {/* Section 3: The Impact */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">Project Impact</span>
                        <h2>Enhancing and Scaling Social Projects</h2>
                        <p className="lead-paragraph">
                            The Community RO Water System employs around seven people across the village. About 100 households now have direct access to safe drinking water.
                        </p>
                        <p>
                            This social enterprise champions the cause of safe drinking water by dispersing <strong>80 million liters per year to 608 people</strong>, including schools and government crèche centers across 40 villages stricken with highly contaminated water sources.
                        </p>
                        <p>
                            DIAGEO plays a significant role in enhancing and scaling-up social projects run by social enterprises. Communities at the bottom of the pyramid do not have enough purchasing capacity to set up capital-intensive services. External funders like DIAGEO facilitate setting up these units, doing a great service to local communities as part of their CSR efforts.
                        </p>
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default LivelihoodWaterPage;
