import React, { useEffect, useRef, useState } from 'react';
import './FadeIn.css';

const FadeIn = ({ children, delay = 0, duration = 0.8, direction = 'up', className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    const directionClass = `fade-in-${direction}`;

    return (
        <div
            ref={domRef}
            className={`fade-in-section ${directionClass} ${isVisible ? 'is-visible' : ''} ${className}`}
            style={{ 
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`
            }}
        >
            {children}
        </div>
    );
};

export default FadeIn;
