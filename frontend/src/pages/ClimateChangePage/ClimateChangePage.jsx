import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ClimateChangePage.css';

import climateImg1 from '../../assets/photos/climatechange/enhanced_climate_1.png';
import climateImg2 from '../../assets/photos/climatechange/enhanced_climate_2.png';
import climateImg3 from '../../assets/photos/climatechange/enhanced_climate_3.png';

const ClimateChangePage = () => {
    return (
        <div className="climate-change-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${climateImg1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Climate Change Initiative</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Climate Change Initiative</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Biomass & Chullhas */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Energy Solutions</span>
                        <h2>Utilizing Biomass & Reducing Drudgery</h2>
                        <p className="lead-paragraph">
                            Promotion for utilizing Biomass & social empowerment of tribal women to protect forest, forest land & resource, environment from degradation with livelihood potential with drudgery reduction.
                        </p>
                        <p>
                            As wood, agriculture residues, coal, cattle dung cake are the primary energy sources for cooking in rural areas. Traditional chullhas, commonly used in rural areas, however are efficient but environmentally undesirable. In this contrast improved multi fuel cooking stove / chullhas are scientifically designed for potential regulation of heat flow & better fuel utilization, improved chullhas have heat transfer efficiency of 20-25% as compared to 8-10% in case of traditional chullhas.
                        </p>
                        <p>
                            In this context in view to conserve forest, SVSS taken initiative & promote alternative such as briquette can be used for every day heating/cooking works, briquettes are made from dried leaf, dung, saw dust, agriculture waste like wheat, paddy, straw seed cases bamboo dust, cotton, mustard, sunflower stalks & all other agro forest produces residues.
                        </p>
                        <p>
                            The use of bio mass briquettes is environment friendly and does not produce sulfur on burning has higher thermal capacity thesn normal coal and more heat on burning, is smokeless the food prepared by using briquette is reduce drudgery to the women in the kitchen upto 4 or 5 point scale. This technology is friendly, hygienic & Briquettes are easy to handle & transportable.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={climateImg2} alt="Biomass and alternative cooking methods" />
                    </div>
                </div>

                {/* Section 2: Objectives & Land Use (Reversed Layout) */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Key Objectives</span>
                        <h2>Conservation & Community Impact</h2>
                        <p>By use of briquettes & improved chulhas with social diversifications following objectives can be achieved:</p>
                        <ul>
                            <li>Conservation of fuel wood & other biomass</li>
                            <li>Control of deforestation & environmental degradation.</li>
                            <li>Provide employment opportunities to rural people & enhance participatory approach.</li>
                            <li>Reduction in drudgery of women & girl children for cooking in smoky kitchen.</li>
                            <li>Briquettes are cheaper than coal has no sulfer so very less pollution on burning.</li>
                            <li>The project is supported by M.P. Council of Science & Technology Govt. of M.P.</li>
                        </ul>
                    </div>
                    <div className="project-image-content">
                        <img src={climateImg3} alt="Community empowerment and forest conservation" />
                    </div>
                </div>

                {/* Section 3: Forest Conservation (Text Only) */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">Broader Issues</span>
                        <h2>Forest Resources & Land Use</h2>
                        <p>
                            The second major grouping of forest sector issues surrounds the question of conservation of forest resources and the related issues of land use. As with all nations, the countries of the Asia Pacific Region face questions regarding the priority of land use in the face of dense populations, generally low levels of economic development and social wellbeing. Land is being converted to alternative, non-forestry uses as indicated by the statistics on deforestation. Cut-over lands are left idle and forests are degraded as local residents seek improvements in daily living if only temporarily achieved by land clearing, gathering of fuelwood, or premature harvesting for a subsistence income or personal local utilization.
                        </p>
                        <br/>
                        <p>
                            Forest land has traditionally been defined based on a combination of current use and biological potential or capacity. Less frequently economic criteria setting priorities for land allocation have been utilized. The process of dynamic land use and periodic changes in the face of changed local conditions and priorities have frequently 'locked in' definitions of "forests" almost to the exclusion of consideration of relative land use values. Forest land use is also closely tied to legal and political issues of land tenure and ownership. Most frequently forest land is considered as a State responsibility, subject to governmental decision-making and control. Less frequently private ownership arrangements are allowed to shape or influence forest use.
                        </p>
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default ClimateChangePage;
