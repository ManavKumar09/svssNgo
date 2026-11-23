import React, { useEffect, useState, useRef } from 'react';

const CountUp = ({ end, duration = 2, start = 0, suffix = "", formattingFn }) => {
    const [count, setCount] = useState(start);
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
                observer.unobserve(domRef.current);
            }
        }, { threshold: 0.1 });

        if (domRef.current) observer.observe(domRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const progressRatio = Math.min(progress / (duration * 1000), 1);
            
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progressRatio, 3);
            
            const currentCount = Math.floor(easeOutProgress * (end - start) + start);
            setCount(currentCount);

            if (progressRatio < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, end, duration, start]);

    const formattedCount = formattingFn ? formattingFn(count) : count;

    return <span ref={domRef}>{formattedCount}{suffix}</span>;
};

export default CountUp;
