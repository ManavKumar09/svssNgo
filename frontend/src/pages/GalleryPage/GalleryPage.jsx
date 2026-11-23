import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FadeIn from '../../components/FadeIn/FadeIn';
import './GalleryPage.css';

const GalleryPage = () => {
    const [dynamicImages, setDynamicImages] = React.useState([]);

    React.useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/gallery');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setDynamicImages(data.map(item => `https://svssngo.onrender.com${item.imageUrl}`));
                }
            } catch (err) {
                console.error('Failed to load dynamic gallery images', err);
            }
        };
        fetchGallery();
    }, []);

    return (
        <div className="gallery-page">
            <Navbar textTheme="dark" />
            
            <section className="gallery-page-hero">
                <div className="gallery-page-hero-content">
                    <FadeIn delay={0.1}>
                        <h1>Our Impact Gallery</h1>
                        <p>Moments from the field. See how we are transforming lives across communities.</p>
                    </FadeIn>
                </div>
            </section>

            <section className="gallery-page-content">
                <div className="gallery-page-grid">
                    {dynamicImages.map((imgSrc, index) => (
                        <FadeIn delay={0.1 * (index % 5)} key={index} direction="up" className="gallery-page-item">
                            <img src={imgSrc} alt={`Gallery Image ${index + 1}`} loading="lazy" />
                        </FadeIn>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default GalleryPage;
