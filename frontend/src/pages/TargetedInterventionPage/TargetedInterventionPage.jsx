import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './TargetedInterventionPage.css';
import targetedIntervention1 from '../../assets/photos/targetedIntervention/targetedIntervention1.png';
import targetedIntervention2 from '../../assets/photos/targetedIntervention/targetedIntervention2.png';
import targetedIntervention3 from '../../assets/photos/targetedIntervention/targetedIntervention3.png';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const TargetedInterventionPage = () => {
    return (
        <div className="targeted-intervention-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${targetedIntervention1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Targeted Intervention for STI & HIV</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Targeted Intervention</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">About the Initiative</span>
                        <h2>Focusing on Vulnerable Communities</h2>
                        <p>
                            SVSS has undertaken the Targeted Intervention (TI) project focusing upon Female Sex Workers (FSW) and Men having sex with Men (MSM) since October 2008. The current year 2011-12 is the fourth year of implementation of this project implemented in district Sehore covering the development blocks of Sehore, Ashta, and Nasrullaganj.
                        </p>
                        <p>
                            The project is supported by National AIDS Control Organization (NACO) under NACP-III. Madhya Pradesh State AIDS Control Society is the state-level agency to administer the grant and provide regular support. The goal of the project is to contribute in prevention and reversal of the HIV epidemic amongst the FSW, MSM of the Sehore district. SVSS has succeeded in building rapport with the target population and their community, providing a platform to the targeted community to exchange and share their concerns.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={targetedIntervention2} alt="Targeted Intervention Meeting" />
                    </div>
                </div>

                {/* Section 2: Component Activities */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Key Activities & Achievements</span>
                        <h2>Comprehensive Healthcare and Counseling</h2>
                        <p>
                            During the project interventions, SVSS has succeeded in sensitizing the targeted high risk group population over vulnerabilities and risks associated with HIV/AIDS by providing counseling services and quality STI treatments. The HRGs were provided behavior change services related to safer sex practices.
                        </p>
                        <ul className="activities-list">
                            <li><strong>Behavior change communication:</strong> 8,930 one-to-one contacts, 248 one-to-group contacts.</li>
                            <li><strong>Condom promotion:</strong> 320,400 free distributions, 12,380 from outlets, 769 social marketing.</li>
                            <li><strong>STI Management:</strong> 2,199 STI treatments, 867 RMC.</li>
                            <li><strong>Counseling:</strong> 778 counseling sessions, 137 group sessions.</li>
                            <li><strong>Enabling Environment:</strong> 10 advocacy meetings, 12 networking meetings.</li>
                            <li><strong>Community & Support:</strong> 9 community immediate needs addressed, 7 PLWHA support, 2 GIPA.</li>
                            <li><strong>Testing:</strong> 756 HIV testing referrals, 1,142 VDRL testing.</li>
                        </ul>
                    </div>
                    <div className="project-image-content">
                        <img src={targetedIntervention3} alt="Healthcare and Counseling Services" />
                    </div>
                </div>

                {/* Section 3: National AIDS Control Programme */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">Historical Context</span>
                        <h2>National AIDS Control Programme (NACP)</h2>
                        <p className="lead-paragraph">
                            In 1992, the Government launched the first National AIDS Control Programme (NACP I) with an IDA Credit of USD 84 million and demonstrated its commitment to combat the disease.
                        </p>
                        <p>
                            NACP I was implemented with an objective of slowing down the spread of HIV infections so as to reduce morbidity, mortality and impact of AIDS in the country. National AIDS Control Board (NACB) was constituted and an autonomous National AIDS Control Organization (NACO) was set up to implement the project. The first phase focused on awareness generation, setting up surveillance system for monitoring HIV epidemic, measures to ensure access to safe blood and preventive services for high risk group populations.
                        </p>
                        <p>
                            In November 1999, the second National AIDS Control Project (NACP II) was launched... The policy and strategic shift was reflected in the two key objectives of NACP II: (i) to reduce the spread of HIV infection in India, and (ii) to increase India’s capacity to respond to HIV/AIDS on a long-term basis. Key policy initiatives included the scale up of Targeted Interventions, launch of National Anti-Retroviral Treatment (ART) programme, and setting up of State AIDS Control Societies.
                        </p>
                        <p>
                            In response to the evolving epidemic, the third phase of the national programme (NACP III) was launched in July 2007 with the goal of Halting and Reversing the Epidemic. NACP-III aimed at scaling up prevention efforts among High Risk Groups (HRG) and General Population and integrating them with Care, Support & Treatment services. Thus, Prevention and Care, Support & Treatment (CST) form the two key pillars of all the AIDS control efforts in India.
                        </p>
                        <p>
                            The capacities of State AIDS Control Societies (SACS) have been strengthened. Technical Support Units (TSUs) were established at National and State level to assist in Programme monitoring. Strategic Information Management System (SIMS) has been established and nation-wide rollout is under way. The next phase of NACP will build on these achievements and ensure that these gains are consolidated and sustained.
                        </p>
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default TargetedInterventionPage;
