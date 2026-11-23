import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StatsManager.css';

const StatsManager = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if on add or edit page
    const isAddPage = location.pathname === '/admin/stats/add';
    const isEditMatch = location.pathname.match(/\/admin\/stats\/edit\/(.+)/);
    const editId = isEditMatch ? isEditMatch[1] : null;
    const isFormPage = isAddPage || !!editId;

    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        label: '',
        number: '',
        suffix: '+',
        order: 0
    });

    const formatIndianNumber = (num) => {
        if (num === '' || isNaN(num)) return '0';
        return Number(num).toLocaleString('en-IN');
    };

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://svssngo.onrender.com/api/stats');
            const data = await res.json();
            if (Array.isArray(data)) {
                setStats(data);
            }
        } catch (err) {
            console.error('Failed to fetch stats', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    // Load stat if editing
    useEffect(() => {
        if (editId) {
            const statToEdit = stats.find(s => s._id === editId);
            if (statToEdit) {
                setFormData({
                    label: statToEdit.label || '',
                    number: statToEdit.number !== undefined ? statToEdit.number : '',
                    suffix: statToEdit.suffix !== undefined ? statToEdit.suffix : '+',
                    order: statToEdit.order !== undefined ? statToEdit.order : 0
                });
            } else {
                fetch(`https://svssngo.onrender.com/api/stats/${editId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.label) {
                            setFormData({
                                label: data.label || '',
                                number: data.number !== undefined ? data.number : '',
                                suffix: data.suffix !== undefined ? data.suffix : '+',
                                order: data.order !== undefined ? data.order : 0
                            });
                        }
                    })
                    .catch(console.error);
            }
        } else if (isAddPage) {
            setFormData({
                label: '',
                number: '',
                suffix: '+',
                order: stats.length + 1
            });
        }
    }, [editId, isAddPage, stats]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(editId ? 'Updating stat...' : 'Saving stat...');

        const payload = {
            label: formData.label,
            number: Number(formData.number),
            suffix: formData.suffix,
            order: Number(formData.order)
        };

        try {
            const url = editId 
                ? `https://svssngo.onrender.com/api/stats/${editId}` 
                : 'https://svssngo.onrender.com/api/stats';
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
                setStatus(editId ? 'Stat updated successfully!' : 'Stat added successfully!');
                await fetchStats();
                setTimeout(() => {
                    setStatus('');
                    navigate('/admin/stats');
                }, 1000);
            } else {
                const errData = await res.json();
                setStatus(errData.message || 'Failed to save stat.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error connecting to server.');
        }
    };

    const handleDelete = async (id, label) => {
        if (!window.confirm(`Are you sure you want to delete the stat: "${label}"?`)) return;

        try {
            const res = await fetch(`https://svssngo.onrender.com/api/stats/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchStats();
            } else {
                alert('Failed to delete stat.');
            }
        } catch (err) {
            console.error('Error deleting stat', err);
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
                            onClick={() => navigate('/admin/stats')}
                        >
                            ← Back to Stats
                        </button>
                        <h2>{editId ? 'Edit Impact Stat Counter' : 'Add New Impact Stat Counter'}</h2>
                        <p>{editId ? 'Update the counter number or metric description' : 'Create a new counter metric for the homepage impact section'}</p>
                    </div>
                </div>

                <div className="manager-card">
                    {/* Live Preview Card */}
                    <div className="stats-live-card-preview">
                        <div className="stats-live-card-preview-title">Real-Time Homepage Preview</div>
                        <div className="stats-live-preview-box">
                            <div className="preview-huge-number">
                                {formatIndianNumber(formData.number)}{formData.suffix}
                            </div>
                            <div className="preview-huge-label">
                                {formData.label || 'METRIC LABEL PREVIEW'}
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label>Metric Label / Title *</label>
                            <input 
                                type="text" 
                                value={formData.label} 
                                onChange={(e) => setFormData({...formData, label: e.target.value})} 
                                placeholder="e.g. ADOLESCENTS REACHED ON SRH"
                                required 
                            />
                            <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                                Appears under the large counter number on the homepage.
                            </small>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Target Count Number *</label>
                                <input 
                                    type="number" 
                                    value={formData.number} 
                                    onChange={(e) => setFormData({...formData, number: e.target.value})} 
                                    placeholder="e.g. 350000"
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Suffix</label>
                                <input 
                                    type="text" 
                                    value={formData.suffix} 
                                    onChange={(e) => setFormData({...formData, suffix: e.target.value})} 
                                    placeholder="e.g. + or %" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Display Order</label>
                                <input 
                                    type="number" 
                                    value={formData.order} 
                                    onChange={(e) => setFormData({...formData, order: e.target.value})} 
                                    placeholder="1, 2, 3..." 
                                />
                            </div>
                        </div>

                        <div className="form-actions-bar">
                            <button type="submit" className="add-btn-gradient">
                                {editId ? 'Update Stat' : 'Save Stat'}
                            </button>
                            <button 
                                type="button" 
                                className="action-pill-btn secondary" 
                                onClick={() => navigate('/admin/stats')}
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
            <div className="manager-header">
                <div className="manager-title-group">
                    <h2>Impact Stats Counter</h2>
                    <p>Manage the animated milestone numbers and metrics showcased on the website homepage</p>
                </div>
                <button 
                    className="add-btn-gradient"
                    onClick={() => navigate('/admin/stats/add')}
                >
                    + Add New Stat
                </button>
            </div>

            <div className="manager-card">
                {loading ? (
                    <div className="empty-table-state"><p>Loading impact stats...</p></div>
                ) : stats.length === 0 ? (
                    <div className="empty-table-state">
                        <p>No impact stats found. Click "+ Add New Stat" to create one.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>ORDER</th>
                                <th style={{ width: '220px' }}>METRIC NUMBER</th>
                                <th>LABEL / DESCRIPTION</th>
                                <th style={{ width: '240px' }}>LIVE CARD PREVIEW</th>
                                <th style={{ width: '150px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map(s => (
                                <tr key={s._id}>
                                    <td>
                                        <span className="order-badge">#{s.order || 0}</span>
                                    </td>
                                    <td>
                                        <div className="stats-counter-cell">
                                            <span className="stats-number-display">
                                                {formatIndianNumber(s.number)}
                                            </span>
                                            <span className="stats-suffix-display">{s.suffix}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="stats-label-cell">{s.label}</div>
                                    </td>
                                    <td>
                                        <div className="stats-preview-badge">
                                            <div className="stats-preview-num">
                                                {formatIndianNumber(s.number)}{s.suffix}
                                            </div>
                                            <div className="stats-preview-lbl">
                                                {s.label}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button 
                                            className="action-pill-btn edit-btn" 
                                            style={{ marginRight: '6px' }}
                                            onClick={() => navigate(`/admin/stats/edit/${s._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="action-pill-btn delete-btn" 
                                            onClick={() => handleDelete(s._id, s.label)}
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

export default StatsManager;
