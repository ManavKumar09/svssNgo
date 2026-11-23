import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FadeIn from '../../components/FadeIn/FadeIn';
import defaultCover from '../../assets/photos/Home1.JPG';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
    const { projectId, categoryId } = useParams();
    const targetId = projectId || categoryId;
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProject = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://svssngo.onrender.com/api/projects');
                const data = await res.json();

                if (Array.isArray(data)) {
                    const cleanTarget = targetId?.trim().toLowerCase();
                    // Try to match by link, id, or normalized title slug
                    const match = data.find(p => {
                        const slug = p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                        const pLinkEnd = p.link?.replace(/^\/(current-projects|completed-projects|projects)\//, '')?.toLowerCase();
                        return p._id === targetId || 
                               slug === cleanTarget || 
                               pLinkEnd === cleanTarget ||
                               p.link?.toLowerCase() === `/current-projects/${cleanTarget}` ||
                               p.link?.toLowerCase() === `/completed-projects/${cleanTarget}` ||
                               p.link?.toLowerCase() === `/projects/${cleanTarget}`;
                    });

                    if (match) {
                        setProject(match);
                    }
                }
            } catch (err) {
                console.error("Failed to load project details", err);
            } finally {
                setLoading(false);
            }
        };

        if (targetId) {
            fetchProject();
        }
    }, [targetId]);

    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        return `https://svssngo.onrender.com${path}`;
    };

    if (loading) {
        return (
            <div className="project-details-page" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                    <Navbar />
                </div>
                <section className="project-hero" style={{ minHeight: '50vh', backgroundColor: '#132a1f' }}>
                    <div className="project-hero-content">
                        <h1>Loading Project Details...</h1>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-details-page" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                    <Navbar />
                </div>
                <section className="project-hero" style={{ minHeight: '60vh', backgroundColor: '#132a1f' }}>
                    <div className="project-hero-content">
                        <h1>Project Not Found</h1>
                        <div className="project-breadcrumbs" style={{ marginTop: '20px' }}>
                            <Link to="/current-projects">Active Projects</Link> / <Link to="/completed-projects">Completed Projects</Link>
                        </div>
                    </div>
                </section>
                <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#fbf9f4' }}>
                    <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '20px' }}>The requested project page could not be located.</p>
                    <Link to="/" style={{ color: '#10b981', fontWeight: '600', textDecoration: 'underline' }}>
                        ← Return to Homepage
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const isCurrent = project.category === 'current';
    const heroImage = project.headerImage ? getImageUrl(project.headerImage) : defaultCover;
    
    // Prepare all uploaded images
    const allImages = (project.images && project.images.length > 0)
        ? project.images.map(getImageUrl)
        : (project.headerImage ? [getImageUrl(project.headerImage)] : []);

    // Up to 3 images for the story content blocks
    const storyImages = allImages.slice(0, 3);

    // Remaining images (if more than 3) for the bottom field photo gallery
    const fieldGalleryImages = allImages.length > 3 ? allImages.slice(3) : [];

    // Split description into clean paragraphs
    const paragraphs = project.description ? project.description.split('\n').filter(p => p.trim()) : [];

    // Distribute paragraphs across story images (up to 3 blocks)
    const totalBlocks = Math.max(1, storyImages.length);
    const parasPerBlock = paragraphs.length > 0 ? Math.ceil(paragraphs.length / totalBlocks) : 0;

    const contentBlocks = [];
    for (let i = 0; i < totalBlocks; i++) {
        const blockParas = parasPerBlock > 0 
            ? paragraphs.slice(i * parasPerBlock, (i + 1) * parasPerBlock) 
            : (i === 0 ? paragraphs : []);
        
        let sectionTag = 'Project Overview';
        let sectionTitle = project.title;

        if (i === 1) {
            sectionTag = 'Outreach & Activities';
            sectionTitle = 'Field Interventions';
        } else if (i === 2) {
            sectionTag = 'Community Impact';
            sectionTitle = 'Program Milestones';
        }

        contentBlocks.push({
            img: storyImages[i] || null,
            paras: blockParas,
            isReversed: i % 2 === 1,
            tag: sectionTag,
            title: sectionTitle,
            showStats: i === 0 && project.stats && project.stats.length > 0
        });
    }

    return (
        <div className="project-details-page dynamic-project-details" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>{project.title}</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to={isCurrent ? "/current-projects" : "/completed-projects"}>{isCurrent ? "Active Projects" : "Completed Projects"}</Link> / <span>{project.title}</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                {contentBlocks.map((block, idx) => (
                    <div key={idx} className={`project-content-block ${block.isReversed ? 'reversed' : ''}`}>
                        <div className="project-text-content">
                            <span className="section-tag">{block.tag}</span>
                            <h2>{block.title}</h2>
                            
                            {block.showStats && (
                                <div className="project-key-details" style={{ marginBottom: '20px' }}>
                                    {project.stats.map((stat, sIdx) => (
                                        <p key={sIdx} style={{ marginBottom: '8px' }}>
                                            <strong>{stat.label || 'Highlight'}:</strong> {stat.value}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {block.paras.length > 0 ? (
                                <div className="project-paragraphs">
                                    {block.paras.map((para, pIdx) => (
                                        <p key={pIdx}>{para}</p>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
                                    Continued community engagement, on-ground monitoring, and impactful interventions driving sustainable progress across target beneficiary groups.
                                </p>
                            )}
                        </div>

                        {block.img && (
                            <div className="project-image-content">
                                <img src={block.img} alt={`${project.title} photo ${idx + 1}`} />
                            </div>
                        )}
                    </div>
                ))}

                {/* Section: Field Photographs (Shown only when more than 3 photos are added) */}
                {fieldGalleryImages.length > 0 && (
                    <div className="project-content-block full-width">
                        <div className="project-text-content center-text" style={{ width: '100%' }}>
                            <span className="section-tag">Project Gallery</span>
                            <h2>Field Photographs & Activities</h2>
                            <div className="dynamic-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginTop: '30px' }}>
                                {fieldGalleryImages.map((imgSrc, idx) => (
                                    <div key={idx} className="project-image-content" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                                        <img src={imgSrc} alt={`${project.title} field photo ${idx + 4}`} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default ProjectDetailPage;
