import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import '../NationalHealthMissionPage/NationalHealthMissionPage.css'; // Reusing the identical layout CSS

import ashaImg1 from '../../assets/photos/nhmASHA/nhaASHA1.png';
import ashaImg2 from '../../assets/photos/nhmASHA/nhaASHA2.png';
import ashaImg3 from '../../assets/photos/nhmASHA/nhaASHA3.png';
import ashaImg4 from '../../assets/photos/nhmASHA/nhaASHA4.png';

const NhmAshaPage = () => {
    return (
        <div className="national-health-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${ashaImg1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>NHM ASHA Training Program</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>NHM ASHA</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: ASHA Volunteers */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Empowerment & Training</span>
                        <h2>ASHA Volunteers</h2>
                        <p className="lead-paragraph">
                            One of the key components of the mission is creating a band of female health volunteers, appropriately named “Accredited Social Health Activist” (ASHA) in each village. 
                        </p>
                        <p>
                            These ASHAs act as a ‘bridge’ between the rural people and health service outlets, playing a central role in achieving national health and population policy goals. They are selected by the community and work on a voluntary basis. The induction training for ASHA is completed in 23 days spread across five rounds over 12 months, orienting them to their roles, responsibilities, community rapport building, and a rights-based approach to health.
                        </p>
                        <p>
                            As a part of this training, ASHAs are also introduced to important aspects of reproductive, maternal, newborn, child, and adolescent health.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={ashaImg2} alt="Health training and awareness program" />
                    </div>
                </div>

                {/* Section 2: Rural Healthcare Challenges & Outcomes (Reversed Layout) */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Current Realities</span>
                        <h2>Challenges in Rural Infrastructure & Care</h2>
                        <p>
                            Healthcare is the right of every individual, but the lack of quality infrastructure, dearth of qualified medical functionaries, and non-access to basic medicines thwarts its reach to 60% of India's population. A majority of 700 million people live in rural areas where the condition of medical facilities is often deplorable. In rural India, where the number of Primary Health Care Centers (PHCs) is limited, many lack doctors, lab technicians, or pharmacists.
                        </p>
                        <p>
                            Rural healthcare infrastructure is a three-tiered network comprising a sub-center, primary health center (PHC), and community health center (CHC). Unfortunately, this setup is frequently in shambles. There are massive shortfalls in Sub-centers (18%), PHCs (22%), and CHCs (30%). Moreover, even when drugs are available, the gap between demand and supply leads to poor immunization and higher child mortality rates.
                        </p>
                        <p>
                            Rural women experience poorer health outcomes and have less access to health care than urban women, especially regarding maternal health. India accounts for the largest number of maternity deaths, a majority of which are in rural areas. Even in the private sector, health care is often confined to basic antenatal care and does not extend to critical services where medical care can save lives during complications.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={ashaImg3} alt="Adolescent Friendly Health Clinics interactions" />
                    </div>
                </div>

                {/* Section 3: Workforce, Financial Burden & Health Literacy */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Systemic Barriers</span>
                        <h2>Workforce Shortages & Systemic Gaps</h2>
                        <p>
                            The supply of primary care providers per capita is lower in rural areas. Travel to reach a primary care provider may be costly and burdensome, leading patients to substitute local primary care providers for sub-specialists, or forego care altogether resulting in a high number of emergency room (ER) visits. It is a common complaint that government health functionaries suffer from non-availability of medical staff, with surveys noting up to 45% absenteeism of doctors from PHCs.
                        </p>
                        <p>
                            Ineffectiveness of primary health care creates a breach in the referral system. Low faith in public health services causes overcrowding by health care seekers who bypass the first level of contact. Out-of-pocket (OOP) health expenses drove 55 million Indians into poverty in 2011-12, with 69% impoverished by expenditure on medicines alone. Government reluctance is evident as roughly only 0.9% of the GDP is allocated for health care.
                        </p>
                        <p>
                            Health literacy can also be a barrier. It impacts a patient's ability to understand health information from providers, especially concerning in rural communities with lower educational levels. Low health literacy makes residents reluctant to seek healthcare due to fear or frustration, highlighting the need for capacity development and limiting illicit, unqualified practitioners.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={ashaImg4} alt="Digital initiatives and data-driven healthcare" />
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default NhmAshaPage;
