import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectCategoryPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FadeIn from '../../components/FadeIn/FadeIn';
import ProjectDetailPage from '../ProjectDetailPage/ProjectDetailPage';

const defaultCategoryTitles = {
    'agriculture-livelihood': 'Agriculture & Livelihoods',
    'health-sanitation': 'Health & Sanitation',
    'environment-climate': 'Environment & Climate',
    'community-empowerment': 'Community Empowerment'
};

const formatCategoryTitle = (slug) => {
    if (!slug) return 'Projects';
    const cleanSlug = slug.trim().toLowerCase();
    if (defaultCategoryTitles[cleanSlug]) return defaultCategoryTitles[cleanSlug];
    return slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
        .replace(/\bAnd\b/gi, '&');
};

// Static routes that have dedicated pages
const dedicatedRoutes = [
    '/completed-projects/child-help-line',
    '/completed-projects/self-help-group',
    '/completed-projects/climate-change',
    '/completed-projects/national-health-mission',
    '/completed-projects/nhm-asha',
    '/completed-projects/targeted-intervention',
    '/completed-projects/world-food-programme',
    '/completed-projects/aer-atma',
    '/completed-projects/farmer-club',
    '/completed-projects/integrated-farming',
    '/completed-projects/entrepreneurship',
    '/completed-projects/livelihood-water',
    '/completed-projects/total-sanitation',
    '/completed-projects/environment-wetland'
];

const ProjectCategoryPage = () => {
    const { categoryId } = useParams();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProjectDetail, setIsProjectDetail] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/projects');
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    const targetClean = categoryId?.trim().toLowerCase();

                    // Check if categoryId is directly matching a specific project by slug, link, or id
                    const matchingProject = data.find(p => {
                        const slug = p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                        const pLinkEnd = p.link?.replace(/^\/(current-projects|completed-projects|projects)\//, '')?.toLowerCase();
                        return p._id === categoryId || 
                               slug === targetClean || 
                               pLinkEnd === targetClean ||
                               p.link?.toLowerCase() === `/completed-projects/${targetClean}` ||
                               p.link?.toLowerCase() === `/current-projects/${targetClean}` ||
                               p.link?.toLowerCase() === `/projects/${targetClean}`;
                    });

                    // Filter completed projects that match the current category (theme)
                    const filtered = data.filter(p => 
                        p.category === 'completed' && 
                        p.theme && 
                        p.theme.trim().toLowerCase() === targetClean
                    );

                    // If filtered projects are 0 and a matching project exists (or it's not a known category theme with 0 projects), render project detail
                    const isKnownTheme = !!defaultCategoryTitles[targetClean];
                    if ((filtered.length === 0 && matchingProject) || (!isKnownTheme && matchingProject && filtered.length === 0)) {
                        setIsProjectDetail(true);
                    } else {
                        setIsProjectDetail(false);
                        setProjects(filtered);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch projects", err);
                setLoading(false);
            }
        };
        fetchProjects();
    }, [categoryId]);

    if (isProjectDetail) {
        return <ProjectDetailPage />;
    }

    const pageTitle = formatCategoryTitle(categoryId);

    return (
        <div className="project-category-page">
            <Navbar textTheme="dark" />
            
            <div className="category-header">
                <h1>{pageTitle}</h1>
                <p>Impact created across these key initiatives and community interventions.</p>
            </div>

            <div className="project-list-container">
                {loading ? (
                    <p style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#fff' }}>
                        <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>No projects currently listed under {pageTitle}.</p>
                        <Link to="/completed-projects" style={{ color: '#10b981', fontWeight: '600', textDecoration: 'underline' }}>
                            ← Back to all completed categories
                        </Link>
                    </div>
                ) : (
                    projects.map((project, index) => {
                        const hasDedicatedPage = project.link && dedicatedRoutes.includes(project.link);
                        const defaultSlug = project.title ? project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : project._id;
                        const projectUrl = hasDedicatedPage ? project.link : (project.link || `/projects/${defaultSlug}`);

                        return (
                            <FadeIn key={project._id} delay={index * 0.15} direction="up">
                                <div className="project-leaf-card">
                                    <div className="project-leaf-image-container">
                                        {project.headerImage ? (
                                            <img 
                                                src={project.headerImage.startsWith('http') ? project.headerImage : `https://svssngo.onrender.com${project.headerImage}`} 
                                                alt={project.title} 
                                                className="project-leaf-image" 
                                            />
                                        ) : (
                                            <div className="project-leaf-image-blank"></div>
                                        )}
                                    </div>
                                    <div className="project-leaf-content">
                                        <h2>{project.title}</h2>
                                        
                                        {project.description && (
                                            <p style={{ 
                                                color: '#4b5563', 
                                                fontSize: '0.95rem', 
                                                lineHeight: '1.6', 
                                                margin: '10px 0 16px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {project.description}
                                            </p>
                                        )}

                                        <ul className="project-stats-list">
                                            {project.stats && project.stats.map((stat, idx) => (
                                                <li key={idx}>
                                                    <span className="stat-value">{stat.value}</span> {stat.label}
                                                </li>
                                            ))}
                                        </ul>

                                        <Link to={projectUrl} className="btn-read-more">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ProjectCategoryPage;
