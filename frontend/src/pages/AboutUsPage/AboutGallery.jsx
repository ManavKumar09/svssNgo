import React from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import './AboutGallery.css';

// Placeholder images for the gallery
import img1 from '../../assets/photos/aboutusgallery.JPG';
import img2 from '../../assets/photos/aboutusgallery2.jpg';
import img3 from '../../assets/photos/aboutusgallery3.jpg';
import img4 from '../../assets/photos/aboutusgallery4.jpg';
import img5 from '../../assets/photos/aboutusgallery5.jpg';
import img6 from '../../assets/photos/aboutusgallery6.jpg';

const AboutGallery = () => {
    return (
        <section className="about-gallery-section">
            <div className="about-gallery-container">
                <FadeIn delay={0.1}>
                    <h4 className="gallery-subtitle">SNAPSHOTS FROM THE FIELD</h4>
                </FadeIn>
                
                <FadeIn delay={0.2}>
                    <h2 className="gallery-title">Three decades of doing — in pictures.</h2>
                </FadeIn>
                
                <div className="about-gallery-grid">
                    <FadeIn delay={0.3} direction="up" className="about-gallery-item">
                        <img src={img1} alt="Snapshot 1" className="about-gallery-img" />
                    </FadeIn>
                    <FadeIn delay={0.4} direction="up" className="about-gallery-item">
                        <img src={img2} alt="Snapshot 2" className="about-gallery-img" />
                    </FadeIn>
                    <FadeIn delay={0.5} direction="up" className="about-gallery-item">
                        <img src={img3} alt="Snapshot 3" className="about-gallery-img" />
                    </FadeIn>
                    <FadeIn delay={0.6} direction="up" className="about-gallery-item">
                        <img src={img4} alt="Snapshot 4" className="about-gallery-img" />
                    </FadeIn>
                    <FadeIn delay={0.7} direction="up" className="about-gallery-item">
                        <img src={img5} alt="Snapshot 5" className="about-gallery-img" />
                    </FadeIn>
                    <FadeIn delay={0.8} direction="up" className="about-gallery-item">
                        <img src={img6} alt="Snapshot 6" className="about-gallery-img" />
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default AboutGallery;
