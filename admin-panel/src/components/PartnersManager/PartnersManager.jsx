import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PartnersManager.css';

const PartnersManager = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if on add or edit page
    const isAddPage = location.pathname === '/admin/partners/add';
    const isEditMatch = location.pathname.match(/\/admin\/partners\/edit\/(.+)/);
    const editId = isEditMatch ? isEditMatch[1] : null;
    const isFormPage = isAddPage || !!editId;

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        websiteUrl: '',
        order: 0
    });
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [currentLogo, setCurrentLogo] = useState('');

    const fetchPartners = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://svssngo.onrender.com/api/partners');
            const data = await res.json();
            if (Array.isArray(data)) {
                setPartners(data);
            }
        } catch (err) {
            console.error('Failed to fetch partners', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    // Load partner if editing
    useEffect(() => {
        if (editId) {
            const partnerToEdit = partners.find(p => p._id === editId);
            if (partnerToEdit) {
                setFormData({
                    name: partnerToEdit.name || '',
                    websiteUrl: partnerToEdit.websiteUrl || '',
                    order: partnerToEdit.order !== undefined ? partnerToEdit.order : 0
                });
                setCurrentLogo(partnerToEdit.logo || '');
                setLogoPreview(partnerToEdit.logo ? (partnerToEdit.logo.startsWith('http') ? partnerToEdit.logo : `https://svssngo.onrender.com${partnerToEdit.logo}`) : '');
            } else {
                fetch(`https://svssngo.onrender.com/api/partners/${editId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.name) {
                            setFormData({
                                name: data.name || '',
                                websiteUrl: data.websiteUrl || '',
                                order: data.order !== undefined ? data.order : 0
                            });
                            setCurrentLogo(data.logo || '');
                            setLogoPreview(data.logo ? (data.logo.startsWith('http') ? data.logo : `https://svssngo.onrender.com${data.logo}`) : '');
                        }
                    })
                    .catch(console.error);
            }
        } else if (isAddPage) {
            setFormData({
                name: '',
                websiteUrl: '',
                order: partners.length + 1
            });
            setLogoFile(null);
            setLogoPreview('');
            setCurrentLogo('');
        }
    }, [editId, isAddPage, partners]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(editId ? 'Updating partner...' : 'Saving partner...');

        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('websiteUrl', formData.websiteUrl);
        submitData.append('order', formData.order);

        if (logoFile) {
            submitData.append('logo', logoFile);
        }

        try {
            const url = editId
                ? `https://svssngo.onrender.com/api/partners/${editId}`
                : 'https://svssngo.onrender.com/api/partners';
            const method = editId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: submitData
            });

            if (res.ok) {
                setStatus(editId ? 'Partner updated successfully!' : 'Partner added successfully!');
                await fetchPartners();
                setTimeout(() => {
                    setStatus('');
                    navigate('/admin/partners');
                }, 1000);
            } else {
                const errData = await res.json();
                setStatus(errData.message || 'Failed to save partner.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error connecting to server.');
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

        try {
            const res = await fetch(`https://svssngo.onrender.com/api/partners/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchPartners();
            } else {
                alert('Failed to delete partner.');
            }
        } catch (err) {
            console.error('Error deleting partner', err);
            alert('Error connecting to server.');
        }
    };

    if (isFormPage) {
        return (
            <div className="manager-container">
                <div className="manager-header">
                    <div className="manager-title-group">
                        <button
                            className="action-pill-btn secondary"
                            style={{ marginBottom: '8px' }}
                            onClick={() => navigate('/admin/partners')}
                        >
                            ← Back to Partners
                        </button>
                        <h2>{editId ? 'Edit Partner / Donor' : 'Add New Partner / Donor'}</h2>
                        <p>{editId ? 'Update organization details or logo' : 'Add a collaborating partner or institutional donor'}</p>
                    </div>
                </div>

                <div className="manager-card">
                    {/* Live Preview Box */}
                    <div className="partner-preview-card">
                        <div className="partner-preview-title">Partner Logo Preview</div>
                        <div className="partner-preview-logo-box">
                            {logoPreview ? (
                                <img src={logoPreview} alt="Preview" />
                            ) : (
                                <span style={{ color: '#9ca3af', fontSize: '12px' }}>No Logo Uploaded</span>
                            )}
                        </div>
                        <div className="partner-preview-name">
                            {formData.name || 'Organization Name'}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label>Organization / Partner Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. NABARD, UNICEF, Govt of Madhya Pradesh"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Display Priority / Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                    placeholder="1, 2, 3..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Official Website URL (Optional)</label>
                                <input
                                    type="url"
                                    value={formData.websiteUrl}
                                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                    placeholder="https://example.org"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Logo Image {editId ? '(Leave blank to keep existing)' : '*'}</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required={!editId && !currentLogo}
                            />
                            <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                                Recommended: High-resolution PNG or JPG with transparent or clean white background.
                            </small>
                        </div>

                        <div className="form-actions-bar">
                            <button type="submit" className="add-btn-gradient">
                                {editId ? 'Update Partner' : 'Save Partner'}
                            </button>
                            <button
                                type="button"
                                className="action-pill-btn secondary"
                                onClick={() => navigate('/admin/partners')}
                            >
                                Cancel
                            </button>
                        </div>

                        {status && <p className="status-msg">{status}</p>}
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="manager-container">
            {/* Header */}
            <div className="manager-header">
                <div className="manager-title-group">
                    <h2>Partners & Donors</h2>
                    <p>Manage funding organizations, government bodies, and institutional collaborators displayed on the website</p>
                </div>
                <button
                    className="add-btn-gradient"
                    onClick={() => navigate('/admin/partners/add')}
                >
                    + Add Partner / Donor
                </button>
            </div>

            {/* Table */}
            <div className="manager-card">
                {loading ? (
                    <div className="empty-table-state"><p>Loading partners & donors...</p></div>
                ) : partners.length === 0 ? (
                    <div className="empty-table-state">
                        <p>No partners found. Click "+ Add Partner / Donor" to create one.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>ORDER</th>
                                <th style={{ width: '130px' }}>LOGO</th>
                                <th>ORGANIZATION NAME</th>
                                <th style={{ width: '200px' }}>WEBSITE</th>
                                <th style={{ width: '150px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partners.map(p => (
                                <tr key={p._id}>
                                    <td>
                                        <span className="order-badge">#{p.order || 0}</span>
                                    </td>
                                    <td>
                                        <div className="partner-logo-cell">
                                            <img
                                                src={p.logo ? (p.logo.startsWith('http') ? p.logo : `https://svssngo.onrender.com${p.logo}`) : ''}
                                                alt={p.name}
                                                className="partner-logo-img"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="partner-name-cell">{p.name}</div>
                                    </td>
                                    <td>
                                        {p.websiteUrl ? (
                                            <a
                                                href={p.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="partner-website-link"
                                            >
                                                Visit ↗
                                            </a>
                                        ) : (
                                            <span style={{ color: '#9ca3af', fontSize: '13px' }}>—</span>
                                        )}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button
                                            className="action-pill-btn edit-btn"
                                            style={{ marginRight: '6px' }}
                                            onClick={() => navigate(`/admin/partners/edit/${p._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="action-pill-btn delete-btn"
                                            onClick={() => handleDelete(p._id, p.name)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PartnersManager;
