import React, { useState, useEffect } from 'react';
import './ActivitiesManager.css';

const defaultGraphData = {
    subheading: 'BENEFICIARIES COVERED',
    heading: 'Transforming lives across project communities.',
    description: 'Every woman in an SHG, child in learning centers, farmer adopting sustainable practices, and community member reached — counted, audited and reported. Open the dashboard for the full breakdown.',
    linkText: 'Open dashboard',
    linkUrl: '/documents',
    yearlyData: [
        { year: '2019', activities: 4800 },
        { year: '2020', activities: 6200 },
        { year: '2021', activities: 8500 },
        { year: '2022', activities: 14200 },
        { year: '2023', activities: 21800 },
        { year: '2024', activities: 29500 },
        { year: '2025', activities: 38000 }
    ]
};

const ActivitiesManager = ({ token }) => {
    const [formData, setFormData] = useState(defaultGraphData);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newActivities, setNewActivities] = useState('');

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/activities');
            if (res.ok) {
                const data = await res.json();
                if (data && Array.isArray(data.yearlyData)) {
                    setFormData(data);
                }
            }
        } catch (err) {
            console.error('Failed to fetch beneficiary graph data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    // Summary calculations
    const totalBeneficiaries = (formData.yearlyData || []).reduce((sum, item) => sum + (Number(item.activities || item.beneficiaries) || 0), 0);
    const totalYears = (formData.yearlyData || []).length;
    const maxVal = Math.max(...(formData.yearlyData || []).map(d => Number(d.activities || d.beneficiaries) || 0), 10);

    const handleAutoGenerateHeading = () => {
        setFormData({
            ...formData,
            heading: `${totalBeneficiaries.toLocaleString('en-IN')} beneficiaries covered across ${totalYears} years.`
        });
    };

    const handleYearChange = (index, field, value) => {
        const updated = [...(formData.yearlyData || [])];
        updated[index] = {
            ...updated[index],
            [field]: field === 'activities' ? (value === '' ? '' : Number(value)) : value
        };
        setFormData({ ...formData, yearlyData: updated });
    };

    const handleDeleteYear = (index) => {
        const updated = formData.yearlyData.filter((_, idx) => idx !== index);
        setFormData({ ...formData, yearlyData: updated });
    };

    const handleAddYear = (e) => {
        e.preventDefault();
        if (!newYear.trim()) return;

        const newItem = {
            year: newYear.trim(),
            activities: Number(newActivities) || 0
        };

        const updated = [...(formData.yearlyData || []), newItem];
        // Sort chronologically if numeric
        updated.sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));

        setFormData({ ...formData, yearlyData: updated });
        setNewYear('');
        setNewActivities('');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus('Saving beneficiary graph settings...');

        try {
            const res = await fetch('http://localhost:5000/api/activities', {
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
                setStatus('Beneficiary graph updated successfully!');
                setTimeout(() => setStatus(''), 3000);
            } else {
                const errData = await res.json().catch(() => ({}));
                setStatus(errData.message || 'Failed to update beneficiary graph.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error connecting to server.');
        }
    };

    if (loading) {
        return <div className="manager-container"><p style={{ padding: '30px' }}>Loading beneficiary graph...</p></div>;
    }

    return (
        <div className="manager-container">
            {/* Header */}
            <div className="manager-header-actions">
                <div>
                    <h2 className="manager-section-title">Beneficiaries Covered Graph</h2>
                    <p className="manager-section-subtitle">
                        Control the yearly beneficiary coverage chart, headings, descriptions, and Y-axis statistics displayed on the frontend homepage.
                    </p>
                </div>
            </div>

            {/* Summary Metrics */}
            <div className="summary-badges-bar">
                <div className="summary-badge">
                    <span className="summary-badge-val">{totalBeneficiaries.toLocaleString('en-IN')}</span>
                    <span className="summary-badge-label">Total Beneficiaries Covered</span>
                </div>
                <div className="summary-badge">
                    <span className="summary-badge-val">{totalYears}</span>
                    <span className="summary-badge-label">Years of Tracked Data</span>
                </div>
                <div className="summary-badge">
                    <span className="summary-badge-val">{maxVal.toLocaleString('en-IN')}</span>
                    <span className="summary-badge-label">Peak Yearly Beneficiaries</span>
                </div>
            </div>

            {/* Live Visual Preview */}
            <div className="activities-preview-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                        📊 Live Frontend Chart Preview
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Interactive Preview</span>
                </div>

                <div className="preview-chart-wrapper">
                    <div className="preview-chart-title-area">
                        <div className="preview-chart-subheading">{formData.subheading || 'BENEFICIARIES COVERED'}</div>
                        <div className="preview-chart-heading">{formData.heading || 'Heading'}</div>
                        <div className="preview-chart-desc">{formData.description || 'Description'}</div>
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#d97706', textTransform: 'uppercase', marginBottom: '8px' }}>
                        Y-Axis: Beneficiaries Covered under the Project
                    </div>

                    <div className="preview-bars-container">
                        {(formData.yearlyData || []).map((item, idx) => {
                            const val = Number(item.activities || item.beneficiaries || 0);
                            const pct = maxVal > 0 ? Math.min(100, Math.max(8, (val / maxVal) * 100)) : 0;
                            return (
                                <div className="preview-bar-col" key={idx}>
                                    <div className="preview-bar-fill" style={{ height: `${pct}%` }}>
                                        <span className="preview-bar-val">{val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}</span>
                                    </div>
                                    <span className="preview-bar-label">{item.year}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave}>
                {/* Text & Content Settings Card */}
                <div className="manager-form-card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                        1. Section Headers & Text Content
                    </h3>

                    <div className="form-row">
                        <div className="form-group" style={{ flex: '1' }}>
                            <label>Subheading Label</label>
                            <input 
                                type="text"
                                value={formData.subheading}
                                onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                                placeholder="BENEFICIARIES COVERED"
                            />
                        </div>
                        <div className="form-group" style={{ flex: '1' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label>Main Heading</label>
                                <button 
                                    type="button" 
                                    onClick={handleAutoGenerateHeading}
                                    style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        color: '#059669', 
                                        fontSize: '12px', 
                                        fontWeight: '600', 
                                        cursor: 'pointer',
                                        textDecoration: 'underline' 
                                    }}
                                >
                                    ⚡ Auto-calculate from data
                                </button>
                            </div>
                            <input 
                                type="text"
                                value={formData.heading}
                                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                                placeholder="Transforming lives across project communities."
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Description Paragraph</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows="3"
                            placeholder="Every woman in an SHG, child in learning centers, farmer adopting sustainable practices, and community member reached..."
                        ></textarea>
                    </div>
                </div>

                {/* Yearly Data Points Card */}
                <div className="manager-form-card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                                2. Manage Yearly Beneficiary Data ({totalYears} Years)
                            </h3>
                            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                                Edit beneficiary numbers directly or delete/add new years to the chart (X-axis: Year, Y-axis: Beneficiaries Covered).
                            </p>
                        </div>
                    </div>

                    {/* Add New Year Bar Form */}
                    <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #cbd5e1' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '10px' }}>
                            + Add New Year Beneficiary Data Point
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <input 
                                type="text"
                                value={newYear}
                                onChange={(e) => setNewYear(e.target.value)}
                                placeholder="Year (e.g. 2026)"
                                style={{ flex: '1', minWidth: '130px' }}
                            />
                            <input 
                                type="number"
                                value={newActivities}
                                onChange={(e) => setNewActivities(e.target.value)}
                                placeholder="Beneficiaries Covered (e.g. 35000)"
                                style={{ flex: '1', minWidth: '180px' }}
                            />
                            <button 
                                type="button" 
                                className="add-btn-gradient" 
                                onClick={handleAddYear}
                                style={{ padding: '10px 20px' }}
                            >
                                + Add Data Point
                            </button>
                        </div>
                    </div>

                    {/* Yearly Data Grid */}
                    <div className="years-grid">
                        {(formData.yearlyData || []).map((item, index) => (
                            <div className="year-input-card" key={index}>
                                <div className="year-card-header">
                                    <span className="year-card-title">📅 Year Bar #{index + 1}</span>
                                    <button 
                                        type="button" 
                                        className="delete-year-btn"
                                        onClick={() => handleDeleteYear(index)}
                                        title="Delete Year"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="form-group" style={{ marginBottom: '10px' }}>
                                    <label style={{ fontSize: '12px' }}>X-Axis Year Label</label>
                                    <input 
                                        type="text"
                                        value={item.year}
                                        onChange={(e) => handleYearChange(index, 'year', e.target.value)}
                                        placeholder="Year"
                                        required
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '0' }}>
                                    <label style={{ fontSize: '12px' }}>Beneficiaries Covered (Y-Axis)</label>
                                    <input 
                                        type="number"
                                        value={item.activities}
                                        onChange={(e) => handleYearChange(index, 'activities', e.target.value)}
                                        placeholder="0"
                                        min="0"
                                        required
                                    />
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
                    <div style={{ marginTop: '16px', padding: '12px 18px', borderRadius: '8px', background: status.includes('success') ? '#ecfdf5' : '#fef2f2', color: status.includes('success') ? '#047857' : '#b91c1c', border: `1px solid ${status.includes('success') ? '#a7f3d0' : '#fecaca'}` }}>
                        {status}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ActivitiesManager;
