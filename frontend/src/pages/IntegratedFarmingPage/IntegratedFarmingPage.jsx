import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './IntegratedFarmingPage.css';
import integratedFarming1 from '../../assets/photos/IntegratedFarming/IntegratedFarming1.png';
import integratedFarming2 from '../../assets/photos/IntegratedFarming/IntegratedFarming2.png';
import integratedFarming3 from '../../assets/photos/IntegratedFarming/IntegratedFarming3.png';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const IntegratedFarmingPage = () => {
    return (
        <div className="integrated-farming-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${integratedFarming1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Integrated Farming & Eco-Friendly Agriculture</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Integrated Farming</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Project Overview</span>
                        <h2>Economic and Environment Security for Women</h2>
                        <p><strong>Area:</strong> 6 Villages of Fanda Block of Bhopal District, MP</p>
                        <p><strong>Target Group:</strong> 200 Women Farmers</p>
                        <p><strong>Sponsor Agency:</strong> United Spirits Limited (USL - CSR Initiatives)</p>
                        <p>
                            The projects would intervene with 200 farmers in the district of Bhopal and seek to achieve enhanced family incomes by Rs. 6,000-10,000 for 60% of participant women (including the money value of enhanced food sufficiency).
                        </p>
                        <p>This is achieved through:</p>
                        <ul className="activities-list" style={{ marginLeft: '10px' }}>
                            <li>Crop intensification of wheat and gram and diversification into commercial vegetable farming.</li>
                            <li>Multi-cropping including long-tenure plantations of fruit trees and timber plants in 300 ha as Agro-horticulture and Agro-forestry.</li>
                        </ul>
                    </div>
                    <div className="project-image-content">
                        <img src={integratedFarming2} alt="Women Farmers in Field" />
                    </div>
                </div>

                {/* Section 2: Programme Activity */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Programme Activity</span>
                        <h2>Capacity & Cadre Development</h2>
                        <p>
                            <strong>Building Institutional Capacity:</strong> Formation and development of village-level and cluster-level Women Farmers federations; federating the cluster-level federations with a block-level apex body/federation. According to the geographic situation, 6 village-level organizations and 2 cluster-level federations will be formed. We also develop and establish systems and procedures related to administration, accounts, HR, development of business plans, and statutory compliance.
                        </p>
                        <p>
                            <strong>Cadre Development:</strong> In the form of Community Resource Persons (CRPs), progressive women farmers are identified by intensive community exercises. These CRPs will be capacitated through intensive trainings and exposure visits to strengthen their agriculture practices and enhance their capabilities as community trainers. It is targeted to develop 12 CRPs to scale up the impact of the project.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={integratedFarming3} alt="Capacity Building and Training" />
                    </div>
                </div>

                {/* Section 3: Sustainable Practices */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">Sustainable Practices</span>
                        <h2>Promotion of Sustainable Agriculture</h2>
                        <p className="lead-paragraph">
                            6 Farm Schools will be established and equipped with training and education material and Soil testing facilities, demonstrating drudgery reduction, vermicompost, FYM, and bio-pesticides.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', textAlign: 'left', marginTop: '20px', justifyContent: 'center' }}>
                            <div style={{ flex: '1 1 300px' }}>
                                <p><strong>Education & Knowledge:</strong> The women farmers will get knowledge and exposure at the village level. Training focuses on Land and Water Management, Integrated Nutrient Management, Integrated Pest Management, and general agricultural problem-solving.</p>
                            </div>
                            <div style={{ flex: '1 1 300px' }}>
                                <p><strong>Technology & Support:</strong> SMS-based extension services provide women farmers with access to information on weather, cropping practices, and market rates. Farmers' Diaries provide continuous technical guidance.</p>
                            </div>
                            <div style={{ flex: '1 1 300px' }}>
                                <p><strong>Field Interventions:</strong> Activities include a Seed Security program (local seed preservation), promotion of Vermicompost and FYM (balancing organic and inorganic inputs), trial and demonstration of good practices, use of bio-fertilizer, crop spacing, and kitchen vegetable gardens.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Project Outcomes */}
                <div className="project-content-block full-width" style={{ marginTop: '-20px' }}>
                    <div className="project-text-content center-text">
                        <span className="section-tag">Project Outcomes</span>
                        <h2>Economic, Social & Environmental Impact</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left', marginTop: '30px' }}>
                            <div className="outcome-card">
                                <h3>Economic</h3>
                                <p>Increased agriculture productivity by 50% for each family. Food security will be ensured for 100% of the targeted families, along with an increase in their nutrition level. Market linkage for backward and forward integration will be ensured. Management of integrated pest, fertilizer, and water will result in 30-40% savings/gain at each farmer’s level. Sub-sector development (seed production, organic fertilizer, primary processing, animal husbandry) will energize the local economy.</p>
                            </div>
                            <div className="outcome-card">
                                <h3>Social Impact</h3>
                                <p>Capacitated women farmers groups and women-led apex organizations will carry collective bargaining power, increasing the recognition and dignity of women farmers. Improved knowledge and adoption of modern technologies will decrease drudgeries and hardship, leading women to focus more on children's education and developmental activities. This results in reduced migration, enhanced food security, and strengthens women's strategic role in agriculture.</p>
                            </div>
                            <div className="outcome-card">
                                <h3>Environmental</h3>
                                <p>The introduction of improved agronomy technologies and their adoption will positively enhance the soil and environment. Reduced use of water, recommended doses of fertilizers and chemicals, and the use of biological fertilizers and biological control measures for pests and diseases will have a significantly positive impact on the overall ecosystem.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default IntegratedFarmingPage;
