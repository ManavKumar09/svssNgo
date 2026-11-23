import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './DocumentsPage.css';

const DocumentsPage = () => {
    const [activeTab, setActiveTab] = useState('annual');
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/policies');
                const data = await res.json();
                setDocuments(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch documents", err);
                setLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    const renderDocuments = (category) => {
        const filteredDocs = documents.filter(doc => doc.category === category);
        
        if (loading) return <p style={{ color: '#fff', marginTop: '20px' }}>Loading documents...</p>;
        if (filteredDocs.length === 0) return <p style={{ color: '#fff', marginTop: '20px' }}>No documents found in this category.</p>;

        return (
            <div className="document-links-grid">
                {filteredDocs.map(doc => {
                    const fileUrl = doc.document ? `https://svssngo.onrender.com${doc.document}` : '#';
                    const isWordDoc = fileUrl.endsWith('.doc') || fileUrl.endsWith('.docx');
                    
                    return (
                        <a key={doc._id} href={fileUrl} target="_blank" rel="noopener noreferrer" className="document-card" download={isWordDoc ? true : undefined}>
                            <div className="doc-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <div className="doc-info">
                                <h3>{doc.title}</h3>
                                <span>{isWordDoc ? 'Word Document' : 'PDF Document'}</span>
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="documents-page">
            <div className="documents-page-header">
                <Navbar textTheme="dark" />
                <div className="documents-header-content">
                    <span className="documents-subtitle">TRANSPARENCY</span>
                    <h1 className="documents-title">Resources and Disclosures</h1>
                    <p className="documents-description">
                        Review our progress, impact, financials, policies, and legal compliance.
                    </p>
                </div>
            </div>

            <div className="tabs-container">
                <button
                    className={`tab-btn ${activeTab === 'annual' ? 'active' : ''}`}
                    onClick={() => setActiveTab('annual')}
                >
                    Annual Reports
                </button>
                <button
                    className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
                    onClick={() => setActiveTab('audit')}
                >
                    Audit Reports
                </button>
                <button
                    className={`tab-btn ${activeTab === 'policy' ? 'active' : ''}`}
                    onClick={() => setActiveTab('policy')}
                >
                    Policies
                </button>
                <button
                    className={`tab-btn ${activeTab === 'organization' ? 'active' : ''}`}
                    onClick={() => setActiveTab('organization')}
                >
                    Organization Documents
                </button>
            </div>

            <div className="documents-content-container">
                {activeTab === 'annual' && (
                    <div className="documents-section animate-fade-in-up">
                        <h2 className="section-title">Annual Reports</h2>
                        <p className="section-desc">Review our progress, impact, and financials year by year.</p>
                        {renderDocuments('annual')}
                    </div>
                )}

                {activeTab === 'audit' && (
                    <div className="documents-section animate-fade-in-up">
                        <h2 className="section-title">Audit Reports</h2>
                        <p className="section-desc">Transparency and accountability are at the core of our operations.</p>
                        {renderDocuments('audit')}
                    </div>
                )}

                {activeTab === 'policy' && (
                    <div className="documents-section animate-fade-in-up">
                        <h2 className="section-title">Policies</h2>
                        <p className="section-desc">Read our HR and Volunteer/Internship policies, and apply if you want to spend time with us in the field.</p>
                        {renderDocuments('policy')}
                    </div>
                )}

                {activeTab === 'organization' && (
                    <div className="documents-section animate-fade-in-up">
                        <h2 className="section-title">Organization Documents</h2>
                        <p className="section-desc">Key legal and operational documents governing our organization.</p>
                        {renderDocuments('organization')}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default DocumentsPage;
