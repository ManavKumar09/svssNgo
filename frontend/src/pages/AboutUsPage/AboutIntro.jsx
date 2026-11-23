import React from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import './AboutIntro.css';

const AboutIntro = () => {
    return (
        <section className="about-intro-section">
            <div className="about-intro-container">
                <FadeIn delay={0.1}>
                    <div className="about-intro-badge">
                        <span className="badge-item">Save Lives</span>
                        <span className="badge-dot">•</span>
                        <span className="badge-item">Enable Social Protection</span>
                        <span className="badge-dot">•</span>
                        <span className="badge-item">Defeat Poverty</span>
                    </div>
                    <h4 className="about-intro-subtitle">ABOUT US</h4>
                </FadeIn>
                
                <FadeIn delay={0.2}>
                    <h2 className="about-intro-title">
                        A non-profit rooted in listening,<br/>walking together and staying long.
                    </h2>
                </FadeIn>
                
                <FadeIn delay={0.3}>
                    <p className="about-intro-desc">
                        SVSS is a grassroots, action-oriented development organization committed to partnering with rural and marginalized communities to build sustainable livelihood ecosystems. Guided by deep community immersion, we mobilize local changemakers, adopt and promote scalable green technologies, mobilize critical resources, and build grassroots capacity—fostering enduring self-reliance, social protection, and generational prosperity.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
};

export default AboutIntro;

