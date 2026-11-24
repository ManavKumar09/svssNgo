import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminPage.css';
import ProjectsManager from '../../components/ProjectsManager/ProjectsManager';
import PoliciesManager from '../../components/PoliciesManager/PoliciesManager';
import GalleryManager from '../../components/GalleryManager/GalleryManager';
import InquiriesManager from '../../components/InquiriesManager/InquiriesManager';
import TeamManager from '../../components/TeamManager/TeamManager';
import StatsManager from '../../components/StatsManager/StatsManager';
import PartnersManager from '../../components/PartnersManager/PartnersManager';
import VoicesManager from '../../components/VoicesManager/VoicesManager';
import SettingsManager from '../../components/SettingsManager/SettingsManager';
import HeroManager from '../../components/HeroManager/HeroManager';
import ActivitiesManager from '../../components/ActivitiesManager/ActivitiesManager';
import MilestonesManager from '../../components/MilestonesManager/MilestonesManager';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"></path>
        <path d="M18 17V9"></path>
        <path d="M13 17V5"></path>
        <path d="M8 17v-3"></path>
    </svg>
);

const MilestonesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const HeroIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const VoicesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const PartnersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <line x1="9" y1="6" x2="9" y2="6.01"></line>
        <line x1="15" y1="6" x2="15" y2="6.01"></line>
        <line x1="9" y1="10" x2="9" y2="10.01"></line>
        <line x1="15" y1="10" x2="15" y2="10.01"></line>
        <line x1="9" y1="14" x2="9" y2="14.01"></line>
        <line x1="15" y1="14" x2="15" y2="14.01"></line>
        <line x1="9" y1="18" x2="15" y2="18"></line>
    </svg>
);

const StatsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
);

const ProjectsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
);

const DocumentsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

const GalleryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);

const TeamIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

const AdminPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentAdminUser, setCurrentAdminUser] = useState(localStorage.getItem('adminUsername') || 'svssngo@hotmail.com');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [error, setError] = useState('');

    const isSettingsTab = location.pathname.includes('/settings');
    const isHeroTab = location.pathname.includes('/hero');
    const isVoicesTab = location.pathname.includes('/voices');
    const isPartnersTab = location.pathname.includes('/partners');
    const isStatsTab = location.pathname.includes('/stats');
    const isActivitiesTab = location.pathname.includes('/activities');
    const isMilestonesTab = location.pathname.includes('/milestones');
    const isTeamTab = location.pathname.includes('/team');
    const isInquiriesTab = location.pathname.includes('/inquiries');
    const isGalleryTab = location.pathname.includes('/gallery');
    const isDocumentsTab = location.pathname.includes('/documents');
    
    const activeTab = isSettingsTab 
        ? 'settings' 
        : isHeroTab 
        ? 'hero' 
        : isActivitiesTab
        ? 'activities'
        : isMilestonesTab
        ? 'milestones'
        : isVoicesTab 
        ? 'voices' 
        : isPartnersTab 
        ? 'partners' 
        : isStatsTab 
        ? 'stats' 
        : isTeamTab 
        ? 'team' 
        : isInquiriesTab 
        ? 'inquiries' 
        : isGalleryTab 
        ? 'gallery' 
        : isDocumentsTab 
        ? 'policies' 
        : 'projects';

    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            
            // Fetch latest user details
            fetch('https://svssngo.onrender.com/api/auth/me', {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.username) {
                    setCurrentAdminUser(data.username);
                    localStorage.setItem('adminUsername', data.username);
                }
            })
            .catch(() => {});
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('https://svssngo.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                if (data.username || data.email) {
                    const uName = data.username || data.email;
                    localStorage.setItem('adminUsername', uName);
                    setCurrentAdminUser(uName);
                }
                setToken(data.token);
                setIsAuthenticated(true);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error connecting to backend');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <div className="admin-login-card">
                    <div className="admin-login-header">
                        <div className="admin-login-logo">
                            <img src="/SVSSlogo.jpeg" alt="SVSS Logo" className="admin-logo-img" />
                            <span className="logo-svss">SVSS</span>
                            <span className="logo-tag">Admin</span>
                        </div>
                        <h2>Admin Portal</h2>
                        <p>Sign in with your username and password</p>
                    </div>
                    {error && <p className="admin-error">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="admin-form-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                placeholder="Enter username" 
                                required 
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>
                        <button type="submit" className="admin-btn-primary">Sign In</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Mobile backdrop */}
            {sidebarOpen && <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <div className="admin-logo">
                        <img src="/SVSSlogo.jpeg" alt="SVSS Logo" className="admin-logo-img" />
                        <span className="logo-svss">SVSS</span>
                        <span className="logo-tag">Admin</span>
                    </div>
                    <button className="admin-sidebar-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                        <CloseIcon />
                    </button>
                </div>

                <div className="admin-nav-section-title">Navigation</div>
                <nav className="admin-nav">
                    <button 
                        className={`admin-nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/projects'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><ProjectsIcon /></span>
                        Manage Projects
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'hero' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/hero'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><HeroIcon /></span>
                        Home Banner &amp; Slides
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'milestones' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/milestones'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><MilestonesIcon /></span>
                        About Milestones
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'activities' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/activities'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><ActivityIcon /></span>
                        Beneficiaries Graph
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'policies' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/documents'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><DocumentsIcon /></span>
                        Manage Documents
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/gallery'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><GalleryIcon /></span>
                        Manage Gallery
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'partners' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/partners'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><PartnersIcon /></span>
                        Partners &amp; Donors
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'team' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/team'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><TeamIcon /></span>
                        Team &amp; Board
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'stats' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/stats'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><StatsIcon /></span>
                        Impact Stats
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'voices' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/voices'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><VoicesIcon /></span>
                        Voices &amp; Stories
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/inquiries'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><MailIcon /></span>
                        Inquiries &amp; Forms
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => { navigate('/admin/settings'); setSidebarOpen(false); }}
                    >
                        <span className="nav-icon"><SettingsIcon /></span>
                        General Settings &amp; Security
                    </button>
                </nav>

                <div className="admin-sidebar-spacer"></div>

                <div className="admin-sidebar-footer">
                    <div className="admin-user-info">
                        <div className="admin-user-avatar">
                            {currentAdminUser ? currentAdminUser.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="admin-user-details">
                            <span className="admin-user-name" title={currentAdminUser}>{currentAdminUser}</span>
                            <span className="admin-user-status">Admin Active</span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="admin-sidebar-logout-btn">
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <div className="admin-main-wrapper">
                <header className="admin-topbar">
                    <div className="admin-topbar-left">
                        <button className="admin-hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu">
                            <MenuIcon />
                        </button>
                        <h1 className="admin-topbar-title">SVSS Admin</h1>
                    </div>
                    <div className="admin-topbar-right">
                        <button onClick={handleLogout} className="admin-logout-pill-btn">
                            Logout
                        </button>
                    </div>
                </header>

                <main className="admin-content">
                    {activeTab === 'projects' && <ProjectsManager token={token} />}
                    {activeTab === 'hero' && <HeroManager token={token} />}
                    {activeTab === 'milestones' && <MilestonesManager token={token} />}
                    {activeTab === 'activities' && <ActivitiesManager token={token} />}
                    {activeTab === 'policies' && <PoliciesManager token={token} />}
                    {activeTab === 'gallery' && <GalleryManager token={token} />}
                    {activeTab === 'partners' && <PartnersManager token={token} />}
                    {activeTab === 'team' && <TeamManager token={token} />}
                    {activeTab === 'stats' && <StatsManager token={token} />}
                    {activeTab === 'voices' && <VoicesManager token={token} />}
                    {activeTab === 'inquiries' && <InquiriesManager token={token} />}
                    {activeTab === 'settings' && <SettingsManager token={token} />}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;

