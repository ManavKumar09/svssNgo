import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ChildHelpLinePage.css';
import childline1 from '../../assets/photos/childline/enhanced_childline_cover.png';
import childline2 from '../../assets/photos/childline/childline2.png';
import childline3 from '../../assets/photos/childline/childline3.png';
import childline4 from '../../assets/photos/childline/childline4.png';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const ChildHelpLinePage = () => {
    return (
        <div className="child-helpline-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${childline1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Child Help Line 1098</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Child Help Line 1098</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">About the Initiative</span>
                        <h2>A 24-Hour Lifeline for Vulnerable Children</h2>
                        <p>
                            Initiated in 1998, CHILDLINE (1098) is India's premier 24-hour, toll-free emergency phone service for children in distress, proudly supported by the Ministry of Women & Child Development, Government of India.
                        </p>
                        <p>
                            More than just an emergency response, CHILDLINE acts as a critical link, connecting vulnerable children with essential long-term care and rehabilitation services. As a single-point contact, we facilitate immediate access to support, professional guidance, and active intervention.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={childline2} alt="Childline Outreach" />
                    </div>
                </div>

                {/* Section 2: Impact (Reversed Layout) */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Outcome & Impact</span>
                        <h2>Grassroots Outreach in Sehore</h2>
                        <p>
                            This year, Childline Sehore successfully reached 660 beneficiaries through targeted child rights protection schemes. To amplify our impact, we organized comprehensive awareness campaigns and orientation programs engaging diverse stakeholders—including schools, Anganwadis, community organizations, local transport operators, law enforcement, healthcare staff, and the general public.
                        </p>
                        <p>
                            Our grassroots initiatives featured extensive outreach drives and Open House sessions to educate the community on child rights, prevalent issues, and the vital 1098 helpline. With immense support from local authorities, our dedicated team visited 95 villages across 8 Tehsils in Sehore district, successfully establishing a robust, localized network of volunteers and support institutions.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={childline3} alt="Community Engagement" />
                    </div>
                </div>

                {/* Section 3: Expansion & Covid */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">National Scale</span>
                        <h2>Expansion & Emergency Relief</h2>
                        <p>
                            <strong>National Growth:</strong> The past year has marked significant growth for the CHILDLINE network. Expanding from our presence in 569 districts in early 2020, our services are now actively operational in over 81% of the country. Today, the network spans 598 districts through 1,070 dedicated intervention units, and active Child Help Desks at 141 railway stations and 5 bus terminals.
                        </p>
                        <p>
                            <strong>COVID-19 Response:</strong> Throughout the pandemic, CHILDLINE was at the forefront of the response. Working hand-in-hand with district administrations and civil society, we actively disseminated crucial health information, distributed hygiene kits, food, and medical supplies, and facilitated emergency relief for affected families. We continue to provide robust resources, prevention measures, and vital mental health support for children navigating crises.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={childline4} alt="COVID-19 Relief Efforts" />
                    </div>
                </div>

                {/* Section 4: Looking Ahead (Text Only) */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">Looking Ahead</span>
                        <h2>System Integration & Specialized Care</h2>
                        <p className="lead-paragraph">
                            Recent government directives aim to integrate the Child Helpline (1098) with the Emergency Response Support System (ERSS - 112). While this shift seeks to streamline emergency responses, leading child rights advocates emphasize that CHILDLINE is much more than a standard emergency dispatch.
                        </p>
                        <p>
                            As experts like Amod Kanth point out, children require specialized support, immediate counseling, and sensitive intervention that goes beyond traditional police response. SVSS Bhopal remains steadfast in our commitment to ensuring that every child receives the professional, empathetic care they critically need, regardless of systemic transitions.
                        </p>
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default ChildHelpLinePage;
