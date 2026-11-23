import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PoliciesManager.css';

const PoliciesManager = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAddPage = location.pathname === '/admin/documents/add';

    const [policies, setPolicies] = useState([]);
    const [formData, setFormData] = useState({ title: '', content: '', category: 'annual' });
    const [documentFile, setDocumentFile] = useState(null);
    const [status, setStatus] = useState('');

    // UI State
    const [activeTab, setActiveTab] = useState('annual');

    const fetchPolicies = async () => {
        try {
            const res = await fetch('https://svssngo.onrender.com/api/policies');
            const data = await res.json();
            setPolicies(data);
        } catch (err) {
            console.error('Failed to fetch policies', err);
        }
    };

    useEffect(() => {
        fetchPolicies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Uploading document...');
        
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('content', formData.content);
        submitData.append('category', formData.category);
        
        if (documentFile) {
            submitData.append('document', documentFile);
        }

        try {
            const res = await fetch('https://svssngo.onrender.com/api/policies', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: submitData
            });

            if (res.ok) {
                setStatus('Document added successfully!');
                setFormData({ title: '', content: '', category: formData.category });
                setDocumentFile(null);
                fetchPolicies();
                setTimeout(() => {
                    setStatus('');
                    navigate('/admin/documents'); // Go back to documents list page
                }, 1200);
            } else {
                setStatus('Failed to add document.');
            }
        } catch (err) {
            setStatus('Error connecting to server.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        
        try {
            const res = await fetch(`https://svssngo.onrender.com/api/policies/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchPolicies();
            } else {
                alert('Failed to delete document');
            }
        } catch (err) {
            alert('Error deleting document');
        }
    };

    const annualPolicies = policies.filter(p => p.category === 'annual');
    const auditPolicies = policies.filter(p => p.category === 'audit');
    const orgPolicies = policies.filter(p => p.category === 'organization');
    const policyDocs = policies.filter(p => p.category === 'policy');

    const getDisplayedPolicies = () => {
        switch(activeTab) {
            case 'annual': return annualPolicies;
            case 'audit': return auditPolicies;
            case 'organization': return orgPolicies;
            case 'policy': return policyDocs;
            default: return [];
        }
    };

    // Dedicated Add Document Page View
    if (isAddPage) {
        return (
            <div className="manager-container">
                <div className="page-header-actions">
                    <button className="back-link-btn" onClick={() => navigate('/admin/documents')}>
                        <span className="back-arrow">←</span> Back to Documents
                    </button>
                    <h2 className="manager-section-title">Add New Document</h2>
                    <p className="manager-section-subtitle">Upload official reports, audit statements, policies, or organizational records.</p>
                </div>

                <div className="manager-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Document Title *</label>
                            <input 
                                type="text" 
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                placeholder="e.g. Annual Report 2023-2024" 
                                required 
                            />
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Category *</label>
                                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                                    <option value="annual">Annual Document</option>
                                    <option value="audit">Audit Document</option>
                                    <option value="organization">Organization Document</option>
                                    <option value="policy">Policy</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Upload File (PDF / Word) *</label>
                                <input 
                                    type="file" 
                                    onChange={(e) => setDocumentFile(e.target.files[0])} 
                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description / Notes (Optional)</label>
                            <textarea 
                                value={formData.content} 
                                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                                rows="5" 
                                placeholder="Enter any relevant background, description, or notes regarding this document..."
                            ></textarea>
                        </div>

                        <div className="form-actions-bar">
                            <button type="submit" className="add-btn-gradient">
                                Save Document
                            </button>
                            <button type="button" className="action-pill-btn secondary" onClick={() => navigate('/admin/documents')}>
                                Cancel
                            </button>
                        </div>

                        {status && <p className="status-msg">{status}</p>}
                    </form>
                </div>
            </div>
        );
    }

    const renderPoliciesTable = (policyList) => {
        if (policyList.length === 0) {
            return (
                <div className="empty-table-state">
                    <p>No documents found in this category.</p>
                </div>
            );
        }

        return (
            <table className="admin-table">
                <thead>
                    <tr>
                        <th style={{ width: '45%' }}>TITLE</th>
                        <th style={{ width: '25%' }}>DOCUMENT FILE</th>
                        <th style={{ width: '120px', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {policyList.map(p => (
                        <tr key={p._id}>
                            <td className="table-title-cell">{p.title}</td>
                            <td>
                                {p.document ? (
                                    <a 
                                        href={`https://svssngo.onrender.com${p.document}`} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="action-pill-btn view"
                                    >
                                        View File
                                    </a>
                                ) : (
                                    <span className="no-file-text">No file attached</span>
                                )}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <div className="table-actions-cell">
                                    <button className="action-pill-btn delete" onClick={() => handleDelete(p._id)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="manager-container">
            {/* Category Pill Tabs */}
            <div className="manager-tabs">
                <button 
                    className={`manager-tab-btn ${activeTab === 'annual' ? 'active' : ''}`}
                    onClick={() => setActiveTab('annual')}
                >
                    Annual ({annualPolicies.length})
                </button>
                <button 
                    className={`manager-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
                    onClick={() => setActiveTab('audit')}
                >
                    Audit ({auditPolicies.length})
                </button>
                <button 
                    className={`manager-tab-btn ${activeTab === 'organization' ? 'active' : ''}`}
                    onClick={() => setActiveTab('organization')}
                >
                    Organization ({orgPolicies.length})
                </button>
                <button 
                    className={`manager-tab-btn ${activeTab === 'policy' ? 'active' : ''}`}
                    onClick={() => setActiveTab('policy')}
                >
                    Policies ({policyDocs.length})
                </button>
            </div>

            {/* Section Header */}
            <div className="manager-header-actions">
                <h2 className="manager-section-title">Documents</h2>
                <button className="add-btn-gradient" onClick={() => navigate('/admin/documents/add')}>
                    + ADD DOCUMENT
                </button>
            </div>

            {/* Table Display Card */}
            <div className="manager-list-card">
                {renderPoliciesTable(getDisplayedPolicies())}
            </div>
        </div>
    );
};

export default PoliciesManager;
