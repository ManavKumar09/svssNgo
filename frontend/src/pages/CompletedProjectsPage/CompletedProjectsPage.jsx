import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CompletedProjectsPage.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import defaultCategoryImg from '../../assets/photos/aboutusgallery.JPG';

const defaultThemeInfo = {
    'agriculture-livelihood': {
        title: 'Agriculture & Livelihoods',
        badge: 'Farming & Income'
    },
    'health-sanitation': {
        title: 'Health & Sanitation',
        badge: 'Public Health'
    },
    'environment-climate': {
        title: 'Environment & Climate',
        badge: 'Conservation'
    },
    'community-empowerment': {
        title: 'Community Empowerment',
        badge: 'Empowerment'
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

const CompletedProjectsPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/projects');
                const data = await res.json();
                if (Array.isArray(data)) {
                    const completed = data.filter(p => p.category === 'completed' && p.theme);
                    
                    // Group dynamically by theme
                    const themeMap = {};
                    completed.forEach(p => {
                        const themeKey = p.theme.trim().toLowerCase();
                        if (!themeMap[themeKey]) {
                            themeMap[themeKey] = {
                                id: themeKey,
                                title: formatCategoryTitle(themeKey),
                                badge: defaultThemeInfo[themeKey]?.badge || 'Key Focus Area',
                                link: `/completed-projects/${themeKey}`,
                                image: p.headerImage 
                                    ? (p.headerImage.startsWith('http') ? p.headerImage : `https://svssngo.onrender.com${p.headerImage}`)
                                    : defaultCategoryImg,
                                count: 1
                            };
                        } else {
                            themeMap[themeKey].count++;
                            if (p.headerImage && (!themeMap[themeKey].image || themeMap[themeKey].image === defaultCategoryImg)) {
                                themeMap[themeKey].image = p.headerImage.startsWith('http') ? p.headerImage : `https://svssngo.onrender.com${p.headerImage}`;
                            }
                        }
                    });

                    setCategories(Object.values(themeMap));
                }
            } catch (err) {
                console.error('Failed to fetch project categories', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="current-projects-page">
            <Navbar textTheme="dark" />
            
            {/* Page Header */}
            <section className="projects-hero">
                <div className="projects-hero-content">
                    <h1>Our <span className="highlight">Completed Projects</span></h1>
                    <p>Discover the impactful initiatives we have successfully executed across various focus areas.</p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="categories-grid-container">
                {loading ? (
                    <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>Loading focus areas...</p>
                ) : categories.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>No project categories found.</p>
                ) : (
                    <div className="categories-grid">
                        {categories.map(category => (
                            <Link to={category.link} key={category.id} className="category-card">
                                <div className="category-image-wrapper">
                                    <img 
                                        src={category.image} 
                                        alt={category.title} 
                                        className="category-image" 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = defaultCategoryImg;
                                        }}
                                    />
                                    <div className="category-overlay">
                                        <span className="category-badge">{category.badge}</span>
                                        <h2 className="category-title">{category.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
            
            <Footer />
        </div>
    );
};

export default CompletedProjectsPage;
