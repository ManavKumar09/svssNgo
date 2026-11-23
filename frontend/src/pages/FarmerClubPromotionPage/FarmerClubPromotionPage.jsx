import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './FarmerClubPromotionPage.css';
import fcp1 from '../../assets/photos/fcp/fcp1.png';
import fcp2 from '../../assets/photos/fcp/fcp2.png';
import fcp3 from '../../assets/photos/fcp/fcp3.png';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const FarmerClubPromotionPage = () => {
    return (
        <div className="farmer-club-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${fcp1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Farmer Club Promotion</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Farmer Club Promotion</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Project Overview</span>
                        <h2>Empowering Farming Communities</h2>
                        <p><strong>District:</strong> Sehore, Bhopal</p>
                        <p><strong>Supported by:</strong> National Bank for Agriculture & Rural Development (NABARD)</p>
                        <p>
                            Agriculture has been the backbone of the country’s economy, as about 60-70% of the population still depends on farming activities for their livelihood security. The challenge before us is how to increase production/productivity and the income of farming communities through the adoption of new, appropriate technologies and the establishment of market linkages.
                        </p>
                        <p>
                            The SVSS team has facilitated 305 farmer clubs with a total membership of 4,575 farmers in the Sehore district and 99 Farmer clubs with a total membership of 1,485 farmers in the Bhopal district, with the active support of Regional Rural Banks and Cooperative banks.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={fcp2} alt="Farmer Club Meeting" />
                    </div>
                </div>

                {/* Section 2: Roles and Support */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Our Approach</span>
                        <h2>Technology Transfer & Credit Counseling</h2>
                        <p>
                            The key role of SVSS is the dissemination of locally appropriate technology, development of skills for the enhancement of production and productivity, and providing credit counseling and assistance with loan recovery. 
                        </p>
                        <p>
                            Adoption of appropriate technologies by farmer clubs improves productivity, which generates additional credit demand from formal banking institutions over time and improves farmers’ income margins. In light of agricultural distress faced by farmers, SVSS provides facilitation support for transferring technology that enhances production in agriculture and related activities.
                        </p>
                        <p><strong>The objective of the programme is:</strong> "Development through credit, technology transfer, awareness and capacity building." The emphasis is on increasing the income of farmers by boosting production & productivity, adopting good agricultural practices, and developing marketing skills.</p>
                    </div>
                    <div className="project-image-content">
                        <img src={fcp3} alt="Agricultural Technology Transfer" />
                    </div>
                </div>

                {/* Section 3: Activities */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">Project Activities</span>
                        <h2>Routine & Non-Routine Interventions</h2>
                        <div className="activities-container" style={{ display: 'flex', justifyContent: 'center', gap: '50px', textAlign: 'left', marginTop: '30px' }}>
                            <div>
                                <h3 style={{ color: '#132a1f', marginBottom: '15px' }}>Routine Activities</h3>
                                <ul className="activities-list">
                                    <li>Formation of farmers club</li>
                                    <li>Maintenance and Preparation of plans</li>
                                    <li>Awareness & Orientation meets</li>
                                    <li>Identification of needs</li>
                                    <li>Organizing Rabi & Kharif Season expert meets</li>
                                    <li>Development of conversion linkages with line departments / institutions</li>
                                </ul>
                            </div>
                            <div>
                                <h3 style={{ color: '#132a1f', marginBottom: '15px' }}>Non-Routine Activities</h3>
                                <ul className="activities-list">
                                    <li>PRA training exercise</li>
                                    <li>Skill training / AEDP / Leadership training</li>
                                    <li>Transfer & adoption of technologies – existing or new</li>
                                    <li>Exposure visits to demonstration sites</li>
                                    <li>Marketing related activities & Innovative activities</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Digitization and Structure */}
                <div className="project-content-block full-width" style={{ marginTop: '-40px' }}>
                    <div className="project-text-content center-text">
                        <span className="section-tag">Structure & Future Outlook</span>
                        <h2>Digitization & Membership Structure</h2>
                        <p>
                            NABARD successfully implemented a pilot project on the “Digitization of Farmer’s Club data” in selected districts across seven states. The pilot is now being upscaled to an all-India level. Digitization helps maintain the sustainability of farmers’ clubs while giving them access to relevant IT services.
                        </p>
                        <p>
                            Each Farmer’s club can have a minimum of 10 members, with no upper limit. Each club has two democratically elected officers (Chief Coordinator and Associate Coordinator) who serve two-year terms. These officers, who must be residents of the club's area, are responsible for organizing meetings with experts, maintaining account books, and communicating effectively with the bank.
                        </p>
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default FarmerClubPromotionPage;
