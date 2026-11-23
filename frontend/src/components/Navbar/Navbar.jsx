import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import svssLogo from '../../assets/photos/SVSSlogo.jpeg';
import './Navbar.css';

const Navbar = ({ textTheme = 'light' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const menuData = [
        {
            id: 'who-we-are',
            title: 'Who we are',
            links: [
                { name: 'About Us', path: '/about-us' },
                { name: 'Our Team', path: '/our-team' }
            ]
        },
        {
            id: 'what-we-do',
            title: 'What we do',
            links: [
                { name: 'Current Project', path: '/current-projects' },
                { name: 'Completed Project', path: '/completed-projects' }
            ]
        }
    ];

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Fetch site settings for dynamic contact info & social media links
    const [settings, setSettings] = useState({
        email: 'svssngobpl@gmail.com',
        phone1: '+91 9425373168',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        youtubeUrl: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.key) {
                        setSettings(prev => ({
                            ...prev,
                            email: data.email || prev.email,
                            phone1: data.phone1 || prev.phone1,
                            facebookUrl: data.facebookUrl || '',
                            instagramUrl: data.instagramUrl || '',
                            twitterUrl: data.twitterUrl || '',
                            youtubeUrl: data.youtubeUrl || ''
                        }));
                    }
                }
            } catch (err) {
                console.warn('Could not fetch dynamic navbar settings', err);
            }
        };

        fetchSettings();
    }, []);

    const formatUrl = (url) => {
        if (!url) return '';
        const trimmed = url.trim();
        if (!trimmed || trimmed === '#') return '';
        if (/^https?:\/\//i.test(trimmed)) {
            return trimmed;
        }
        return `https://${trimmed}`;
    };

    const hasSocialLinks = Boolean(
        settings.facebookUrl || settings.instagramUrl || settings.youtubeUrl || settings.twitterUrl
    );

    return (
        <>
            {/* Fullscreen Navigation Menu */}
            <div className={`fullscreen-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <Link to="/" className="menu-logo" style={{ textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
                        <div className="logo-icon">
                            <img src={svssLogo} alt="SVSS Logo" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <span className="logo-text-svss">SVSS</span>
                        <span className="logo-text-bhopal">Bhopal</span>
                    </Link>
                </div>

                <div className="menu-content">
                    <div className="menu-left-col">
                        <div className="accordion-menu">
                            {menuData.map((item) => (
                                <div className="accordion-item" key={item.id}>
                                    <button 
                                        className="accordion-header" 
                                        onClick={() => toggleSection(item.id)}
                                    >
                                        <span>{item.title}</span>
                                        <span className="accordion-icon">
                                            {openSection === item.id ? '−' : '+'}
                                        </span>
                                    </button>
                                    <div className={`accordion-content ${openSection === item.id ? 'open' : ''}`}>
                                        <ul className="accordion-links">
                                            {item.links.map((link, idx) => (
                                                <li key={idx}>
                                                    {link.path.startsWith('/') ? (
                                                        <Link to={link.path} onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
                                                    ) : (
                                                        <a href={link.path}>{link.name}</a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Direct Links */}
                            <div className="accordion-item">
                                <Link to="/documents" className="accordion-header direct-link" onClick={() => setIsMenuOpen(false)}>
                                    <span>Resources & Disclosures</span>
                                    <span className="accordion-icon arrow">›</span>
                                </Link>
                            </div>
                            <div className="accordion-item">
                                <Link to="/volunteer" className="accordion-header direct-link" onClick={() => setIsMenuOpen(false)}>
                                    <span>Volunteer With Us</span>
                                    <span className="accordion-icon arrow">›</span>
                                </Link>
                            </div>
                            <div className="accordion-item">
                                <Link to="/gallery" className="accordion-header direct-link" onClick={() => setIsMenuOpen(false)}>
                                    <span>Gallery</span>
                                    <span className="accordion-icon arrow">›</span>
                                </Link>
                            </div>
                            <div className="accordion-item">
                                <Link to="/contact" className="accordion-header direct-link" onClick={() => setIsMenuOpen(false)}>
                                    <span>Contact Us</span>
                                    <span className="accordion-icon arrow">›</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="menu-right-col">
                        <div className="menu-contact-grid">
                            <div className="menu-contact-item">
                                <h4>Email</h4>
                                <a href={`mailto:${settings.email}`} className="menu-contact-value">{settings.email}</a>
                            </div>
                            <div className="menu-contact-item">
                                <h4>Contact Number</h4>
                                <a href={`tel:${settings.phone1.replace(/\s+/g, '')}`} className="menu-contact-value">{settings.phone1}</a>
                            </div>
                        </div>

                        <div className="menu-social-section">
                            <h4>Social Media</h4>
                            <div className="menu-social-icons">
                                {settings.instagramUrl && (
                                    <a href={formatUrl(settings.instagramUrl)} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                )}
                                {settings.youtubeUrl && (
                                    <a href={formatUrl(settings.youtubeUrl)} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                    </a>
                                )}
                                {settings.facebookUrl && (
                                    <a href={formatUrl(settings.facebookUrl)} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </a>
                                )}
                                {settings.twitterUrl && (
                                    <a href={formatUrl(settings.twitterUrl)} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                    </a>
                                )}
                                {!hasSocialLinks && (
                                    <>
                                        <span style={{ fontSize: '0.85rem', color: '#999' }}>Follow us on YouTube & Instagram</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className={`navbar text-${textTheme}`}>
                <div className="nav-left">
                    <button className="hamburger-menu" onClick={() => setIsMenuOpen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <div className="nav-center">
                    <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                        <div className="logo-icon">
                            <img src={svssLogo} alt="SVSS Logo" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
                        </div>
                        <span className="logo-text-svss">SVSS</span>
                        <span className="logo-text-bhopal">Bhopal</span>
                    </Link>
                </div>
                
                <div className="nav-right">
                    <Link to="/contact" className="take-action-link" onClick={() => setIsMenuOpen(false)}>
                        CONTACT US
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
