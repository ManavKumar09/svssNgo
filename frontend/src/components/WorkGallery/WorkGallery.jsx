import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import './WorkGallery.css';

// Fallback images from WorkGallery using Vite's import.meta.glob
const imageModules = import.meta.glob('../../assets/photos/WorkGallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });
const fallbackImages = Object.values(imageModules).map(module => module.default);

const WorkGallery = () => {
    const [images, setImages] = useState(fallbackImages.slice(0, 8));

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/gallery');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const dynamicUrls = data.map(item => 
                            item.imageUrl.startsWith('http') ? item.imageUrl : `https://svssngo.onrender.com${item.imageUrl}`
                        );
                        setImages(dynamicUrls.slice(0, 8));
                    }
                }
            } catch (err) {
                console.warn('Could not fetch dynamic gallery, using fallbacks', err);
            }
        };

        fetchGallery();
    }, []);

    return (
        <section className="gallery-section" id="gallery">
            <div className="gallery-container">
                <FadeIn delay={0.1} className="gallery-header">
                    <div className="gallery-title-area">
                        <span className="gallery-label">FROM THE FIELD</span>
                        <h2 className="gallery-title">Real villages. Real people. Real change.</h2>
                    </div>
                    <Link to="/gallery" className="gallery-link">
                        Open full gallery
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </Link>
                </FadeIn>

                <div className="gallery-grid">
                    {images.map((imgSrc, index) => (
                        <FadeIn delay={0.1 * (index % 4 + 1)} direction="up" className="gallery-item" key={index}>
                            <img src={imgSrc} alt={`From the field ${index + 1}`} className="gallery-img" loading="lazy" />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkGallery;
