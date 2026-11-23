import React from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import './AboutApproach.css';

const approachCards = [
    {
        number: '01',
        category: 'GRASSROOTS ACTION & LIVELIHOODS',
        title: 'Action-Driven Village Transformation',
        description: 'We work directly with impoverished and rural communities to build sustainable livelihood resources. From motivating and mobilizing village groups to identifying and promoting appropriate technologies, our hands-on approach builds self-sustaining local mechanisms and capacity for lasting economic independence.',
        highlights: [
            'Community Mobilization & Skill Development',
            'Appropriate Technology Adoption',
            'Sustainable Resource & Enterprise Management'
        ]
    },
    {
        number: '02',
        category: 'INFORMATION & RESOURCE HUB',
        title: 'Supporting Those Who Support Others',
        description: 'Serving as a comprehensive Information Resource Centre for Non-Governmental Organizations (NGOs), non-profits, grassroots activists, and social workers. We facilitate the sharing and dissemination of vital development resources, guiding organizations through establishment, registration, statutory compliance, and strategic management.',
        highlights: [
            'Institutional Capacity & Governance Guidance',
            'Resource Dissemination for Social Activists',
            'Best-Practice Toolkits for Voluntary Sector'
        ]
    },
    {
        number: '03',
        category: 'CATALYST FOR SUSTAINABLE CHANGE',
        title: 'Advancing the Global Goals (SDGs)',
        description: 'Acting as an active catalyst in the cycle of change, we complement and supplement government initiatives to achieve the Sustainable Development Goals. We partner with like-minded institutions, CSR leaders, and changemakers to deploy high-impact programs across education, healthcare, livelihoods, and women empowerment.',
        highlights: [
            'Public & Institutional Synergies',
            'Focus on Education, Health & Women Empowerment',
            'Driving Long-Term Grassroots Behavioral Change'
        ]
    }
];

const AboutApproach = () => {
    return (
        <section className="about-approach-section">
            <div className="about-approach-container">
                <div className="about-approach-header">
                    <FadeIn delay={0.1}>
                        <h4 className="approach-subtitle">HOW WE OPERATE</h4>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <h2 className="approach-title">Our Strategic Impact Pillars</h2>
                        <p className="approach-lead">
                            Integrating community-driven action, institutional knowledge sharing, and catalytic partnerships to create multi-generational change.
                        </p>
                    </FadeIn>
                </div>

                <div className="approach-cards-grid">
                    {approachCards.map((card, idx) => (
                        <FadeIn key={idx} delay={0.2 + idx * 0.1} className="approach-card-fade">
                            <div className="approach-card">
                                <div className="card-top">
                                    <span className="card-number">{card.number}</span>
                                    <span className="card-category">{card.category}</span>
                                </div>
                                <h3 className="card-title">{card.title}</h3>
                                <p className="card-desc">{card.description}</p>
                                <div className="card-divider"></div>
                                <ul className="card-highlights">
                                    {card.highlights.map((item, hIdx) => (
                                        <li key={hIdx}>
                                            <span className="bullet-check">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutApproach;
