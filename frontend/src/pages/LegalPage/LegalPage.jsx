import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './LegalPage.css';

const LegalPage = ({ initialTab = 'privacy' }) => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        if (location.pathname.includes('privacy')) {
            setActiveTab('privacy');
        } else if (location.pathname.includes('terms')) {
            setActiveTab('terms');
        } else if (location.pathname.includes('cookies')) {
            setActiveTab('cookies');
        }
    }, [location.pathname]);

    return (
        <div className="legal-page">
            <div className="legal-page-header">
                <Navbar textTheme="dark" />
                <div className="legal-header-content">
                    <span className="legal-subtitle">LEGAL & COMPLIANCE</span>
                    <h1 className="legal-title">
                        {activeTab === 'privacy' && 'Privacy Policy'}
                        {activeTab === 'terms' && 'Terms & Conditions'}
                        {activeTab === 'cookies' && 'Cookies Policy'}
                    </h1>
                    <p className="legal-description">
                        Swami Vivekanand Shiksha Samiti is committed to transparent governance, user privacy, and responsible digital engagement.
                    </p>
                </div>
            </div>

            <div className="legal-tabs-container">
                <Link
                    to="/privacy-policy"
                    className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
                    onClick={() => setActiveTab('privacy')}
                >
                    Privacy Policy
                </Link>
                <Link
                    to="/terms-conditions"
                    className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
                    onClick={() => setActiveTab('terms')}
                >
                    Terms & Conditions
                </Link>
                <Link
                    to="/cookies-policy"
                    className={`legal-tab-btn ${activeTab === 'cookies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cookies')}
                >
                    Cookies Policy
                </Link>
            </div>

            <div className="legal-content-container">
                {activeTab === 'privacy' && (
                    <div className="legal-card animate-fade-in-up">
                        <div className="policy-badge">Effective Date: 2026</div>
                        <h2 className="policy-title">PRIVACY POLICY</h2>

                        <div className="policy-section">
                            <h3>1. Collection of Personal Information</h3>
                            <p>
                                This website does not automatically take any specific personal information (eg name, phone number, or e-mail address) from you, which allows us to identify you personally. If you decide to provide your personal information, such as name or address, by visiting our website, we only use it to fulfill your information request.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>2. Registration & Interaction</h3>
                            <p>
                                Your registration is required to connect to the world of news through us. Information stored in this way is used to facilitate interaction.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>3. Non-Disclosure & Data Protection</h3>
                            <p>
                                SVSS does not sell or share any identifiable personal information provided on this site to any third party (public / private). Any information provided will be protected from its loss, misuse, unauthorized access or disclosure, alteration, or destruction.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>4. Technical Data & Site Inspection</h3>
                            <p>
                                Collects certain information about users, such as Internet Protocol (IP) address, domain name, browser type, operating system, date and time of site inspection. It does not attempt to link these addresses to the identities of the persons inspecting our site, unless an attempt has been made to cause harm.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>5. Contact for Privacy Inquiries</h3>
                            <p>
                                If you have any questions or concerns regarding our privacy practices, please contact us at <a href="mailto:svssngobpl@gmail.com" className="policy-link">svssngobpl@gmail.com</a>.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'cookies' && (
                    <div className="legal-card animate-fade-in-up">
                        <div className="policy-badge">Cookie Notice</div>
                        <h2 className="policy-title">COOKIES POLICY</h2>

                        <div className="policy-section">
                            <h3>What are Cookies?</h3>
                            <p>
                                Cookies are a piece of software code that the Internet website sends to your browser when you access information from that site. Cookies are stored as a simple text file via the website server on your computer or mobile device. And only the server will be able to retrieve or read the contents of that cookie. Cookies allow you to handle pages efficiently, as they store your preferences, and generally improve your experience of a website.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>Cookies Used by Our Website</h3>
                            <p>
                                SVSS and its subfields use the following types of cookies to enhance your browsing experience and facilitate interaction:
                            </p>
                            <div className="cookie-types-grid">
                                <div className="cookie-type-card">
                                    <div className="cookie-type-header">
                                        <span className="cookie-dot green"></span>
                                        <h4>Analytical Cookies</h4>
                                    </div>
                                    <p>
                                        Remembers your computer or mobile device anonymously when you visit our website to keep track of browsing patterns.
                                    </p>
                                </div>
                                <div className="cookie-type-card">
                                    <div className="cookie-type-header">
                                        <span className="cookie-dot blue"></span>
                                        <h4>Service Cookies</h4>
                                    </div>
                                    <p>
                                        Meant to help our website function efficiently, it remembers registration and login details, settings preferences, and pages you've visited.
                                    </p>
                                </div>
                                <div className="cookie-type-card">
                                    <div className="cookie-type-header">
                                        <span className="cookie-dot orange"></span>
                                        <h4>Non-persistent (Per-session) Cookies</h4>
                                    </div>
                                    <p>
                                        Per-session cookies serve technical purposes. These cookies do not collect users' personal information and are destroyed as soon as you leave our website. Cookies do not always record data and are not stored on your computer hard drive. Cookies are stored in memory and only available during active browsing sessions. Again when you close the browser, the cookies disappear.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="policy-section">
                            <h3>Acceptance & Managing Cookies</h3>
                            <p>
                                You may additionally note that where you are encouraged to log in, or who adapt, you are required to accept cookies. If you choose to reject cookies that your browser makes, it is possible that it may not function correctly.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'terms' && (
                    <div className="legal-card animate-fade-in-up">
                        <div className="policy-badge">Terms of Use</div>
                        <h2 className="policy-title">TERMS AND CONDITIONS</h2>

                        <div className="policy-section">
                            <h3>1. Acceptance of Terms</h3>
                            <p>
                                By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use, which together with our Privacy Policy and Cookies Policy govern Swami Vivekanand Shiksha Samiti’s (SVSS) relationship with you in relation to this website.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>2. Permitted Use & Intellectual Property</h3>
                            <p>
                                The content of the pages of this website is for your general information and use only. All materials, project reports, publications, photographs, and branding on this site are the intellectual property of SVSS or credited contributors and may not be reproduced or distributed for commercial purposes without prior written consent.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>3. Community Engagement & Conduct</h3>
                            <p>
                                Users must not use this website to transmit unlawful, defamatory, or harmful material, or attempt unauthorized access to restricted portals, databases, or administrative dashboards.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>4. Donations & Transparency</h3>
                            <p>
                                All voluntary donations, contributions, and grant inquiries are governed by Indian non-profit regulations under the Societies Registration Act 1860, FCRA guidelines, and Section 12A/80G of the Income Tax Act.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>5. Disclaimer of Warranties & Limitation of Liability</h3>
                            <p>
                                While SVSS strives to keep all information up-to-date and correct, we make no representations or warranties of any kind regarding completeness, accuracy, or suitability with respect to the website or the information contained on it.
                            </p>
                        </div>

                        <div className="policy-section">
                            <h3>6. Governing Law & Jurisdiction</h3>
                            <p>
                                Your use of this website and any dispute arising out of such use is subject to the laws of Madhya Pradesh, India.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default LegalPage;
