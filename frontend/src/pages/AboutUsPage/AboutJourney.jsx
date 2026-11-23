import React, { useState, useEffect } from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import './AboutJourney.css';

const defaultMilestonesData = {
    subtitle: 'OUR JOURNEY',
    title: 'Milestones along the way',
    milestones: [
        {
            year: '1988',
            text: 'SVSS founded in Bhopal with young community groups for grass-root development.'
        },
        {
            year: '1990s',
            text: '12A & 80G registrations. First audited annual reports.'
        },
        {
            year: '1995',
            text: 'FCRA registration — opened the door to international funding partners.'
        },
        {
            year: '2005',
            text: 'Launch of Radio Awaz 91.2 MHz FM — the SVSS community radio station.'
        },
        {
            year: '2010s',
            text: 'Major scale-up with NHM, NABARD, UNICEF, WFP and Childline India partnerships.'
        },
        {
            year: '2024',
            text: '12 fields of work, 2.5 lakh+ community members engaged, 3.5 lakh+ adolescents reached.'
        }
    ]
};

const AboutJourney = () => {
    const [journeyData, setJourneyData] = useState(defaultMilestonesData);

    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/milestones');
                if (res.ok) {
                    const data = await res.json();
                    if (data && Array.isArray(data.milestones) && data.milestones.length > 0) {
                        setJourneyData(data);
                    }
                }
            } catch (err) {
                console.warn('Could not load dynamic milestones, using defaults', err);
            }
        };

        fetchMilestones();
    }, []);

    const list = journeyData.milestones || [];

    return (
        <section className="about-journey-section">
            <div className="about-journey-container">
                <FadeIn delay={0.1}>
                    <h4 className="journey-subtitle">{journeyData.subtitle || 'OUR JOURNEY'}</h4>
                </FadeIn>
                
                <FadeIn delay={0.2}>
                    <h2 className="journey-title">{journeyData.title || 'Milestones along the way'}</h2>
                </FadeIn>

                <div className="timeline-container">
                    {list.map((milestone, index) => (
                        <FadeIn delay={0.2 + (index * 0.08)} key={milestone._id || milestone.year || index}>
                            <div className="timeline-item">
                                <div className="timeline-marker">
                                    <div className="timeline-dot"></div>
                                    {index !== list.length - 1 && <div className="timeline-line"></div>}
                                </div>
                                <div className="timeline-content">
                                    <h3 className="timeline-year">{milestone.year}</h3>
                                    <p className="timeline-text">{milestone.text}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutJourney;

