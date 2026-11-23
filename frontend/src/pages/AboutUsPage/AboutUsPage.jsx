import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutHero from './AboutHero';
import AboutIntro from './AboutIntro';
import AboutMissionValues from './AboutMissionValues';
import AboutApproach from './AboutApproach';
import AboutJourney from './AboutJourney';
import AboutMap from './AboutMap';
import AboutGallery from './AboutGallery';
import Voices from '../../components/Voices/Voices';
import Footer from '../../components/Footer/Footer';

const AboutUsPage = () => {
    const location = useLocation();

    useLayoutEffect(() => {
        if (location.hash === '#reviews') {
            // Give it a tiny bit more time for images to load so the scroll lands accurately
            const timeoutId = setTimeout(() => {
                const element = document.getElementById('reviews');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
            return () => clearTimeout(timeoutId);
        } else {
            // Aggressive scroll to top
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            
            // Re-apply after a short delay, and forcefully scroll the top element into view
            const timeoutId = setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                const topElement = document.getElementById('top');
                if (topElement) {
                    topElement.scrollIntoView({ behavior: 'instant', block: 'start' });
                }
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [location]);

    return (
        <div className="about-us-page">
            <AboutHero />
            <AboutIntro />
            <AboutMissionValues />
            <AboutApproach />
            <AboutJourney />
            <AboutMap />
            <AboutGallery />
            <Voices />
            <Footer />
        </div>
    );
};

export default AboutUsPage;
