import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const DEFAULT_SETTINGS = {
    address: 'M-20/3-A, Saket Nagar, Bhopal-462001, Madhya Pradesh, India',
    phone1: '+91-9425373168',
    phone2: '',
    email: 'svssngobpl@gmail.com',
    radioStation: '',
    fcraCert: 'Registered under Societies Registration Act, 1860 · FCRA Registered · 12A & 80G Certified',
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    youtubeUrl: ''
};

const Footer = () => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.key) {
                        setSettings(prev => ({
                            ...prev,
                            address: data.address !== undefined ? data.address : prev.address,
                            phone1: data.phone1 !== undefined ? data.phone1 : prev.phone1,
                            phone2: data.phone2 !== undefined ? data.phone2 : '',
                            email: data.email !== undefined ? data.email : prev.email,
                            radioStation: data.radioStation !== undefined ? data.radioStation : prev.radioStation,
                            fcraCert: data.fcraCert !== undefined ? data.fcraCert : prev.fcraCert,
                            facebookUrl: data.facebookUrl || '',
                            instagramUrl: data.instagramUrl || '',
                            twitterUrl: data.twitterUrl || '',
                            youtubeUrl: data.youtubeUrl || ''
                        }));
                    }
                }
            } catch (err) {
                console.warn('Could not fetch dynamic footer settings, using default values', err);
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

    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-top">
                    {/* Column 1: Brand */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo-wrapper">
                            <div className="footer-logo-circle">
                                <span className="logo-placeholder-text">SVSS</span>
                            </div>
                            <h3 className="footer-brand-name">SVSS</h3>
                        </div>
                        <p className="footer-description">
                            Swami Vivekanand Shiksha Samiti —<br/>
                            a grass-root, action-oriented society<br/>
                            working with poor communities<br/>
                            across Madhya Pradesh since 1988.
                        </p>
                        {(settings.instagramUrl || settings.youtubeUrl || settings.facebookUrl || settings.twitterUrl) && (
                            <div className="footer-social-icons">
                                {settings.instagramUrl && (
                                    <a href={formatUrl(settings.instagramUrl)} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-btn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                )}
                                {settings.youtubeUrl && (
                                    <a href={formatUrl(settings.youtubeUrl)} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-social-btn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                    </a>
                                )}
                                {settings.facebookUrl && (
                                    <a href={formatUrl(settings.facebookUrl)} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-btn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </a>
                                )}
                                {settings.twitterUrl && (
                                    <a href={formatUrl(settings.twitterUrl)} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="footer-social-btn">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Column 2: Explore */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Explore</h4>
                        <ul className="footer-links">
                            <li><Link to="/about-us">About Us</Link></li>
                            <li><Link to="/current-projects">Work & Impact</Link></li>
                            <li><Link to="/our-team">Member Details</Link></li>
                            <li><Link to="/volunteer">Volunteer / Involve</Link></li>
                            <li><Link to="/gallery">Photo Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Transparency & Legal */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Transparency</h4>
                        <ul className="footer-links">
                            <li><Link to="/documents">Resources & Disclosures</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
                            <li><Link to="/cookies-policy">Cookies Policy</Link></li>
                            <li><Link to="/contact">Contact & Feedback</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Reach Us */}
                    <div className="footer-col contact-col">
                        <h4 className="footer-heading">Reach Us</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <span>{settings.address}</span>
                            </li>
                            <li>
                                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <span>{settings.phone1}{settings.phone2 ? ` · ${settings.phone2}` : ''}</span>
                            </li>
                            <li>
                                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <span>{settings.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-info">
                        <p>© 2026 Swami Vivekanand Shiksha Samiti. All rights reserved.</p>
                        <p className="footer-fcra">{settings.fcraCert}</p>
                    </div>
                    <div className="footer-legal-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <span className="footer-legal-divider">|</span>
                        <Link to="/terms-conditions">Terms & Conditions</Link>
                        <span className="footer-legal-divider">|</span>
                        <Link to="/cookies-policy">Cookies Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
