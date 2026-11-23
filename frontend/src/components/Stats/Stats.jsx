import React, { useState, useEffect } from 'react';
import CountUp from '../CountUp/CountUp';
import './Stats.css';

const DEFAULT_STATS = [
  { number: 38, label: "YEARS OF COMPLETION", suffix: "+" },
  { number: 350000, label: "ADOLESCENTS REACHED ON SRH", suffix: "+" },
  { number: 80600, label: "ADOLESCENT GIRLS (15-35 YRS) SRHR", suffix: "+" },
  { number: 13200, label: "HOUSEHOLD TOILETS PROMOTED", suffix: "+" },
  { number: 8500, label: "WOMEN & GIRLS SKILL DEVELOPMENT", suffix: "+" },
  { number: 17200, label: "CHILDREN — WASH AT SCHOOL", suffix: "+" },
  { number: 10200, label: "HEALTH BENEFITS", suffix: "+" },
  { number: 4550, label: "NATURAL RESOURCE MANAGEMENT", suffix: "+" },
  { number: 250000, label: "COMMUNITY MEMBERS ENGAGED", suffix: "+" }
];

function Stats() {
  const [statsData, setStatsData] = useState(DEFAULT_STATS);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/stats');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setStatsData(data);
          }
        }
      } catch (err) {
        console.warn('Could not fetch dynamic stats, using default values', err);
      }
    };

    fetchStats();
  }, []);

  const formatIndianNumber = (num) => {
    return Number(num).toLocaleString('en-IN');
  };

  return (
    <section className="stats-bar">
      {statsData.map((stat, index) => (
        <div className="stat-item" key={stat._id || index}>
          <h3 className="stat-number">
            <CountUp 
              start={0} 
              end={Number(stat.number)} 
              duration={2.5} 
              formattingFn={formatIndianNumber}
              suffix={stat.suffix !== undefined ? stat.suffix : "+"}
            />
          </h3>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}

export default Stats;
