import React, { useState, useEffect } from 'react';
import './InquiriesManager.css';

const InquiriesManager = ({ token }) => {
    const [inquiries, setInquiries] = useState([]);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'contact', 'volunteer'
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/forms/inquiries', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                setInquiries(data);
            }
        } catch (err) {
            console.error('Failed to fetch inquiries', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/forms/inquiries/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchInquiries();
                if (selectedInquiry && selectedInquiry._id === id) {
                    setSelectedInquiry(null);
                }
            } else {
                alert('Failed to delete inquiry');
            }
        } catch (err) {
            alert('Error deleting inquiry');
        }
    };

    const contactInquiries = inquiries.filter(i => i.type === 'contact');
    const volunteerInquiries = inquiries.filter(i => i.type === 'volunteer');

    const displayedInquiries = activeTab === 'contact'
        ? contactInquiries
        : activeTab === 'volunteer'
            ? volunteerInquiries
            : inquiries;

    return (
        <div className="manager-container">
            {/* Filter Tabs */}
            <div className="manager-tabs">
                <button 
                    className={`manager-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Inquiries ({inquiries.length})
                </button>
                <button 
                    className={`manager-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contact')}
                >
                    Contact Messages ({contactInquiries.length})
                </button>
                <button 
                    className={`manager-tab-btn ${activeTab === 'volunteer' ? 'active' : ''}`}
                    onClick={() => setActiveTab('volunteer')}
                >
                    Volunteer Applications ({volunteerInquiries.length})
                </button>
            </div>

            {/* Section Header */}
            <div className="manager-header-actions">
                <div>
                    <h2 className="manager-section-title">Inquiries & Applications</h2>
                    <p className="manager-section-subtitle" style={{ marginTop: '4px' }}>
                        Submissions from the Contact Us and Volunteer forms
                    </p>
                </div>
                <button className="back-link-btn" onClick={fetchInquiries} style={{ margin: 0 }}>
                    ↻ Refresh
                </button>
            </div>

            {/* Table Display Card */}
            <div className="manager-list-card">
                {displayedInquiries.length === 0 ? (
                    <div className="empty-table-state">
                        <p>{loading ? 'Loading inquiries...' : 'No inquiries found in this category.'}</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '22%' }}>NAME & EMAIL</th>
                                <th style={{ width: '14%' }}>TYPE</th>
                                <th>SUBJECT / PREVIEW</th>
                                <th style={{ width: '16%' }}>ATTACHMENT</th>
                                <th style={{ width: '16%' }}>DATE</th>
                                <th style={{ width: '140px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedInquiries.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <div className="table-title-cell">{item.name}</div>
                                        <div style={{ fontSize: '12.5px', color: '#6b7280' }}>{item.email}</div>
                                    </td>
                                    <td>
                                        <span className={`table-badge ${item.type === 'volunteer' ? 'badge-completed' : 'badge-current'}`}>
                                            {item.type === 'volunteer' ? 'Volunteer' : 'Contact'}
                                        </span>
                                    </td>
                                    <td className="truncate-text">
                                        <strong style={{ color: '#111827' }}>{item.subject}</strong>
                                        {item.message ? ` — ${item.message}` : ''}
                                    </td>
                                    <td>
                                        {item.resume_file ? (
                                            <a 
                                                href={`http://localhost:5000${item.resume_file}`} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="action-pill-btn view"
                                            >
                                                📄 Resume
                                            </a>
                                        ) : item.resume_link ? (
                                            <a 
                                                href={item.resume_link} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="action-pill-btn view"
                                            >
                                                🔗 Link
                                            </a>
                                        ) : (
                                            <span className="no-file-text">None</span>
                                        )}
                                    </td>
                                    <td style={{ color: '#6b7280', fontSize: '13px' }}>
                                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="table-actions-cell">
                                            <button 
                                                className="action-pill-btn view"
                                                onClick={() => setSelectedInquiry(item)}
                                            >
                                                View
                                            </button>
                                            <button 
                                                className="action-pill-btn delete"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Inquiry Details Modal */}
            {selectedInquiry && (
                <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
                        <div className="modal-header">
                            <div>
                                <span className={`table-badge ${selectedInquiry.type === 'volunteer' ? 'badge-completed' : 'badge-current'}`} style={{ marginBottom: '8px' }}>
                                    {selectedInquiry.type === 'volunteer' ? 'Volunteer Application' : 'Contact Message'}
                                </span>
                                <h4>{selectedInquiry.subject || 'Inquiry Details'}</h4>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedInquiry(null)}>&times;</button>
                        </div>

                        <div className="inquiry-detail-body">
                            <div className="detail-row">
                                <span className="detail-label">Sender Name:</span>
                                <span className="detail-value">{selectedInquiry.name}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email:</span>
                                <a href={`mailto:${selectedInquiry.email}`} className="detail-value link">{selectedInquiry.email}</a>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Submitted On:</span>
                                <span className="detail-value">{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                            </div>

                            {selectedInquiry.type === 'volunteer' && (
                                <>
                                    {selectedInquiry.college_employer && (
                                        <div className="detail-row">
                                            <span className="detail-label">College / Employer:</span>
                                            <span className="detail-value">{selectedInquiry.college_employer}</span>
                                        </div>
                                    )}
                                    {selectedInquiry.recommender && (
                                        <div className="detail-row">
                                            <span className="detail-label">Recommender:</span>
                                            <span className="detail-value">{selectedInquiry.recommender}</span>
                                        </div>
                                    )}
                                    {selectedInquiry.resume_file && (
                                        <div className="detail-row">
                                            <span className="detail-label">Attached Resume:</span>
                                            <a 
                                                href={`http://localhost:5000${selectedInquiry.resume_file}`} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="action-pill-btn view"
                                            >
                                                Download File
                                            </a>
                                        </div>
                                    )}
                                    {selectedInquiry.resume_link && (
                                        <div className="detail-row">
                                            <span className="detail-label">Resume Link:</span>
                                            <a 
                                                href={selectedInquiry.resume_link} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="detail-value link"
                                            >
                                                {selectedInquiry.resume_link}
                                            </a>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="detail-message-box">
                                <label className="detail-label">
                                    {selectedInquiry.type === 'volunteer' ? 'Statement of Purpose:' : 'Message:'}
                                </label>
                                <p className="detail-message-text">{selectedInquiry.message || '(No message provided)'}</p>
                            </div>

                            <div className="form-actions-bar" style={{ marginTop: '24px' }}>
                                <a 
                                    href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                                    className="add-btn-gradient"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Reply via Email
                                </a>
                                <button 
                                    type="button" 
                                    className="action-pill-btn secondary"
                                    onClick={() => setSelectedInquiry(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InquiriesManager;
