import React, { useState, useEffect } from 'react';
import './SettingsManager.css';

const SettingsManager = ({ token }) => {
    const [activeTab, setActiveTab] = useState('contact'); // 'contact', 'social', 'security'
    const [loading, setLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

    // Contact & Site Settings State
    const [settings, setSettings] = useState({
        email: '',
        phone1: '',
        phone2: '',
        address: '',
        workingHours: '',
        radioStation: '',
        fcraCert: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        youtubeUrl: ''
    });

    // Username Form State
    const [currentUsername, setCurrentUsername] = useState(localStorage.getItem('adminUsername') || '');
    const [newUsername, setNewUsername] = useState('');
    const [usernamePassword, setUsernamePassword] = useState('');

    // Password Form State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/settings');
            const data = await res.json();
            if (data && data.key) {
                setSettings({
                    email: data.email || '',
                    phone1: data.phone1 || '',
                    phone2: data.phone2 || '',
                    address: data.address || '',
                    workingHours: data.workingHours || '',
                    radioStation: data.radioStation || '',
                    fcraCert: data.fcraCert || '',
                    facebookUrl: data.facebookUrl || '',
                    instagramUrl: data.instagramUrl || '',
                    twitterUrl: data.twitterUrl || '',
                    youtubeUrl: data.youtubeUrl || ''
                });
            }

            // Also fetch current admin user profile
            if (token) {
                const userRes = await fetch('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (userRes.ok) {
                    const userData = await userRes.json();
                    if (userData.username) {
                        setCurrentUsername(userData.username);
                        localStorage.setItem('adminUsername', userData.username);
                    }
                }
            }
        } catch (err) {
            console.error('Failed to load settings', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [token]);

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg({ text: 'Saving settings...', type: 'info' });

        try {
            const res = await fetch('http://localhost:5000/api/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                setStatusMsg({ text: 'Settings updated successfully!', type: 'success' });
                setTimeout(() => setStatusMsg({ text: '', type: '' }), 3000);
            } else {
                const errData = await res.json();
                setStatusMsg({ text: errData.message || 'Failed to update settings.', type: 'error' });
            }
        } catch (err) {
            console.error(err);
            setStatusMsg({ text: 'Error connecting to server.', type: 'error' });
        }
    };

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        if (!newUsername.trim()) {
            setStatusMsg({ text: 'Please enter a valid new username.', type: 'error' });
            return;
        }

        setStatusMsg({ text: 'Updating username...', type: 'info' });

        try {
            const res = await fetch('http://localhost:5000/api/auth/change-username', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    newUsername: newUsername.trim(),
                    password: usernamePassword
                })
            });

            const data = await res.json();

            if (res.ok) {
                setStatusMsg({ text: `Username successfully changed to: ${data.username}`, type: 'success' });
                setCurrentUsername(data.username);
                localStorage.setItem('adminUsername', data.username);
                setNewUsername('');
                setUsernamePassword('');
                setTimeout(() => {
                    setStatusMsg({ text: '', type: '' });
                    window.location.reload(); // Refresh to update sidebar and header
                }, 1500);
            } else {
                setStatusMsg({ text: data.message || 'Failed to update username.', type: 'error' });
            }
        } catch (err) {
            console.error(err);
            setStatusMsg({ text: 'Error connecting to server.', type: 'error' });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setStatusMsg({ text: 'New password and confirmation do not match.', type: 'error' });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setStatusMsg({ text: 'New password must be at least 6 characters long.', type: 'error' });
            return;
        }

        setStatusMsg({ text: 'Updating password...', type: 'info' });

        try {
            const res = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await res.json();

            if (res.ok) {
                setStatusMsg({ text: 'Password changed successfully! Keep your new credentials safe.', type: 'success' });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setTimeout(() => setStatusMsg({ text: '', type: '' }), 4000);
            } else {
                setStatusMsg({ text: data.message || 'Failed to update password.', type: 'error' });
            }
        } catch (err) {
            console.error(err);
            setStatusMsg({ text: 'Error connecting to server.', type: 'error' });
        }
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <div className="manager-title-group">
                    <h2>General Settings &amp; Security</h2>
                    <p>Manage site-wide contact info, official details, social links, and admin credentials</p>
                </div>
            </div>

            {/* Sub-tabs */}
            <div className="settings-tabs">
                <button
                    className={`settings-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('contact'); setStatusMsg({ text: '', type: '' }); }}
                >
                    Site Contact &amp; Details
                </button>
                <button
                    className={`settings-tab-btn ${activeTab === 'social' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('social'); setStatusMsg({ text: '', type: '' }); }}
                >
                    Social Media Profiles
                </button>
                <button
                    className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('security'); setStatusMsg({ text: '', type: '' }); }}
                >
                    Admin Account &amp; Credentials
                </button>
            </div>

            {loading ? (
                <div className="settings-card">
                    <p style={{ color: '#6b7280' }}>Loading settings...</p>
                </div>
            ) : (
                <div className="settings-card">
                    {/* Tab 1: Contact & NGO Details */}
                    {activeTab === 'contact' && (
                        <div>
                            <h3 className="settings-section-heading">Contact &amp; Organization Details</h3>
                            <p className="settings-section-description">
                                These details are displayed across the website header, footer, and contact page.
                            </p>

                            <form onSubmit={handleSettingsSubmit} className="admin-form">
                                <div className="form-group">
                                    <label>Official NGO Email *</label>
                                    <input
                                        type="email"
                                        value={settings.email}
                                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                        placeholder="e.g. svssngobpl@gmail.com"
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Primary Phone Number *</label>
                                        <input
                                            type="text"
                                            value={settings.phone1}
                                            onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                                            placeholder="e.g. +91-9425373168"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Secondary Phone Number</label>
                                        <input
                                            type="text"
                                            value={settings.phone2}
                                            onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                                            placeholder="e.g. +91-9425373169"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Working Hours</label>
                                    <input
                                        type="text"
                                        value={settings.workingHours}
                                        onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                                        placeholder="e.g. Mon–Sat, 10am – 6pm"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Registered Head Office Address *</label>
                                    <textarea
                                        rows="3"
                                        value={settings.address}
                                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                        placeholder="Enter registered head office address"
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label>Community Radio Station Text</label>
                                    <input
                                        type="text"
                                        value={settings.radioStation}
                                        onChange={(e) => setSettings({ ...settings, radioStation: e.target.value })}
                                        placeholder="e.g. SVSS Community Radio Station 91.2 MHz FM — Radio Awaz"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Legal Registration &amp; Certifications Badge Text</label>
                                    <input
                                        type="text"
                                        value={settings.fcraCert}
                                        onChange={(e) => setSettings({ ...settings, fcraCert: e.target.value })}
                                        placeholder="e.g. Registered under Societies Registration Act, 1860 · FCRA Registered · 12A &amp; 80G Certified"
                                    />
                                </div>

                                <button type="submit" className="add-btn-gradient" style={{ marginTop: '10px' }}>
                                    Save Contact Settings
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Tab 2: Social Media Links */}
                    {activeTab === 'social' && (
                        <div>
                            <h3 className="settings-section-heading">Social Media Profiles</h3>
                            <p className="settings-section-description">
                                Links to SVSS official channels (Facebook, Instagram, YouTube, X).
                            </p>

                            <form onSubmit={handleSettingsSubmit} className="admin-form">
                                <div className="form-group">
                                    <label>Facebook Profile URL</label>
                                    <input
                                        type="text"
                                        value={settings.facebookUrl}
                                        onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Instagram Profile URL</label>
                                    <input
                                        type="text"
                                        value={settings.instagramUrl}
                                        onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Twitter / X Profile URL</label>
                                    <input
                                        type="text"
                                        value={settings.twitterUrl}
                                        onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                                        placeholder="https://x.com/..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>YouTube Channel URL</label>
                                    <input
                                        type="text"
                                        value={settings.youtubeUrl}
                                        onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                                        placeholder="https://youtube.com/@..."
                                    />
                                </div>

                                <button type="submit" className="add-btn-gradient" style={{ marginTop: '10px' }}>
                                    Save Social Links
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Tab 3: Security, Username & Password Change */}
                    {activeTab === 'security' && (
                        <div>
                            {/* Section 1: Change Username */}
                            <div style={{ marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid #e5e7eb' }}>
                                <h3 className="settings-section-heading">Change Admin Username</h3>
                                <p className="settings-section-description">
                                    Update the login username used to sign in to the administrator portal.
                                </p>

                                <div className="settings-password-box" style={{ background: '#f8fafc', borderColor: '#cbd5e1' }}>
                                    <h4 style={{ color: '#334155' }}>Current Admin Username</h4>
                                    <p style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>
                                        👤 {currentUsername || 'svssngo@hotmail.com'}
                                    </p>
                                </div>

                                <form onSubmit={handleUsernameSubmit} className="admin-form" style={{ marginTop: '20px' }}>
                                    <div className="form-row">
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label>New Username *</label>
                                            <input
                                                type="text"
                                                value={newUsername}
                                                onChange={(e) => setNewUsername(e.target.value)}
                                                placeholder="Enter new username (e.g. svssadmin)"
                                                required
                                            />
                                        </div>
                                        <div className="form-group" style={{ flex: 1 }}>
                                            <label>Current Password (for verification) *</label>
                                            <input
                                                type="password"
                                                value={usernamePassword}
                                                onChange={(e) => setUsernamePassword(e.target.value)}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="add-btn-gradient" style={{ marginTop: '10px' }}>
                                        Update Username
                                    </button>
                                </form>
                            </div>

                            {/* Section 2: Change Password */}
                            <div>
                                <h3 className="settings-section-heading">Change Admin Password</h3>
                                <p className="settings-section-description">
                                    Update the login password for the administrator portal.
                                </p>

                                <div className="settings-password-box">
                                    <h4>Account Security Notice</h4>
                                    <p>Once updated, you will use the new password on your next login. Minimum length is 6 characters.</p>
                                </div>

                                <form onSubmit={handlePasswordSubmit} className="admin-form">
                                    <div className="form-group">
                                        <label>Current Password *</label>
                                        <input
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>New Password *</label>
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm New Password *</label>
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="add-btn-gradient" style={{ marginTop: '10px' }}>
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {statusMsg.text && (
                        <div className={`settings-alert ${statusMsg.type}`}>
                            {statusMsg.text}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SettingsManager;
