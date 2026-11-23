import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HeroManager.css';

const HeroManager = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAddPage = location.pathname === '/admin/hero/add';
    const isEditMatch = location.pathname.match(/\/admin\/hero\/edit\/(.+)/);
    const editId = isEditMatch ? isEditMatch[1] : null;
    const isFormPage = isAddPage || !!editId;

    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        titleLine1: 'Empowered women,',
        titleLine2: 'stronger villages.',
        subtitle: 'Self-help groups, sericulture and handlooms — 2.5 lakh women and counting, building dignity through work.',
        primaryBtnText: 'Our Work & Impact',
        primaryBtnLink: '/completed-projects',
        secondaryBtnText: 'Involve with us',
        secondaryBtnLink: '/volunteer',
        order: 0,
        isActive: true
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [currentImage, setCurrentImage] = useState('');

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/hero/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                setSlides(data);
            }
        } catch (err) {
            console.error('Failed to fetch hero slides', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    // Load slide for editing
    useEffect(() => {
        if (editId) {
            const slideToEdit = slides.find(s => s._id === editId);
            if (slideToEdit) {
                setFormData({
                    titleLine1: slideToEdit.titleLine1 || '',
                    titleLine2: slideToEdit.titleLine2 || '',
                    subtitle: slideToEdit.subtitle || '',
                    primaryBtnText: slideToEdit.primaryBtnText || 'Our Work & Impact',
                    primaryBtnLink: slideToEdit.primaryBtnLink || '/completed-projects',
                    secondaryBtnText: slideToEdit.secondaryBtnText || 'Involve with us',
                    secondaryBtnLink: slideToEdit.secondaryBtnLink || '/volunteer',
                    order: slideToEdit.order !== undefined ? slideToEdit.order : 0,
                    isActive: slideToEdit.isActive !== undefined ? slideToEdit.isActive : true
                });
                setCurrentImage(slideToEdit.imageUrl || '');
                setImagePreview(slideToEdit.imageUrl ? (slideToEdit.imageUrl.startsWith('http') ? slideToEdit.imageUrl : `http://localhost:5000${slideToEdit.imageUrl}`) : '');
            } else if (slides.length > 0) {
                // Not found in existing list
                navigate('/admin/hero');
            }
        } else {
            // Reset for Add
            setFormData({
                titleLine1: 'Empowered women,',
                titleLine2: 'stronger villages.',
                subtitle: 'Self-help groups, sericulture and handlooms — 2.5 lakh women and counting, building dignity through work.',
                primaryBtnText: 'Our Work & Impact',
                primaryBtnLink: '/completed-projects',
                secondaryBtnText: 'Involve with us',
                secondaryBtnLink: '/volunteer',
                order: slides.length + 1,
                isActive: true
            });
            setImageFile(null);
            setImagePreview('');
            setCurrentImage('');
        }
    }, [editId, slides]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile && !currentImage) {
            setStatus('Please select an image for this slide.');
            return;
        }

        setStatus(editId ? 'Updating hero slide...' : 'Creating hero slide...');

        const postData = new FormData();
        postData.append('titleLine1', formData.titleLine1);
        postData.append('titleLine2', formData.titleLine2);
        postData.append('subtitle', formData.subtitle);
        postData.append('primaryBtnText', formData.primaryBtnText);
        postData.append('primaryBtnLink', formData.primaryBtnLink);
        postData.append('secondaryBtnText', formData.secondaryBtnText);
        postData.append('secondaryBtnLink', formData.secondaryBtnLink);
        postData.append('order', formData.order);
        postData.append('isActive', formData.isActive);

        if (imageFile) {
            postData.append('image', imageFile);
        } else if (currentImage) {
            postData.append('imageUrl', currentImage);
        }

        try {
            const url = editId
                ? `http://localhost:5000/api/hero/${editId}`
                : 'http://localhost:5000/api/hero';

            const method = editId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: postData
            });

            if (res.ok) {
                setStatus(editId ? 'Slide updated successfully!' : 'Slide added successfully!');
                await fetchSlides();
                setTimeout(() => {
                    setStatus('');
                    navigate('/admin/hero');
                }, 800);
            } else {
                const errData = await res.json();
                setStatus(errData.message || 'Failed to save hero slide.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Server error saving hero slide.');
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete this slide "${title}"?`)) return;

        try {
            const res = await fetch(`http://localhost:5000/api/hero/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchSlides();
            } else {
                alert('Failed to delete slide.');
            }
        } catch (err) {
            alert('Server error deleting slide.');
        }
    };

    // Toggle active status directly from table
    const handleToggleActive = async (slide) => {
        try {
            const res = await fetch(`http://localhost:5000/api/hero/${slide._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: !slide.isActive })
            });
            if (res.ok) {
                fetchSlides();
            }
        } catch (err) {
            console.error('Error toggling active state', err);
        }
    };

    // Form View (Add / Edit)
    if (isFormPage) {
        return (
            <div className="manager-container">
                <div className="page-header-actions">
                    <button className="back-link-btn" onClick={() => navigate('/admin/hero')}>
                        <span className="back-arrow">←</span> Back to Slides
                    </button>
                    <h2 className="manager-section-title">
                        {editId ? 'Edit Home Page Slide' : 'Add New Home Page Slide'}
                    </h2>
                    <p className="manager-section-subtitle">
                        Customize the background picture, headlines, and call-to-action buttons for this slide.
                    </p>
                </div>

                <div className="hero-form-layout">
                    {/* Form Card */}
                    <div className="manager-form-card">
                        <form onSubmit={handleSubmit}>
                            {/* Slide Photo Upload */}
                            <div className="form-group">
                                <label>Background Picture *</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    required={!editId && !currentImage}
                                />
                                <span className="field-hint">High-resolution horizontal photo recommended (e.g. 1920x1080).</span>
                            </div>

                            {/* Headline Line 1 & Line 2 */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Headline Line 1 (White Text) *</label>
                                    <input
                                        type="text"
                                        value={formData.titleLine1}
                                        onChange={(e) => setFormData({ ...formData, titleLine1: e.target.value })}
                                        placeholder="e.g. Empowered women,"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Headline Line 2 (Orange Accent) *</label>
                                    <input
                                        type="text"
                                        value={formData.titleLine2}
                                        onChange={(e) => setFormData({ ...formData, titleLine2: e.target.value })}
                                        placeholder="e.g. stronger villages."
                                        required
                                    />
                                </div>
                            </div>

                            {/* Subtitle / Description */}
                            <div className="form-group">
                                <label>Description / Subtitle *</label>
                                <textarea
                                    rows="3"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    placeholder="e.g. Self-help groups, sericulture and handlooms — 2.5 lakh women and counting, building dignity through work."
                                    required
                                />
                            </div>

                            {/* Primary Button */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Primary Button Label</label>
                                    <input
                                        type="text"
                                        value={formData.primaryBtnText}
                                        onChange={(e) => setFormData({ ...formData, primaryBtnText: e.target.value })}
                                        placeholder="e.g. Our Work & Impact"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Primary Button Target Link</label>
                                    <input
                                        type="text"
                                        value={formData.primaryBtnLink}
                                        onChange={(e) => setFormData({ ...formData, primaryBtnLink: e.target.value })}
                                        placeholder="e.g. /completed-projects"
                                    />
                                </div>
                            </div>

                            {/* Secondary Button */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Secondary Button Label</label>
                                    <input
                                        type="text"
                                        value={formData.secondaryBtnText}
                                        onChange={(e) => setFormData({ ...formData, secondaryBtnText: e.target.value })}
                                        placeholder="e.g. Involve with us"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Secondary Button Target Link</label>
                                    <input
                                        type="text"
                                        value={formData.secondaryBtnLink}
                                        onChange={(e) => setFormData({ ...formData, secondaryBtnLink: e.target.value })}
                                        placeholder="e.g. /volunteer"
                                    />
                                </div>
                            </div>

                            {/* Order & Status */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Display Sequence / Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Slide Status</label>
                                    <div className="checkbox-toggle-wrap">
                                        <input
                                            type="checkbox"
                                            id="slideActiveToggle"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <label htmlFor="slideActiveToggle" className="toggle-label-text">
                                            {formData.isActive ? 'Active (Visible in Carousel)' : 'Hidden (Inactive)'}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-actions-bar">
                                <button type="submit" className="add-btn-gradient">
                                    {editId ? 'Save Slide Changes' : 'Create Slide'}
                                </button>
                                <button
                                    type="button"
                                    className="action-pill-btn secondary"
                                    onClick={() => navigate('/admin/hero')}
                                >
                                    Cancel
                                </button>
                            </div>

                            {status && <p className="status-msg">{status}</p>}
                        </form>
                    </div>

                    {/* Live Banner Preview Box */}
                    <div className="hero-preview-sidebar">
                        <h3 className="preview-heading">Live Banner Simulation</h3>
                        <p className="preview-subtext">How this slide will appear to visitors on the homepage:</p>

                        <div className="hero-live-sim-card">
                            <div
                                className="hero-sim-bg"
                                style={{
                                    backgroundImage: imagePreview
                                        ? `url(${imagePreview})`
                                        : 'linear-gradient(135deg, #1b3d2f 0%, #0d241a 100%)'
                                }}
                            >
                                <div className="hero-sim-overlay"></div>
                                <div className="hero-sim-content">
                                    <div className="hero-sim-badge">SVSS Home Showcase</div>
                                    <h2 className="hero-sim-title">
                                        <span className="sim-white">{formData.titleLine1 || 'Empowered women,'}</span><br />
                                        <span className="sim-orange">{formData.titleLine2 || 'stronger villages.'}</span>
                                    </h2>
                                    <p className="hero-sim-subtitle">
                                        {formData.subtitle || 'Self-help groups, sericulture and handlooms — 2.5 lakh women and counting, building dignity through work.'}
                                    </p>
                                    <div className="hero-sim-buttons">
                                        {formData.primaryBtnText && (
                                            <span className="sim-btn sim-btn-primary">
                                                {formData.primaryBtnText}
                                            </span>
                                        )}
                                        {formData.secondaryBtnText && (
                                            <span className="sim-btn sim-btn-outline">
                                                {formData.secondaryBtnText}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // List View
    return (
        <div className="manager-container">
            {/* Header */}
            <div className="manager-header-actions">
                <div>
                    <h2 className="manager-section-title">Home Page Banner & Slides</h2>
                    <p className="manager-section-subtitle">
                        Manage background pictures, headlines, and call-to-action text displayed on the Home Page Hero carousel.
                    </p>
                </div>
                <button
                    className="add-btn-gradient"
                    onClick={() => navigate('/admin/hero/add')}
                >
                    + ADD NEW SLIDE
                </button>
            </div>

            {/* Slides Table */}
            <div className="table-responsive-wrapper">
                {loading ? (
                    <div className="empty-table-state">
                        <p>Loading slides...</p>
                    </div>
                ) : slides.length === 0 ? (
                    <div className="empty-table-state">
                        <p>No slides found. Click "+ ADD NEW SLIDE" to create your first home page banner slide.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '60px' }}>ORDER</th>
                                <th style={{ width: '130px' }}>PICTURE</th>
                                <th>HEADLINE &amp; SUBTITLE</th>
                                <th style={{ width: '180px' }}>BUTTONS</th>
                                <th style={{ width: '100px' }}>STATUS</th>
                                <th style={{ width: '130px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slides.map(slide => (
                                <tr key={slide._id}>
                                    <td className="table-order-badge">
                                        #{slide.order}
                                    </td>
                                    <td>
                                        <div className="hero-thumb-cell">
                                            <img
                                                src={slide.imageUrl.startsWith('http') ? slide.imageUrl : `http://localhost:5000${slide.imageUrl}`}
                                                alt={slide.titleLine1 || 'Slide thumbnail'}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                    </td>
                                    <td className="table-title-cell">
                                        <div className="hero-table-headline">
                                            <strong>{slide.titleLine1}</strong>{' '}
                                            <span className="accent-orange-text">{slide.titleLine2}</span>
                                        </div>
                                        <div className="hero-table-subtext">{slide.subtitle}</div>
                                    </td>
                                    <td>
                                        <div className="hero-btn-chips">
                                            {slide.primaryBtnText && (
                                                <span className="hero-chip primary" title={slide.primaryBtnLink}>
                                                    {slide.primaryBtnText}
                                                </span>
                                            )}
                                            {slide.secondaryBtnText && (
                                                <span className="hero-chip outline" title={slide.secondaryBtnLink}>
                                                    {slide.secondaryBtnText}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={`status-toggle-pill ${slide.isActive ? 'active' : 'inactive'}`}
                                            onClick={() => handleToggleActive(slide)}
                                            title="Click to toggle visibility"
                                        >
                                            {slide.isActive ? '● Active' : '○ Inactive'}
                                        </button>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="table-actions-cell">
                                            <button
                                                className="action-pill-btn edit"
                                                onClick={() => navigate(`/admin/hero/edit/${slide._id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="action-pill-btn delete"
                                                onClick={() => handleDelete(slide._id, `${slide.titleLine1} ${slide.titleLine2}`)}
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
        </div>
    );
};

export default HeroManager;
