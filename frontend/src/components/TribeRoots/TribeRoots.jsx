import React from 'react';
import { useNavigate } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import './TribeRoots.css';
import kutki from '../../assets/photos/TribeRoots/Kutki.png';
import toordaal from '../../assets/photos/TribeRoots/Toordaal.png';
import honey from '../../assets/photos/TribeRoots/TribeRootshoney.png';
import jwaratta from '../../assets/photos/TribeRoots/jwaraata.png';

const TribeRoots = () => {
    const navigate = useNavigate();

    const handleVisitClick = (e) => {
        if (e) e.preventDefault();
        navigate('/tribe-roots');
    };

    return (
        <section className="tribe-roots-section">
            <div className="tribe-roots-container">
                <FadeIn delay={0.1} direction="right" className="tribe-roots-left">
                    <h4 className="tribe-roots-subheading">TRIBE ROOTS</h4>
                    <h2 className="tribe-roots-heading">
                        Buy a story. Empower a maker.
                    </h2>
                    <p className="tribe-roots-description">
                        Hand-made products from SVSS women's SHGs and tribal
                        cooperatives — handlooms, vermi-compost, sericulture silk, honey
                        and millets.
                    </p>
                    <a href="/tribe-roots" onClick={handleVisitClick} className="tribe-roots-btn">
                        <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        Visit Tribe Roots
                    </a>
                </FadeIn>
                
                <div className="tribe-roots-right">
                    <div className="image-grid">
                        <FadeIn delay={0.3} direction="up" className="grid-item" onClick={handleVisitClick} style={{cursor: 'pointer'}}>
                            <img src={kutki} alt="Millets" />
                            <span className="image-label">Millets</span>
                        </FadeIn>
                        <FadeIn delay={0.5} direction="up" className="grid-item" onClick={handleVisitClick} style={{cursor: 'pointer'}}>
                            <img src={toordaal} alt="Pulses" />
                            <span className="image-label">Pulses</span>
                        </FadeIn>
                        <FadeIn delay={0.4} direction="up" className="grid-item" onClick={handleVisitClick} style={{cursor: 'pointer'}}>
                            <img src={honey} alt="Forest Honey" />
                            <span className="image-label">Forest Honey</span>
                        </FadeIn>
                        <FadeIn delay={0.6} direction="up" className="grid-item" onClick={handleVisitClick} style={{cursor: 'pointer'}}>
                            <img src={jwaratta} alt="Agro Produce" />
                            <span className="image-label">Agro Produce</span>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TribeRoots;
