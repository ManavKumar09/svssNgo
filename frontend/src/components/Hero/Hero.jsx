import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountUp from '../CountUp/CountUp';
import Navbar from '../Navbar/Navbar';
import './Hero.css';

// Default photos
import home3 from '../../assets/photos/home3.JPG';
import home2 from '../../assets/photos/home2.JPG';
import home1 from '../../assets/photos/Home1.JPG';
import home4 from '../../assets/photos/home4.jpeg';

const DEFAULT_SLIDES = [
  {
    imageUrl: home3,
    titleLine1: 'Empowered women,',
    titleLine2: 'stronger villages.',
    subtitle: 'Self-help groups, sericulture and handlooms — 2.5 lakh women and counting, building dignity through work.',
    primaryBtnText: 'Our Work & Impact',
    primaryBtnLink: '/completed-projects',
    secondaryBtnText: 'Involve with us',
    secondaryBtnLink: '/volunteer'
  },
  {
    imageUrl: home2,
    titleLine1: 'Grassroot Action,',
    titleLine2: 'Lasting Impact.',
    subtitle: 'Community mobilization, nutrition & health initiatives transforming rural Central India since 1988.',
    primaryBtnText: 'Explore Projects',
    primaryBtnLink: '/current-projects',
    secondaryBtnText: 'Volunteer With Us',
    secondaryBtnLink: '/volunteer'
  },
  {
    imageUrl: home1,
    titleLine1: 'Sustainable Agriculture,',
    titleLine2: 'Tribal Prosperity.',
    subtitle: 'Enabling smallholder farmers and indigenous communities with modern organic practices and Tribe Roots value addition.',
    primaryBtnText: 'Tribe Roots Store',
    primaryBtnLink: '/tribe-roots',
    secondaryBtnText: 'Our Partners',
    secondaryBtnLink: '/completed-projects'
  },
  {
    imageUrl: home4,
    titleLine1: 'Child Protection & Health,',
    titleLine2: 'For Every Life.',
    subtitle: 'Dedicated 1098 child helpline, ASHA volunteer networks, and school WASH programs across 95+ villages.',
    primaryBtnText: 'Childline Impact',
    primaryBtnLink: '/completed-projects/child-help-line',
    secondaryBtnText: 'Get In Touch',
    secondaryBtnLink: '/contact'
  }
];

function Hero() {
  const [dynamicSlides, setDynamicSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [yearsOfCompletion, setYearsOfCompletion] = useState(38);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/hero');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setDynamicSlides(data.map(slide => ({
              ...slide,
              imageUrl: slide.imageUrl.startsWith('http') ? slide.imageUrl : `http://localhost:5000${slide.imageUrl}`
            })));
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic hero slides', err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/stats');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const yearStat = data.find(s => s.label && s.label.toUpperCase().includes('YEAR'));
            if (yearStat && !isNaN(Number(yearStat.number))) {
              setYearsOfCompletion(Number(yearStat.number));
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch stats for hero badge', err);
      }
    };

    fetchHeroSlides();
    fetchStats();
  }, []);

  const slides = dynamicSlides.length > 0 ? dynamicSlides : DEFAULT_SLIDES;
  const currentSlide = slides[currentIndex] || slides[0];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5500); // Change slide every 5.5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Format index with leading zero
  const currentNum = String(currentIndex + 1).padStart(2, '0');
  const totalNum = String(slides.length).padStart(2, '0');

  return (
    <div className="hero">
        <Navbar />
        
        {/* Background Slides */}
        {slides.map((slide, index) => (
            <div 
                key={slide._id || index}
                className={`hero-bg-slide ${index === currentIndex ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
            ></div>
        ))}
        
        <div className="hero-overlay"></div>

        {/* Main Content */}
        <main className="hero-content">
            <div className="hero-text-container">
                <h1 className="hero-title animate-fade-in-up" key={`title-${currentIndex}`}>
                    <span className="text-white">{currentSlide.titleLine1 || 'Empowered women,'}</span><br/>
                    <span className="text-orange">{currentSlide.titleLine2 || 'stronger villages.'}</span>
                </h1>
                
                <p className="hero-subtitle animate-fade-in-up delay-1" key={`subtitle-${currentIndex}`}>
                    {currentSlide.subtitle}
                </p>
                
                <div className="hero-buttons animate-fade-in-up delay-2" key={`btns-${currentIndex}`}>
                    {currentSlide.primaryBtnText && (
                        <Link to={currentSlide.primaryBtnLink || '/completed-projects'} className="btn btn-primary">
                            {currentSlide.primaryBtnText}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    )}
                    {currentSlide.secondaryBtnText && (
                        <Link to={currentSlide.secondaryBtnLink || '/volunteer'} className="btn btn-outline">
                            {currentSlide.secondaryBtnText}
                        </Link>
                    )}
                </div>
            </div>
        </main>

        {/* Bottom Controls and Stats */}
        <div className="hero-footer">
            <div className="carousel-controls animate-fade-in delay-3">
                <button className="carousel-btn" onClick={prevSlide} aria-label="Previous Slide">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button className="carousel-btn" onClick={nextSlide} aria-label="Next Slide">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <div 
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></div>
                    ))}
                </div>
                
                <span className="carousel-counter">{currentNum} / {totalNum}</span>
            </div>
            
            <div className="stats-card animate-fade-in-right delay-3">
                <div className="stats-number"><CountUp start={0} end={yearsOfCompletion} duration={3} /></div>
                <div className="stats-text">
                    <div className="stats-title">Years of Completion</div>
                    <div className="stats-desc">Grass-root service since 1988</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Hero;
