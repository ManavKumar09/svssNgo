import React, { useState, useEffect } from 'react';
import './MilestonesManager.css';

const defaultMilestonesData = {
    subtitle: 'OUR JOURNEY',
    title: 'Milestones along the way',
    milestones: [
        {
            year: '1988',
            text: 'SVSS founded in Bhopal with young community groups for grass-root development.'
        },
        {
            year: '1990s',
            text: '12A & 80G registrations. First audited annual reports.'
        },
        {
            year: '1995',
            text: 'FCRA registration — opened the door to international funding partners.'
        },
        {
            year: '2005',
            text: 'Launch of Radio Awaz 91.2 MHz FM — the SVSS community radio station.'
        },
        {
            year: '2010s',
            text: 'Major scale-up with NHM, NABARD, UNICEF, WFP and Childline India partnerships.'
        },
        {
            year: '2024',
            text: '12 fields of work, 2.5 lakh+ community members engaged, 3.5 lakh+ adolescents reached.'
        }
    ]
};

const MilestonesManager = ({ token }) => {
    const [formData, setFormData] = useState(defaultMilestonesData);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newText, setNewText] = useState('');

    const fetchMilestones = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://svssngo.onrender.com/api/milestones');
            if (res.ok) {
                const data = await res.json();
                if (data && Array.isArray(data.milestones)) {
                    setFormData(data);
                }
            }
        } catch (err) {
            console.error('Failed to fetch milestones', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMilestones();
    }, []);

    const handleItemChange = (index, field, value) => {
        const updated = [...(formData.milestones || [])];
        updated[index] = {
            ...updated[index],
            [field]: value
        };
        setFormData({ ...formData, milestones: updated });
    };

    const handleDelete = (index) => {
        const updated = formData.milestones.filter((_, idx) => idx !== index);
        setFormData({ ...formData, milestones: updated });
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const updated = [...formData.milestones];
        const temp = updated[index - 1];
        updated[index - 1] = updated[index];
        updated[index] = temp;
        setFormData({ ...formData, milestones: updated });
    };

    const handleMoveDown = (index) => {
        if (index === formData.milestones.length - 1) return;
        const updated = [...formData.milestones];
        const temp = updated[index + 1];
        updated[index + 1] = updated[index];
        updated[index] = temp;
        setFormData({ ...formData, milestones: updated });
    };

    const handleAddMilestone = (e) => {
        e.preventDefault();
        if (!newYear.trim() || !newText.trim()) return;

        const newItem = {
            year: newYear.trim(),
            text: newText.trim()
        };

        setFormData({
            ...formData,
            milestones: [...(formData.milestones || []), newItem]
        });

        setNewYear('');
        setNewText('');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus('Saving milestones...');

        try {
            const res = await fetch('https://svssngo.onrender.com/api/milestones', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(data);
                setStatus('Milestones updated successfully!');
                setTimeout(() => setStatus(''), 3000);
            } else {
                const errData = await res.json().catch(() => ({}));
                setStatus(errData.message || 'Failed to update milestones.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error connecting to server.');
        }
    };

    if (loading) {
        return (
            <div className="manager-container">
                <p style={{ padding: '30px', color: '#6b7280' }}>Loading milestones...</p>
            </div>
        );
    }

    const list = formData.milestones || [];

    return (
        <div className="manager-container">
            {/* Header */}
            <div className="manager-header-actions">
                <div>
                    <h2 className="manager-section-title">About Us Milestones Manager</h2>
                    <p className="manager-section-subtitle">
                        Customize the historical timeline, achievements, and foundation milestones displayed on the About Us page.
                    </p>
                </div>
            </div>

            {/* Live Visual Timeline Preview */}
            <div className="milestones-preview-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                        🚩 Live About Us Timeline Preview
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{list.length} Milestones Recorded</span>
                </div>

                <div className="preview-timeline-container">
                    <div className="preview-subtitle">{formData.subtitle || 'OUR JOURNEY'}</div>
                    <div className="preview-title">{formData.title || 'Milestones along the way'}</div>

                    <div className="preview-timeline-track">
                        {list.map((m, idx) => (
                            <div key={idx} className="preview-timeline-item">
                                <div className="preview-dot"></div>
                                <div className="preview-content">
                                    <span className="preview-year">{m.year}</span>
                                    <p className="preview-text">{m.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave}>
                {/* Section Header Settings */}
                <div className="manager-form-card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                        1. Section Headers
                    </h3>

                    <div className="form-row">
                        <div className="form-group" style={{ flex: '1' }}>
                            <label>Section Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                placeholder="OUR JOURNEY"
                            />
                        </div>
                        <div className="form-group" style={{ flex: '2' }}>
                            <label>Section Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Milestones along the way"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Milestones List Card */}
                <div className="manager-form-card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                        2. Manage Timeline Milestones ({list.length} Items)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                        Add, edit, reorder or remove historical milestones on the journey.
                    </p>

                    {/* Add Milestone Form */}
                    <div className="add-milestone-box">
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '10px' }}>
                            + Add New Milestone Entry
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <input
                                type="text"
                                value={newYear}
                                onChange={(e) => setNewYear(e.target.value)}
                                placeholder="Year (e.g. 2026)"
                                style={{ width: '140px' }}
                            />
                            <textarea
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                placeholder="Milestone description..."
                                rows="2"
                                style={{ flex: 1, minWidth: '220px' }}
                            ></textarea>
                            <button
                                type="button"
                                className="add-btn-gradient"
                                onClick={handleAddMilestone}
                                style={{ padding: '10px 20px', alignSelf: 'center' }}
                            >
                                + Add Milestone
                            </button>
                        </div>
                    </div>

                    {/* Milestone Cards List */}
                    <div className="milestones-list-grid">
                        {list.map((item, index) => (
                            <div className="milestone-item-card" key={index}>
                                <div className="milestone-card-top">
                                    <div className="milestone-badge">
                                        <span className="milestone-num">#{index + 1}</span>
                                        <span className="milestone-year-pill">{item.year || 'Year'}</span>
                                    </div>
                                    <div className="milestone-card-actions">
                                        <button
                                            type="button"
                                            className="move-btn"
                                            onClick={() => handleMoveUp(index)}
                                            disabled={index === 0}
                                            title="Move Up"
                                        >
                                            ▲
                                        </button>
                                        <button
                                            type="button"
                                            className="move-btn"
                                            onClick={() => handleMoveDown(index)}
                                            disabled={index === list.length - 1}
                                            title="Move Down"
                                        >
                                            ▼
                                        </button>
                                        <button
                                            type="button"
                                            className="delete-milestone-btn"
                                            onClick={() => handleDelete(index)}
                                            title="Delete Milestone"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '10px' }}>
                                    <label style={{ fontSize: '12px' }}>Year / Era Label</label>
                                    <input
                                        type="text"
                                        value={item.year}
                                        onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                                        placeholder="e.g. 1995 or 2010s"
                                        required
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: '0' }}>
                                    <label style={{ fontSize: '12px' }}>Milestone Text &amp; Details</label>
                                    <textarea
                                        rows="2"
                                        value={item.text}
                                        onChange={(e) => handleItemChange(index, 'text', e.target.value)}
                                        placeholder="Description of milestone achievement..."
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Actions */}
                <div className="form-actions-bar" style={{ marginTop: '20px' }}>
                    <button type="submit" className="add-btn-gradient" style={{ minWidth: '180px' }}>
                        Save All Changes
                    </button>
                </div>

                {status && (
                    <div style={{
                        marginTop: '16px',
                        padding: '12px 18px',
                        borderRadius: '8px',
                        background: status.includes('success') ? '#ecfdf5' : '#fef2f2',
                        color: status.includes('success') ? '#047857' : '#b91c1c',
                        border: `1px solid ${status.includes('success') ? '#a7f3d0' : '#fecaca'}`
                    }}>
                        {status}
                    </div>
                )}
            </form>
        </div>
    );
};

export default MilestonesManager;
