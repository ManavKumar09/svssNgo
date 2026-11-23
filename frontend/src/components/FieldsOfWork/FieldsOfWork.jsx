import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import './FieldsOfWork.css';
import agriLivelihoodImg from '../../assets/photos/IntegratedFarming/IntegratedFarming1.png';
import healthSanitationImg from '../../assets/photos/NationalHealth/NationalHealth1.png';
import envClimateImg from '../../assets/photos/ClimateChange/ClimateChange3.png';
import communityCategoryImg from '../../assets/photos/childline/childline2.png';
import defaultCategoryImg from '../../assets/photos/aboutusgallery.JPG';

const defaultThemeInfo = {
    'agriculture-livelihood': {
        title: 'Agriculture & Livelihoods',
        badge: 'Category | Farming & Income',
        image: agriLivelihoodImg
    },
    'health-sanitation': {
        title: 'Health & Sanitation',
        badge: 'Category | Public Health',
        image: healthSanitationImg
    },
    'environment-climate': {
        title: 'Environment & Climate',
        badge: 'Category | Conservation',
        image: envClimateImg
    },
    'community-empowerment': {
        title: 'Community Empowerment',
        badge: 'Category | Empowerment',
        image: communityCategoryImg
    }
};

const formatCategoryTitle = (slug) => {
    if (!slug) return 'Focus Area';
    const cleanSlug = slug.trim().toLowerCase();
    if (defaultThemeInfo[cleanSlug]?.title) return defaultThemeInfo[cleanSlug].title;
    return slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
        .replace(/\bAnd\b/gi, '&');
};

const defaultFieldsData = [
    {
        id: 'agriculture-livelihood',
        category: 'Category | Farming & Income',
        title: 'Agriculture & Livelihoods',
        image: agriLivelihoodImg,
        link: '/completed-projects/agriculture-livelihood'
    },
    {
        id: 'health-sanitation',
        category: 'Category | Public Health',
        title: 'Health & Sanitation',
        image: healthSanitationImg,
        link: '/completed-projects/health-sanitation'
    },
    {
        id: 'environment-climate',
        category: 'Category | Conservation',
        title: 'Environment & Climate',
        image: envClimateImg,
        link: '/completed-projects/environment-climate'
    },
    {
        id: 'community-empowerment',
        category: 'Category | Empowerment',
        title: 'Community Empowerment',
        image: communityCategoryImg,
        link: '/completed-projects/community-empowerment'
    }
];

const FieldsOfWork = () => {
    const [fieldsData, setFieldsData] = useState(defaultFieldsData);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        const completed = data.filter(p => p.category === 'completed' && p.theme);
                        
                        // Group dynamically by theme
                        const themeMap = {};
                        completed.forEach(p => {
                            const themeKey = p.theme.trim().toLowerCase();
                            if (!themeMap[themeKey]) {
                                const fallbackInfo = defaultThemeInfo[themeKey];
                                themeMap[themeKey] = {
                                    id: themeKey,
                                    category: fallbackInfo?.badge || `Category | ${formatCategoryTitle(themeKey)}`,
                                    title: formatCategoryTitle(themeKey),
                                    link: `/completed-projects/${themeKey}`,
                                    image: p.headerImage 
                                        ? (p.headerImage.startsWith('http') ? p.headerImage : `https://svssngo.onrender.com${p.headerImage}`)
                                        : (fallbackInfo?.image || defaultCategoryImg)
                                };
                            }
                        });

                        const categoriesArray = Object.values(themeMap);
                        if (categoriesArray.length > 0) {
                            setFieldsData(categoriesArray);
                        }
                    }
                }
            } catch (err) {
                console.warn('Could not fetch dynamic project categories, using default values', err);
            }
        };

        fetchCategories();
    }, []);

    const nextSlide = () => {
        if (fieldsData.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % fieldsData.length);
    };

    const prevSlide = () => {
        if (fieldsData.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + fieldsData.length) % fieldsData.length);
    };

    if (fieldsData.length === 0) return null;

    return (
        <section className="fields-section">
            <div className="fields-container">
                <FadeIn delay={0.1} className="fields-header">
                    <div className="fields-title-area">
                        <span className="fields-label">COMPLETED PROJECTS</span>
                        <h2 className="fields-title">Our completed projects.</h2>
                    </div>
                    <Link to="/completed-projects" className="fields-all-link">
                        See all projects
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </Link>
                </FadeIn>

                <FadeIn delay={0.3} className="fields-slider-wrapper">
                    <div className="fields-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {fieldsData.map((field) => (
                            <div className="field-card-slide" key={field.id}>
                                <div className="field-card">
                                    <div className="field-card-content">
                                        <div className="field-card-category">{field.category}</div>
                                        <h3 className="field-card-title">{field.title}</h3>
                                        <Link to={field.link} className="field-card-link">
                                            VIEW CATEGORY
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m9 18 6-6-6-6"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="field-card-image-wrapper">
                                        <img 
                                            src={field.image || defaultThemeInfo[field.id]?.image || defaultCategoryImg} 
                                            alt={field.title} 
                                            className="field-card-image" 
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                const fallback = defaultThemeInfo[field.id]?.image || defaultCategoryImg;
                                                e.target.src = fallback;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                <FadeIn delay={0.5} className="fields-controls">
                    <button className="control-arrow" onClick={prevSlide} aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6"></path>
                        </svg>
                    </button>
                    <div className="control-dots">
                        {fieldsData.map((_, idx) => (
                            <button 
                                key={idx} 
                                className={`control-dot ${idx === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <button className="control-arrow" onClick={nextSlide} aria-label="Next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </button>
                </FadeIn>
            </div>
        </section>
    );
};

export default FieldsOfWork;
