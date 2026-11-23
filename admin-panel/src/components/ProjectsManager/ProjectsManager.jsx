import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProjectsManager.css';

const defaultThemes = [
    { value: 'agriculture-livelihood', label: 'Agriculture & Livelihoods' },
    { value: 'health-sanitation', label: 'Health & Sanitation' },
    { value: 'environment-climate', label: 'Environment & Climate' },
    { value: 'community-empowerment', label: 'Community Empowerment' }
];

const formatThemeLabel = (slug) => {
    if (!slug) return '';
    const match = defaultThemes.find(t => t.value === slug);
    if (match) return match.label;
    return slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
        .replace(/\bAnd\b/gi, '&');
};

const ProjectsManager = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if on add or edit page
    const isAddPage = location.pathname === '/admin/projects/add';
    const isEditMatch = location.pathname.match(/\/admin\/projects\/edit\/(.+)/);
    const editId = isEditMatch ? isEditMatch[1] : null;
    const isFormPage = isAddPage || !!editId;

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ 
        title: '', 
        description: '', 
        category: 'current',
        theme: 'agriculture-livelihood',
        link: '',
        statsStr: ''
    });

    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [customCategoryName, setCustomCategoryName] = useState('');

    const [headerImage, setHeaderImage] = useState(null);
    const [headerImagePreview, setHeaderImagePreview] = useState('');
    const [currentHeaderImage, setCurrentHeaderImage] = useState('');
    const [images, setImages] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const [status, setStatus] = useState('');
    
    // UI State
    const [activeTab, setActiveTab] = useState('current');

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/projects');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (err) {
            console.error('Failed to fetch projects', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Dynamically aggregate all available unique categories from existing projects
    const availableThemes = useMemo(() => {
        const themeMap = new Map();
        defaultThemes.forEach(t => themeMap.set(t.value, t.label));

        projects.forEach(p => {
            if (p.category === 'completed' && p.theme) {
                const clean = p.theme.trim().toLowerCase();
                if (!themeMap.has(clean)) {
                    themeMap.set(clean, formatThemeLabel(clean));
                }
            }
        });

        // Include current theme if it's not yet in the map
        if (formData.theme && !themeMap.has(formData.theme.trim().toLowerCase())) {
            themeMap.set(formData.theme.trim().toLowerCase(), formatThemeLabel(formData.theme.trim().toLowerCase()));
        }

        return Array.from(themeMap.entries()).map(([value, label]) => ({ value, label }));
    }, [projects, formData.theme]);

    // Load project data if editing or initialize add form
    useEffect(() => {
        if (editId) {
            const projectToEdit = projects.find(p => p._id === editId);
            if (projectToEdit) {
                populateForm(projectToEdit);
            } else {
                fetch(`http://localhost:5000/api/projects/${editId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.title) {
                            populateForm(data);
                        }
                    })
                    .catch(console.error);
            }
        } else if (isAddPage) {
            setFormData({ 
                title: '', 
                description: '', 
                category: activeTab,
                theme: 'agriculture-livelihood',
                link: '',
                statsStr: ''
            });
            setIsCustomCategory(false);
            setCustomCategoryName('');
            setHeaderImage(null);
            setHeaderImagePreview('');
            setCurrentHeaderImage('');
            setImages([]);
            setCurrentImages([]);
        }
    }, [editId, isAddPage, projects]);

    const populateForm = (data) => {
        let statsFormatted = '';
        if (Array.isArray(data.stats) && data.stats.length > 0) {
            statsFormatted = data.stats.map(s => `${s.value || ''}|${s.label || ''}`).join(', ');
        }

        const projectTheme = data.theme || 'agriculture-livelihood';

        setFormData({
            title: data.title || '',
            description: data.description || '',
            category: data.category || 'current',
            theme: projectTheme,
            link: data.link || '',
            statsStr: statsFormatted
        });

        setIsCustomCategory(false);
        setCustomCategoryName('');

        setCurrentHeaderImage(data.headerImage || '');
        if (data.headerImage) {
            setHeaderImagePreview(data.headerImage.startsWith('http') ? data.headerImage : `http://localhost:5000${data.headerImage}`);
        } else {
            setHeaderImagePreview('');
        }
        setCurrentImages(data.images || []);
        setHeaderImage(null);
        setImages([]);
    };

    const handleHeaderImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHeaderImage(file);
            setHeaderImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(editId ? 'Updating project...' : 'Saving project...');

        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('category', formData.category);
        
        if (formData.category === 'completed') {
            let finalTheme = formData.theme;
            if (isCustomCategory && customCategoryName.trim()) {
                finalTheme = customCategoryName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            }
            submitData.append('theme', finalTheme || 'general');
        }
        
        // Auto-generate or preserve link without requiring manual input
        const defaultSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const autoLink = formData.link || (formData.category === 'completed' ? `/completed-projects/${defaultSlug}` : `/current-projects/${defaultSlug}`);
        submitData.append('link', autoLink);
        
        try {
            // Parse the stats string (format expected: Value|Label, Value2|Label2)
            const statsArr = formData.statsStr.split(',').map(s => {
                const parts = s.split('|');
                return { value: parts[0]?.trim() || '', label: parts[1]?.trim() || '' };
            }).filter(s => s.value || s.label);
            
            submitData.append('stats', JSON.stringify(statsArr));
        } catch (err) {
            console.error("Error parsing stats", err);
        }
        
        if (headerImage) {
            submitData.append('headerImage', headerImage);
        } else if (currentHeaderImage) {
            submitData.append('headerImage', currentHeaderImage);
        }
        
        // Send retained existing gallery images
        submitData.append('existingImages', JSON.stringify(currentImages));
        
        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                submitData.append('images', images[i]);
            }
        }

        try {
            const url = editId 
                ? `http://localhost:5000/api/projects/${editId}`
                : 'http://localhost:5000/api/projects';
            
            const method = editId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: submitData
            });

            if (res.ok) {
                setStatus(editId ? 'Project updated successfully!' : 'Project added successfully!');
                await fetchProjects();
                setTimeout(() => {
                    setStatus('');
                    navigate('/admin/projects'); // Go back to projects list page
                }, 1000);
            } else {
                const errData = await res.json().catch(() => ({}));
                setStatus(errData.message || 'Failed to save project.');
            }
        } catch (err) {
            setStatus('Error connecting to server.');
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title || 'this project'}"?`)) return;
        
        try {
            const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchProjects();
            } else {
                alert('Failed to delete project');
            }
        } catch (err) {
            alert('Error deleting project');
        }
    };

    const handleRemoveExistingImage = (indexToRemove) => {
        setCurrentImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const currentProjects = projects.filter(p => p.category === 'current');
    const completedProjects = projects.filter(p => p.category === 'completed');
    const displayedProjects = activeTab === 'current' ? currentProjects : completedProjects;

    // Dedicated Add/Edit Project Page View
    if (isFormPage) {
        return (
            <div className="manager-container">
                <div className="page-header-actions">
                    <button className="back-link-btn" onClick={() => navigate('/admin/projects')}>
                        <span className="back-arrow">←</span> Back to Projects
                    </button>
                    <h2 className="manager-section-title">{editId ? 'Edit Project' : 'Add New Project'}</h2>
                    <p className="manager-section-subtitle">
                        {editId 
                            ? 'Update project details, category, theme, stats, description, or media.' 
                            : 'Fill in the details below to add a project to the SVSS website.'}
                    </p>
                </div>

                <div className="manager-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Project Title *</label>
                            <input 
                                type="text" 
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                placeholder="Enter project title"
                                required 
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group" style={{ flex: '1' }}>
                                <label>Project Status / Category *</label>
                                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                                    <option value="current">Current Project</option>
                                    <option value="completed">Completed Project</option>
                                </select>
                            </div>

                            {formData.category === 'completed' && (
                                <div className="form-group" style={{ flex: '1' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <label style={{ margin: 0 }}>Category / Theme *</label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCustomCategory(!isCustomCategory);
                                                if (!isCustomCategory) {
                                                    setCustomCategoryName('');
                                                }
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#059669',
                                                fontWeight: '600',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            {isCustomCategory ? '← Choose Existing' : '+ Add New Category'}
                                        </button>
                                    </div>

                                    {isCustomCategory ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={customCategoryName}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setCustomCategoryName(val);
                                                    const slug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                                    setFormData({ ...formData, theme: slug || 'custom-category' });
                                                }}
                                                placeholder="Type new category name (e.g. Women Empowerment)"
                                                required
                                                autoFocus
                                            />
                                            <small style={{ color: '#059669', marginTop: '4px', display: 'block', fontSize: '12px' }}>
                                                New slug: <strong>/completed-projects/{formData.theme}</strong> (Will automatically show on frontend)
                                            </small>
                                        </div>
                                    ) : (
                                        <select
                                            value={formData.theme}
                                            onChange={(e) => {
                                                if (e.target.value === '__add_new__') {
                                                    setIsCustomCategory(true);
                                                    setCustomCategoryName('');
                                                } else {
                                                    setFormData({ ...formData, theme: e.target.value });
                                                }
                                            }}
                                            required
                                        >
                                            <optgroup label="Available Categories">
                                                {availableThemes.map(t => (
                                                    <option key={t.value} value={t.value}>{t.label}</option>
                                                ))}
                                            </optgroup>
                                            <option value="__add_new__">+ Add New Custom Category...</option>
                                        </select>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Key Stats (Format: Value|Label, Value2|Label2)</label>
                            <input 
                                type="text" 
                                value={formData.statsStr} 
                                onChange={(e) => setFormData({...formData, statsStr: e.target.value})} 
                                placeholder="e.g. 10,000+|Calls answered, 24/7|Emergency service"
                            />
                            <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>Separate multiple stats with commas. Format each as <strong>Value|Label</strong>.</small>
                        </div>

                        <div className="form-group">
                            <label>Description / Overview *</label>
                            <textarea 
                                value={formData.description} 
                                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                                rows="8" 
                                placeholder="Enter project overview, key interventions, achievements, and community impact..."
                                required
                            ></textarea>
                        </div>

                        {/* Cover Image Section */}
                        <div className="form-row" style={{ backgroundColor: '#f9fafb', padding: '18px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
                            <div className="form-group" style={{ width: '100%' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
                                    Cover / Header Image (Displayed on Cards and Category Headers)
                                </label>
                                
                                {headerImagePreview && (
                                    <div style={{ marginBottom: '14px', position: 'relative', display: 'inline-block' }}>
                                        <img 
                                            src={headerImagePreview} 
                                            alt="Cover Preview" 
                                            style={{ maxHeight: '160px', maxWidth: '300px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }} 
                                        />
                                        <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                                            {headerImage ? 'Selected new cover image' : 'Current Cover Image'}
                                        </span>
                                    </div>
                                )}
                                
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleHeaderImageChange} 
                                    style={{ display: 'block', width: '100%' }}
                                />
                            </div>
                        </div>

                        {/* Project Gallery Images Section */}
                        <div className="form-group" style={{ backgroundColor: '#f9fafb', padding: '18px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#111827' }}>
                                Project Gallery Images (Multiple Photos)
                            </label>

                            {/* Existing Images with removal capability */}
                            {currentImages.length > 0 && (
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
                                        Existing Gallery Photos ({currentImages.length}) — Click ✕ to remove:
                                    </label>
                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                        {currentImages.map((imgSrc, idx) => (
                                            <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                                                <img 
                                                    src={imgSrc.startsWith('http') ? imgSrc : `http://localhost:5000${imgSrc}`} 
                                                    alt={`Gallery ${idx + 1}`} 
                                                    style={{ width: '90px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }} 
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveExistingImage(idx)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '-6px',
                                                        right: '-6px',
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        width: '20px',
                                                        height: '20px',
                                                        fontSize: '11px',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                    }}
                                                    title="Remove image"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                                Upload Additional Images:
                            </label>
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                onChange={(e) => setImages(Array.from(e.target.files))} 
                            />
                            
                            {images.length > 0 && (
                                <div style={{ marginTop: '12px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#059669', display: 'block', marginBottom: '10px' }}>
                                        Newly Selected to Upload ({images.length})
                                    </label>
                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                        {images.map((file, idx) => (
                                            <div key={idx} style={{ position: 'relative' }}>
                                                <img 
                                                    src={URL.createObjectURL(file)} 
                                                    alt={`New ${idx + 1}`} 
                                                    style={{ width: '90px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #10b981' }} 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-actions-bar">
                            <button type="submit" className="add-btn-gradient">
                                {editId ? 'Save Changes' : 'Save Project'}
                            </button>
                            <button type="button" className="action-pill-btn secondary" onClick={() => navigate('/admin/projects')}>
                                Cancel
                            </button>
                        </div>

                        {status && <p className="status-msg">{status}</p>}
                    </form>
                </div>
            </div>
        );
    }

    const renderProjectsTable = (projectList) => {
        if (projectList.length === 0) {
            return (
                <div className="empty-table-state">
                    <p>No projects found in this category.</p>
                </div>
            );
        }

        return (
            <table className="admin-table">
                <thead>
                    <tr>
                        <th style={{ width: '28%' }}>TITLE</th>
                        <th style={{ width: '15%' }}>CATEGORY</th>
                        {activeTab === 'completed' && <th style={{ width: '20%' }}>THEME / CATEGORY</th>}
                        <th>DESCRIPTION / STATS</th>
                        <th style={{ width: '150px', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {projectList.map(p => (
                        <tr key={p._id}>
                            <td className="table-title-cell">{p.title}</td>
                            <td>
                                <span className={`table-badge ${p.category === 'current' ? 'badge-current' : 'badge-completed'}`}>
                                    {p.category === 'current' ? 'Current' : 'Completed'}
                                </span>
                            </td>
                            {activeTab === 'completed' && (
                                <td style={{ fontSize: '13px' }}>
                                    <span style={{ 
                                        background: '#ecfdf5', 
                                        color: '#047857', 
                                        padding: '4px 9px', 
                                        borderRadius: '6px', 
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        border: '1px solid #a7f3d0'
                                    }}>
                                        {formatThemeLabel(p.theme) || p.theme || '-'}
                                    </span>
                                </td>
                            )}
                            <td className="truncate-text">
                                {p.stats && p.stats.length > 0 
                                    ? p.stats.map(s => `${s.value}: ${s.label}`).join(' | ') 
                                    : p.description}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <div className="table-actions-cell">
                                    <button 
                                        className="action-pill-btn edit" 
                                        onClick={() => navigate(`/admin/projects/edit/${p._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="action-pill-btn delete" 
                                        onClick={() => handleDelete(p._id, p.title)}
                                    >
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
                    className={`manager-tab-btn ${activeTab === 'current' ? 'active' : ''}`}
                    onClick={() => setActiveTab('current')}
                >
                    Current Projects ({currentProjects.length})
                </button>
                <button 
                    className={`manager-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('completed')}
                >
                    Completed Projects ({completedProjects.length})
                </button>
            </div>

            {/* Section Header */}
            <div className="manager-header-actions">
                <div>
                    <h2 className="manager-section-title">Projects</h2>
                    <p className="manager-section-subtitle">
                        {activeTab === 'current' ? 'Manage active ongoing initiatives.' : 'Manage completed interventions, themes, and dynamic categories.'}
                    </p>
                </div>
                <button className="add-btn-gradient" onClick={() => navigate('/admin/projects/add')}>
                    + ADD PROJECT
                </button>
            </div>

            {/* Table Display Card */}
            <div className="manager-list-card">
                {loading ? (
                    <div className="empty-table-state">Loading projects...</div>
                ) : (
                    renderProjectsTable(displayedProjects)
                )}
            </div>
        </div>
    );
};

export default ProjectsManager;
