import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import './Activities.css';

const defaultGraphData = {
    subheading: 'BENEFICIARIES COVERED',
    heading: 'Transforming lives across project communities.',
    description: 'Every woman in an SHG, child in learning centers, farmer adopting sustainable practices, and community member reached — counted, audited and reported. Open the dashboard for the full breakdown.',
    linkText: 'Open dashboard',
    linkUrl: '/documents',
    yearlyData: [
        { year: '2019', activities: 4800 },
        { year: '2020', activities: 6200 },
        { year: '2021', activities: 8500 },
        { year: '2022', activities: 14200 },
        { year: '2023', activities: 21800 },
        { year: '2024', activities: 29500 },
        { year: '2025', activities: 38000 }
    ]
};

const Activities = () => {
    const [config, setConfig] = useState(defaultGraphData);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch('https://svssngo.onrender.com/api/activities');
                if (res.ok) {
                    const data = await res.json();
                    if (data && Array.isArray(data.yearlyData) && data.yearlyData.length > 0) {
                        setConfig(data);
                    }
                }
            } catch (err) {
                console.warn('Could not load dynamic beneficiary graph, using defaults', err);
            }
        };

        fetchActivities();
    }, []);

    const data = config.yearlyData || [];
    const maxDataVal = Math.max(...data.map(d => Number(d.activities || d.beneficiaries) || 0), 20);
    const step = Math.ceil(maxDataVal / 4 / 10) * 10 || 40;
    const maxValue = step * 4;
    const yAxisMarkers = [maxValue, step * 3, step * 2, step * 1, 0];

    const formatNumber = (num) => {
        if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
        return num.toLocaleString('en-IN');
    };

    return (
        <section className="activities-section">
            <div className="activities-container">
                <FadeIn delay={0.1} direction="right" className="activities-left">
                    <h4 className="activities-subheading">{config.subheading || 'BENEFICIARIES COVERED'}</h4>
                    <h2 className="activities-heading">
                        {config.heading || 'Transforming lives across project communities.'}
                    </h2>
                    <p className="activities-description">
                        {config.description || 'Every woman in an SHG, child in learning centers, farmer adopting sustainable practices, and community member reached — counted, audited and reported.'}
                    </p>
                </FadeIn>
                
                <FadeIn delay={0.4} direction="left" className="activities-right">
                    <div className="chart-card">
                        <div className="chart-wrapper">
                            {/* Y-Axis Label Line */}
                            <div className="y-axis-title-line">
                                <span>Beneficiaries Covered under the Project</span>
                            </div>

                            <div className="chart-container">
                                {/* Y-Axis Numbers */}
                                <div className="y-axis">
                                    {yAxisMarkers.map(marker => (
                                        <div key={marker} className="y-axis-marker">
                                            <span>{formatNumber(marker)}</span>
                                            <div className="grid-line"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart Area */}
                                <div className="chart-area">
                                    {data.map((item, index) => {
                                        const count = Number(item.activities || item.beneficiaries || 0);
                                        const heightPercentage = Math.min(100, Math.max(5, (count / maxValue) * 100));
                                        const isHovered = hoveredIndex === index;

                                        return (
                                            <div 
                                                key={item._id || item.year || index} 
                                                className={`bar-group ${isHovered ? 'hovered' : ''}`}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            >
                                                <div className="bar-background"></div>
                                                <div 
                                                    className="bar" 
                                                    style={{ height: `${heightPercentage}%` }}
                                                ></div>
                                                <span className="x-axis-label">{item.year}</span>
                                                
                                                {isHovered && (
                                                    <div className="tooltip">
                                                        <div className="tooltip-year">{item.year}</div>
                                                        <div className="tooltip-value">
                                                            Beneficiaries covered : {count.toLocaleString('en-IN')}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Activities;
