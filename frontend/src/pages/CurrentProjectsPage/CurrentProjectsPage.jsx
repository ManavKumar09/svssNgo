import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CurrentProjectsPage.css';
import '../ProjectCategoryPage/ProjectCategoryPage.css'; // Import the leaf card styles
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const CurrentProjectsPage = () => {
    const [currentProjects, setCurrentProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/projects');
                const data = await res.json();
                
                // Filter current projects
                const filtered = data.filter(p => p.category === 'current');
                setCurrentProjects(filtered);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch projects", err);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="current-projects-page project-category-page" style={{ paddingTop: '0' }}>
            <Navbar textTheme="dark" />
            
            {/* Page Header */}
            <section className="projects-hero">
                <div className="projects-hero-content">
                    <h1>Our <span className="highlight">Active Projects</span></h1>
                    <p>Discover the ongoing initiatives we are running right now to empower communities and protect the vulnerable.</p>
                </div>
            </section>

            {/* Projects List using Responsive Grid */}
            <section className="current-projects-grid-container" style={{ paddingTop: '20px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="current-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                    {loading ? (
                        <p style={{ color: '#1a2a22', textAlign: 'center', width: '100%' }}>Loading current projects...</p>
                    ) : currentProjects.length === 0 ? (
                        <p style={{ color: '#1a2a22', textAlign: 'center', width: '100%' }}>No active projects found.</p>
                    ) : (
                        currentProjects.map(project => {
                            const defaultSlug = project.title ? project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : project._id;
                            const projectLink = project.link || `/current-projects/${defaultSlug}`;

                            return (
                                <div className="project-leaf-card text-only-card" key={project._id} style={{ alignItems: 'flex-start', padding: '40px' }}>
                                    <div className="project-leaf-content" style={{ width: '100%' }}>
                                        <h2>{project.title}</h2>
                                        <ul className="project-stats-list">
                                            {project.stats && project.stats.map((stat, idx) => (
                                                <li key={idx}>
                                                    <span className="stat-value">{stat.value}</span> {stat.label}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link to={projectLink} className="btn-read-more" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default CurrentProjectsPage;
