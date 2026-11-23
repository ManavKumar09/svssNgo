import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import './AboutUs.css';
import aboutUsImg from '../../assets/photos/AboutUs.JPG';
import aboutUsImg2 from '../../assets/photos/AboutUs2.jpg';

const AboutUs = () => {
    return (
        <section className="about-us-section" id="about">
            <div className="about-us-container">
                {/* Left Side: Images */}
                <FadeIn delay={0.1} direction="right" className="about-us-images">
                    <div className="watermark-pattern">
                        <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#f0e5ca" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{transform: "rotate(15deg)"}}>
                            <path d="M18 11V6a2 2 0 0 0-4 0v4"></path>
                            <path d="M14 10V4a2 2 0 0 0-4 0v6"></path>
                            <path d="M10 10.5V5a2 2 0 0 0-4 0v9"></path>
                            <path d="M16 13v-1a2 2 0 0 0-4 0"></path>
                            <path d="M6 14v-2a2 2 0 0 0-4 0v5h0a10 10 0 0 0 18-5.3V11"></path>
                        </svg>
                    </div>
                    
                    <div className="main-image-wrapper">
                        <img src={aboutUsImg} alt="NGO Work" className="main-image" />
                    </div>
                    
                    <div className="secondary-image-wrapper">
                        <img src={aboutUsImg2} alt="Community" className="secondary-image" />
                    </div>
                    
                    <div className="experience-badge">
                        <h3 className="badge-years">25+</h3>
                        <p className="badge-text">Years Of<br/>Experience</p>
                    </div>
                </FadeIn>
                
                {/* Right Side: Content */}
                <div className="about-us-content">
                    <FadeIn delay={0.2}>
                        <h4 className="about-us-subtitle">ABOUT SVSS</h4>
                    </FadeIn>
                    
                    <FadeIn delay={0.3}>
                        <h2 className="about-us-title">
                            Goals & objectives — empowerment of the deprived.
                        </h2>
                    </FadeIn>
                    
                    <FadeIn delay={0.4}>
                        <p className="about-us-desc">
                            The empowerment of the deprived sections of society — living below the poverty line — so they can access potential resources and manage them for their own development and for the rural and urban areas in which they live.
                        </p>
                    </FadeIn>
                    
                    <div className="about-us-grid">
                        <FadeIn delay={0.5} className="about-us-grid-item">
                            <h3 className="about-us-grid-title">MISSION</h3>
                            <p className="about-us-grid-desc">
                                To support people's initiatives through a participatory community approach, overcoming developmental barriers across social, educational, technological, and economic spheres, and empowering women's SHGs towards financial independence and socio-economic transformation.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.6} className="about-us-grid-item">
                            <h3 className="about-us-grid-title">VISION</h3>
                            <p className="about-us-grid-desc">
                                The comprehensive empowerment of deprived sections of society living below the poverty line—enabling them to access, control, and manage vital resources for their autonomous development and sustainable progress.
                            </p>
                        </FadeIn>
                    </div>
                    
                    <FadeIn delay={0.7}>
                        <Link to="/about-us" className="about-us-link">
                            Read our full story 
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Link>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
