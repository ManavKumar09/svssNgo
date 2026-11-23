import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './AboutHero.css';
import coverImg from '../../assets/photos/home4.jpeg'; // using placeholder

const AboutHero = () => {
    return (
        <section className="about-hero" id="top">
            <Navbar />
            <div 
                className="about-hero-bg"
                style={{ backgroundImage: `url(${coverImg})` }}
            ></div>
            <div className="about-hero-overlay"></div>
            
            <main className="about-hero-content">
                <div className="about-hero-text-container">
                    <h1 className="about-hero-title animate-fade-in-up">
                        <span className="text-white">Not a charity.</span><br/>
                        <span className="text-white">Not a relief.</span><br/>
                        <span className="text-white">A force turning the<br/>tables on poverty.</span>
                    </h1>
                </div>
            </main>
        </section>
    );
};

export default AboutHero;
