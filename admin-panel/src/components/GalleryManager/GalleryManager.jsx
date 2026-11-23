import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GalleryManager.css';

const GalleryManager = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAddPage = location.pathname === '/admin/gallery/add';

    const [galleryImages, setGalleryImages] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [status, setStatus] = useState('');

    const fetchGalleryImages = async () => {
        try {
            const res = await fetch('https://svssngo.onrender.com/api/gallery');
            const data = await res.json();
            if (Array.isArray(data)) {
                // Filter only gallery photos (exclude legacy home/partners items if any)
                setGalleryImages(data.filter(img => !img.section || img.section === 'gallery'));
            }
        } catch (err) {
            console.error('Failed to fetch gallery images', err);
        }
    };

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    // Handle file selection with previews
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            setStatus('Please select at least one image.');
            return;
        }

        setStatus('Uploading image(s)...');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('section', 'gallery');

        selectedFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            const res = await fetch('https://svssngo.onrender.com/api/gallery', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                setStatus('Image(s) added successfully!');
                setTitle('');
                setSelectedFiles([]);
                setPreviewUrls([]);
                fetchGalleryImages();
                setTimeout(() => {
                    setStatus('');
                    navigate('/admin/gallery');
                }, 1000);
            } else {
                setStatus('Failed to upload images.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Server error during upload.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this photo from the gallery?')) return;

        try {
            const res = await fetch(`https://svssngo.onrender.com/api/gallery/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchGalleryImages();
            } else {
                alert('Failed to delete image.');
            }
        } catch (err) {
            alert('Server error deleting image.');
        }
    };

    // Dedicated "Add Image" Page View
    if (isAddPage) {
        return (
            <div className="manager-container">
                <div className="page-header-actions">
                    <button className="back-link-btn" onClick={() => navigate('/admin/gallery')}>
                        <span className="back-arrow">←</span> Back to Gallery
                    </button>
                    <h2 className="manager-section-title">Add Gallery Photo</h2>
                    <p className="manager-section-subtitle">
                        Upload images for the SVSS Impact Photo Gallery.
                    </p>
                </div>

                <div className="manager-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Photo Title / Caption (Optional)</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Community meeting in Sehore"
                            />
                        </div>

                        <div className="form-group">
                            <label>Upload Image(s) *</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                                required
                            />
                        </div>

                        {/* Image Previews */}
                        {previewUrls.length > 0 && (
                            <div className="gallery-preview-container">
                                <label className="preview-label">Selected Previews ({previewUrls.length}):</label>
                                <div className="gallery-preview-grid">
                                    {previewUrls.map((url, idx) => (
                                        <div key={idx} className="preview-thumb-box">
                                            <img src={url} alt={`preview ${idx}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="form-actions-bar">
                            <button type="submit" className="add-btn-gradient">
                                Upload Image(s)
                            </button>
                            <button type="button" className="action-pill-btn secondary" onClick={() => navigate('/admin/gallery')}>
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
            {/* Section Header */}
            <div className="manager-header-actions">
                <div>
                    <h2 className="manager-section-title">Photo Gallery</h2>
                    <p className="manager-section-subtitle">
                        Manage photos showcased in the SVSS Impact Photo Gallery ({galleryImages.length} photos).
                    </p>
                </div>
                <button
                    className="add-btn-gradient"
                    onClick={() => navigate('/admin/gallery/add')}
                >
                    + ADD GALLERY PHOTO
                </button>
            </div>

            {/* Gallery Table */}
            <div className="table-responsive-wrapper">
                {galleryImages.length === 0 ? (
                    <div className="empty-table-state">
                        <p>No photos found in the gallery. Click "+ ADD GALLERY PHOTO" to upload images.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '120px' }}>PREVIEW</th>
                                <th>TITLE / CAPTION</th>
                                <th style={{ width: '25%' }}>DATE ADDED</th>
                                <th style={{ width: '100px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleryImages.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <div className="gallery-thumb-cell">
                                            <img
                                                src={item.imageUrl.startsWith('http') ? item.imageUrl : `https://svssngo.onrender.com${item.imageUrl}`}
                                                alt={item.title || 'Image thumbnail'}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                    </td>
                                    <td className="table-title-cell">
                                        {item.title || <span className="no-title-text">Untitled photo</span>}
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
                                            <button className="action-pill-btn delete" onClick={() => handleDelete(item._id)}>
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

export default GalleryManager;
