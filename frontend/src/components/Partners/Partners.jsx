import React, { useState, useEffect } from 'react';
import FadeIn from '../FadeIn/FadeIn';
import './Partners.css';

// Import all local partner logos as fallback
const partnerLogos = import.meta.glob('../../assets/photos/partners/*.{jpg,jpeg,png,JPG}', { eager: true, import: 'default' });
const fallbackPartnerImages = Object.values(partnerLogos);

const Partners = () => {
    const [partnersList, setPartnersList] = useState([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/partners');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const formatted = data.map(item => ({
                            imgSrc: item.logo ? (item.logo.startsWith('http') ? item.logo : `http://localhost:5000${item.logo}`) : '',
                            name: item.name || 'Partner'
                        })).filter(item => Boolean(item.imgSrc));

                        if (formatted.length > 0) {
                            setPartnersList(formatted);
                            return;
                        }
                    }
                }
            } catch (err) {
                console.warn('Failed to load dynamic partners, using fallback images', err);
            }

            // Fallback to local assets if API offline
            setPartnersList(fallbackPartnerImages.map((imgSrc, idx) => ({
                imgSrc,
                name: `Partner ${idx + 1}`
            })));
        };

        fetchPartners();
    }, []);

    const logosToDisplay = partnersList.length > 0 ? partnersList : fallbackPartnerImages.map((imgSrc, idx) => ({
        imgSrc,
        name: `Partner ${idx + 1}`
    }));

    return (
        <section className="partners-section">
            <div className="partners-container">
                <FadeIn delay={0.1}>
                    <h2 className="partners-heading">Our Partners and Donors</h2>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <div className="marquee-wrapper">
                        <div className="marquee-track">
                            {/* First set of logos */}
                            {logosToDisplay.map((partner, index) => (
                                <div key={`set1-${index}`} className="partner-logo-container">
                                    <img
                                        src={partner.imgSrc}
                                        alt={partner.name}
                                        className="partner-logo"
                                        onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                                    />
                                </div>
                            ))}
                            {/* Duplicate set for seamless looping */}
                            {logosToDisplay.map((partner, index) => (
                                <div key={`set2-${index}`} className="partner-logo-container">
                                    <img
                                        src={partner.imgSrc}
                                        alt={partner.name}
                                        className="partner-logo"
                                        onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Partners;
