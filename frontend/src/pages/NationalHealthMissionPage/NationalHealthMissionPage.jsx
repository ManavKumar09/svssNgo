import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './NationalHealthMissionPage.css';

import nhmImg1 from '../../assets/photos/nationalhealth/NationalHealth1.png';
import nhmImg2 from '../../assets/photos/nationalhealth/NationalHealth2.png';
import nhmImg3 from '../../assets/photos/nationalhealth/NationalHealth3.png';
import nhmImg4 from '../../assets/photos/nationalhealth/NationalHealth4.png';

const NationalHealthMissionPage = () => {
    return (
        <div className="national-health-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${nhmImg1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>National Health Mission RKSK Program</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>National Health Mission RKSK Program</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Adolescent Health & Training */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Adolescent Health</span>
                        <h2>Empowering Youth & Health Workers</h2>
                        <p className="lead-paragraph">
                            The Ministry of Health & Family Welfare & National Health Mission (NHM) With Collaboration with State Rural health Mission, GOMP has launched a health programme for adolescents in the age group of 10-19 years.
                        </p>
                        <p>
                            This program targets their nutrition, reproductive health and substance abuse, among other issues. The SVSS has been given the responsibility to train the adolescent children as master trainers along with ANM, ASHA health workers of the cluster. We provide technical hand-holding support at the field level as supportive supervision by our master trainers to sathiya. Five days of field supervision is undertaken by a 2-trainer team (1 male & 1 female) to facilitate sathiya peers.
                        </p>
                        <p>
                            Counseling services are provided by organization counselors at Adolescent Friendly Health Clinics (AFHC). SVSS implements the RKSK Programme in 2 Districts - Singroli & Shahdol of M.P.
                        </p>
                        <ul>
                            <li><strong>Singroli District:</strong> 3,316 peer educators, 43,940 other adolescents, 940 ASHA Trained, and 76 ANM through supportive supervision & counseling.</li>
                            <li><strong>Shahdol District:</strong> 6,603 peer educators, adolescents counseling, 264 ASHA, 22 ASHA facilitators & 21 ANM.</li>
                        </ul>
                    </div>
                    <div className="project-image-content">
                        <img src={nhmImg2} alt="Health training and awareness program" />
                    </div>
                </div>

                {/* Section 2: Programme Activity and outcome (Reversed Layout) */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Impact & Outcome</span>
                        <h2>Programme Activity and Outcome</h2>
                        <p>
                            A large number of the adolescent population experienced increased awareness of the adverse effects and consequences of substance misuse. The program aimed to improve knowledge, attitudes, and behaviour in relation to SRH (Sexual and Reproductive Health).
                        </p>
                        <p>
                            We focused on reducing teenage pregnancies, improving birth preparedness, complication readiness, and providing early parenting support for adolescent parents. Furthermore, we helped them reach Adolescent Friendly Health Clinics (AFHC) to avail essential services.
                        </p>
                        <p>
                            The Rashtriya Kishor Swasthya Karyakram (National Adolescent Health Programme) will comprehensively address the health needs of the 243 million adolescents. It introduces community-based interventions through peer educators and is underpinned by collaborations with other ministries and state governments.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={nhmImg3} alt="Adolescent Friendly Health Clinics interactions" />
                    </div>
                </div>

                {/* Section 3: Data-Driven Decisions & Pandemic Adaptation */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Innovation</span>
                        <h2>RKSK Dashboard & Pandemic Adaptation</h2>
                        <p>
                            The RKSK Dashboard was launched by AS & MD (NHM) during the 2nd National SHWP Workshop in New Delhi. This dashboard brings disaggregated and pre-analysed data on all aspects of adolescent health and well-being on one platform. This easily accessible and vetted platform is created with the aim to support States and UTs to make data-driven decisions for both health and education programs. It has been developed under the guidance of the Adolescent Health Division, Ministry of Health and Family Welfare and supported by the WHO-India office.
                        </p>
                        <p>
                            The implementation of this vision requires support from the government and other institutions, including the health, education and labour sectors as well as adolescents’ own families and communities. Building an agenda for adolescent health requires an escalation in the visibility of young people and an understanding of the challenges to their health and development.
                        </p>
                        <p>
                            <strong>COVID-19 Pandemic Response:</strong> The pandemic brought forth an important learning point on how to adapt in unprecedented times: peer educators could not reach out to enough adolescents as they did prior. MAMTA, in partnership with WHO India, introduced a mobile application ‘RKSK-Samajh’ for peer educators in the intervention blocks to provide them with information on RKSK six themes and COVID-19 preventive measures.
                        </p>
                        <p>
                            With state approval, the application was developed, launched and validated for its acceptability among the RKSK peer educators. It is noted that Ed-Tech initiatives are now the need of the hour; quick adaptation strategies to provide solutions can be tested and validated before scaling up.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={nhmImg4} alt="Digital initiatives and data-driven healthcare" />
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default NationalHealthMissionPage;
