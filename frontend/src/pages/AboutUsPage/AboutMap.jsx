import React from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import mapImg from '../../assets/photos/map.png';
import './AboutMap.css';

const AboutMap = () => {
    return (
        <section className="about-map-section">
            <div className="about-map-container">
                <FadeIn delay={0.1}>
                    <h4 className="map-subtitle">OUR REACH</h4>
                </FadeIn>
                
                <FadeIn delay={0.2}>
                    <h2 className="map-title">Where we work</h2>
                    <p className="map-description">
                        Over the years, we have worked across these places to empower communities, protect the vulnerable, and create lasting positive change.
                    </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <div className="map-image-wrapper">
                        <img src={mapImg} alt="Map of our reach" className="map-image" />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default AboutMap;
