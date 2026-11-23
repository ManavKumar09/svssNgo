import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TeamManager.css';

const TeamManager = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if on add or edit page
    const isAddPage = location.pathname === '/admin/team/add';
    const isEditMatch = location.pathname.match(/\/admin\/team\/edit\/(.+)/);
    const editId = isEditMatch ? isEditMatch[1] : null;
    const isFormPage = isAddPage || !!editId;

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [activeCategory, setActiveCategory] = useState('executive'); // 'executive' or 'staff'

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        role: 'Executive Member',
        detail: '',
        order: 0,
        category: 'executive'
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [currentImage, setCurrentImage] = useState('');

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/team');
            const data = await res.json();
            if (Array.isArray(data)) {
                setMembers(data);
            }
        } catch (err) {
            console.error('Failed to fetch team members', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    // Load member data if editing or initialize add form
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');
        const defaultCategory = (categoryParam === 'staff' || activeCategory === 'staff') ? 'staff' : 'executive';

        if (editId) {
            const memberToEdit = members.find(m => m._id === editId);
            if (memberToEdit) {
                setFormData({
                    name: memberToEdit.name || '',
                    role: memberToEdit.role || (memberToEdit.category === 'staff' ? 'Field Officer' : 'Executive Member'),
                    detail: memberToEdit.detail || '',
                    order: memberToEdit.order !== undefined ? memberToEdit.order : 0,
                    category: memberToEdit.category || 'executive'
                });
                setCurrentImage(memberToEdit.image || '');
                setPhotoPreview(memberToEdit.image ? (memberToEdit.image.startsWith('http') ? memberToEdit.image : `http://localhost:5000${memberToEdit.image}`) : '');
            } else {
                fetch(`http://localhost:5000/api/team/${editId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.name) {
                            setFormData({
                                name: data.name || '',
                                role: data.role || (data.category === 'staff' ? 'Field Officer' : 'Executive Member'),
                                detail: data.detail || '',
                                order: data.order !== undefined ? data.order : 0,
                                category: data.category || 'executive'
                            });
                            setCurrentImage(data.image || '');
                            setPhotoPreview(data.image ? (data.image.startsWith('http') ? data.image : `http://localhost:5000${data.image}`) : '');
                        }
                    })
                    .catch(console.error);
            }
        } else if (isAddPage) {
            setFormData({
                name: '',
                role: defaultCategory === 'staff' ? 'Project Coordinator' : 'Executive Member',
                detail: '',
                order: members.filter(m => (m.category || 'executive') === defaultCategory).length + 1,
                category: defaultCategory
            });
            setPhotoFile(null);
            setPhotoPreview('');
            setCurrentImage('');
        }
    }, [editId, isAddPage, members, location.search]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(editId ? 'Updating team member...' : 'Adding team member...');

        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('role', formData.role);
        submitData.append('detail', formData.detail);
        submitData.append('order', formData.order);
        submitData.append('category', formData.category);

        if (photoFile) {
            submitData.append('image', photoFile);
        } else if (currentImage) {
            submitData.append('image', currentImage);
        }

        try {
            const url = editId 
                ? `http://localhost:5000/api/team/${editId}`
                : 'http://localhost:5000/api/team';
            
            const method = editId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: submitData
            });

            if (res.ok) {
                setStatus(editId ? 'Team member updated successfully!' : 'Team member added successfully!');
                await fetchMembers();
                setTimeout(() => {
                    setStatus('');
                    navigate('/admin/team');
                }, 1000);
            } else {
                const errData = await res.json();
                setStatus(errData.message || 'Operation failed.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Server connection error.');
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to remove "${name}" from the team?`)) return;

        try {
            const res = await fetch(`http://localhost:5000/api/team/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchMembers();
            } else {
                alert('Failed to delete team member');
            }
        } catch (err) {
            alert('Server error deleting team member');
        }
    };

    const executiveMembers = members.filter(m => !m.category || m.category === 'executive');
    const staffMembers = members.filter(m => m.category === 'staff');
    const displayedMembers = activeCategory === 'staff' ? staffMembers : executiveMembers;

    // Dedicated Form Page (Add or Edit)
    if (isFormPage) {
        return (
            <div className="manager-container">
                <div className="page-header-actions">
                    <button className="back-link-btn" onClick={() => navigate('/admin/team')}>
                        <span className="back-arrow">←</span> Back to Team Members
                    </button>
                    <h2 className="manager-section-title">
                        {editId ? 'Edit Team Member' : 'Add New Team Member'}
                    </h2>
                    <p className="manager-section-subtitle">
                        {editId 
                            ? 'Update member category, designation, biography, order, or profile photo.'
                            : 'Add a new member to either the Executive Board or Operational Staff team.'}
                    </p>
                </div>

                <div className="manager-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Team Section / Category *</label>
                                <select 
                                    value={formData.category} 
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    <option value="executive">Executive Member (Governing Board & Leadership)</option>
                                    <option value="staff">Staff Member (Program & Field Team)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Full Name *</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                    placeholder="e.g. Deepak Verma" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Designation / Role *</label>
                                <input 
                                    type="text"
                                    list="role-options"
                                    value={formData.role} 
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="e.g. Project Coordinator"
                                    required
                                />
                                <datalist id="role-options">
                                    <option value="President" />
                                    <option value="Vice President" />
                                    <option value="Secretary" />
                                    <option value="Treasurer" />
                                    <option value="Executive Member" />
                                    <option value="Advisory Member" />
                                    <option value="Project Coordinator" />
                                    <option value="Field Officer" />
                                    <option value="Community Mobilizer" />
                                    <option value="Natural Resource Specialist" />
                                    <option value="Health & Nutrition Field Officer" />
                                    <option value="MIS & Documentation Executive" />
                                    <option value="Accounts & Administration Officer" />
                                </datalist>
                            </div>

                            <div className="form-group">
                                <label>Display Priority / Order (1 = Top)</label>
                                <input 
                                    type="number" 
                                    value={formData.order} 
                                    onChange={(e) => setFormData({ ...formData, order: e.target.value })} 
                                    placeholder="e.g. 1" 
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Profile Photo</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handlePhotoChange} 
                            />
                        </div>

                        {photoPreview && (
                            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <img 
                                    src={photoPreview} 
                                    alt="Preview" 
                                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f07e13' }}
                                />
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                                    {photoFile ? `Selected: ${photoFile.name}` : 'Current Photo'}
                                </span>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Biography & Responsibilities</label>
                            <textarea 
                                value={formData.detail} 
                                onChange={(e) => setFormData({ ...formData, detail: e.target.value })} 
                                placeholder="Describe their background, field responsibilities, or role in SVSS..."
                                rows="5"
                            />
                        </div>

                        <div className="form-actions-bar">
                            <button type="submit" className="add-btn-gradient">
                                {editId ? 'Save Changes' : '+ Add Team Member'}
                            </button>
                            <button 
                                type="button" 
                                className="action-pill-btn secondary" 
                                onClick={() => navigate('/admin/team')}
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

    // Main Table View
    return (
        <div className="manager-container">
            {/* Category Tabs */}
            <div className="manager-tabs">
                <button 
                    className={`manager-tab-btn ${activeCategory === 'executive' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('executive')}
                >
                    Executive Members ({executiveMembers.length})
                </button>
                <button 
                    className={`manager-tab-btn ${activeCategory === 'staff' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('staff')}
                >
                    Staff Members ({staffMembers.length})
                </button>
            </div>

            {/* Section Header */}
            <div className="manager-header-actions">
                <div>
                    <h2 className="manager-section-title">
                        {activeCategory === 'staff' ? 'Staff Members' : 'Executive Members'}
                    </h2>
                    <p className="manager-section-subtitle">
                        {activeCategory === 'staff'
                            ? 'Manage field officers, project coordinators, and operational personnel.'
                            : 'Manage office bearers, executive board members, and leadership displayed on the website.'}
                    </p>
                </div>

                <button 
                    className="add-btn-gradient" 
                    onClick={() => navigate(`/admin/team/add?category=${activeCategory}`)}
                >
                    {activeCategory === 'staff' ? '+ ADD STAFF' : '+ ADD MEMBER'}
                </button>
            </div>

            {/* Table Display Card */}
            <div className="manager-list-card">
                {loading ? (
                    <div className="empty-table-state">Loading team members...</div>
                ) : displayedMembers.length === 0 ? (
                    <div className="empty-table-state">
                        <p>No {activeCategory === 'staff' ? 'staff' : 'executive'} members found.</p>
                        <button 
                            className="action-pill-btn view" 
                            style={{ marginTop: '10px' }}
                            onClick={() => navigate(`/admin/team/add?category=${activeCategory}`)}
                        >
                            + Add First Member
                        </button>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '70px' }}>ORDER</th>
                                <th>MEMBER</th>
                                <th>SECTION</th>
                                <th>DESIGNATION</th>
                                <th>BIOGRAPHY PREVIEW</th>
                                <th style={{ width: '130px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedMembers.map((member) => {
                                const imgSrc = member.image 
                                    ? (member.image.startsWith('http') ? member.image : `http://localhost:5000${member.image}`)
                                    : '';
                                
                                const roleClass = member.role ? member.role.toLowerCase().replace(/\s+/g, '-') : '';

                                return (
                                    <tr key={member._id}>
                                        <td>
                                            <span className="order-badge">#{member.order !== undefined ? member.order : '-'}</span>
                                        </td>
                                        <td>
                                            <div className="team-member-cell">
                                                {imgSrc ? (
                                                    <img 
                                                        src={imgSrc} 
                                                        alt={member.name} 
                                                        className="team-avatar-img"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="team-avatar-fallback">
                                                        {member.name ? member.name.charAt(0).toUpperCase() : 'T'}
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="team-member-name">{member.name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`table-badge ${member.category === 'staff' ? 'badge-completed' : 'badge-current'}`}>
                                                {member.category === 'staff' ? 'Staff' : 'Executive'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`role-badge ${roleClass}`}>
                                                {member.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="team-bio-preview">
                                                {member.detail || 'No description provided.'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div className="table-actions-cell">
                                                <button 
                                                    className="action-pill-btn edit" 
                                                    onClick={() => navigate(`/admin/team/edit/${member._id}`)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="action-pill-btn delete" 
                                                    onClick={() => handleDelete(member._id, member.name)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TeamManager;
