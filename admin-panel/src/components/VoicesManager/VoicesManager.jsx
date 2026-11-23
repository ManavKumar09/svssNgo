import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './VoicesManager.css';

const VoicesManager = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if on add or edit page
    const isAddPage = location.pathname === '/admin/voices/add';
    const isEditMatch = location.pathname.match(/\/admin\/voices\/edit\/(.+)/);
    const editId = isEditMatch ? isEditMatch[1] : null;
    const isFormPage = isAddPage || !!editId;

    const [voices, setVoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        quote: '',
        author: '',
        title: '',
        order: 0
    });

    const fetchVoices = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/voices');
            const data = await res.json();
            if (Array.isArray(data)) {
                setVoices(data);
            }
        } catch (err) {
            console.error('Failed to fetch voices', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVoices();
    }, []);

    // Load voice if editing
    useEffect(() => {
        if (editId) {
            const voiceToEdit = voices.find(v => v._id === editId);
            if (voiceToEdit) {
                setFormData({
                    quote: voiceToEdit.quote || '',
                    author: voiceToEdit.author || '',
                    title: voiceToEdit.title || '',
                    order: voiceToEdit.order !== undefined ? voiceToEdit.order : 0
                });
            } else {
                fetch(`http://localhost:5000/api/voices/${editId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.quote) {
                            setFormData({
                                quote: data.quote || '',
                                author: data.author || '',
                                title: data.title || '',
                                order: data.order !== undefined ? data.order : 0
                            });
                        }
                    })
                    .catch(console.error);
            }
        } else if (isAddPage) {
            setFormData({
                quote: '',
                author: '',
                title: '',
                order: voices.length + 1
            });
        }
    }, [editId, isAddPage, voices]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(editId ? 'Updating voice...' : 'Saving voice...');

        const payload = {
            quote: formData.quote.trim(),
            author: formData.author.trim(),
            title: formData.title.trim(),
            order: Number(formData.order)
        };

        try {
            const url = editId
                ? `http://localhost:5000/api/voices/${editId}`
                : 'http://localhost:5000/api/voices';
            const method = editId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus(editId ? 'Voice updated successfully!' : 'Voice added successfully!');
                await fetchVoices();
                setTimeout(() => {
                    setStatus('');
                    navigate('/admin/voices');
                }, 1000);
            } else {
                const errData = await res.json();
                setStatus(errData.message || 'Failed to save voice.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error connecting to server.');
        }
    };

    const handleDelete = async (id, author) => {
        if (!window.confirm(`Are you sure you want to delete the quote from "${author}"?`)) return;

        try {
            const res = await fetch(`http://localhost:5000/api/voices/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchVoices();
            } else {
                alert('Failed to delete voice.');
            }
        } catch (err) {
            console.error('Error deleting voice', err);
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
                            onClick={() => navigate('/admin/voices')}
                        >
                            ← Back to Voices
                        </button>
                        <h2>{editId ? 'Edit Community Voice' : 'Add New Community Voice'}</h2>
                        <p>{editId ? 'Update testimonial quote or beneficiary details' : 'Add a quote or feedback from community members, beneficiaries, or partners'}</p>
                    </div>
                </div>

                <div className="manager-card">
                    {/* Live Preview Card */}
                    <div className="voice-live-card-preview">
                        <div className="voice-live-card-title">Real-Time Website Card Preview</div>
                        <div className="voice-card-simulation">
                            <p className="voice-card-simulation-quote">
                                "{formData.quote || 'Radio Awaz aur SVSS ki didi-bhaiyon ne humein swasthya aur paisa dono ki samajh di. Aaj humara ghar khud chal raha hai.'}"
                            </p>
                            <div className="voice-card-simulation-author">
                                <span className="sim-name">{formData.author || 'Author Name'}</span>
                                <span className="sim-title"> · {formData.title || 'Role & Location'}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label>Quote / Testimonial Story *</label>
                            <textarea
                                rows="4"
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                placeholder="Enter what the beneficiary or partner said about SVSS..."
                                required
                            ></textarea>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Author / Speaker Name *</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="e.g. Lata Devi or Block Health Officer"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Role / Title & Location *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. SHG Member, Sehore or NHM, Madhya Pradesh"
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ maxWidth: '140px' }}>
                                <label>Display Priority</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                    placeholder="1, 2, 3..."
                                />
                            </div>
                        </div>

                        <div className="form-actions-bar">
                            <button type="submit" className="add-btn-gradient">
                                {editId ? 'Update Voice' : 'Save Voice'}
                            </button>
                            <button
                                type="button"
                                className="action-pill-btn secondary"
                                onClick={() => navigate('/admin/voices')}
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
                    <h2>Voices & Testimonials</h2>
                    <p>Manage quotes, beneficiary stories, and partner endorsements showcased on the homepage</p>
                </div>
                <button
                    className="add-btn-gradient"
                    onClick={() => navigate('/admin/voices/add')}
                >
                    + Add New Voice
                </button>
            </div>

            {/* Table */}
            <div className="manager-card">
                {loading ? (
                    <div className="empty-table-state"><p>Loading voices & testimonials...</p></div>
                ) : voices.length === 0 ? (
                    <div className="empty-table-state">
                        <p>No community voices found. Click "+ Add New Voice" to create one.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>ORDER</th>
                                <th>QUOTE / STORY</th>
                                <th style={{ width: '180px' }}>AUTHOR</th>
                                <th style={{ width: '220px' }}>ROLE & LOCATION</th>
                                <th style={{ width: '150px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {voices.map(v => (
                                <tr key={v._id}>
                                    <td>
                                        <span className="order-badge">#{v.order || 0}</span>
                                    </td>
                                    <td>
                                        <div className="voice-quote-cell">
                                            "{v.quote}"
                                        </div>
                                    </td>
                                    <td>
                                        <div className="voice-author-cell">{v.author}</div>
                                    </td>
                                    <td>
                                        <div className="voice-title-cell">{v.title}</div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button
                                            className="action-pill-btn edit-btn"
                                            style={{ marginRight: '6px' }}
                                            onClick={() => navigate(`/admin/voices/edit/${v._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="action-pill-btn delete-btn"
                                            onClick={() => handleDelete(v._id, v.author)}
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

export default VoicesManager;
