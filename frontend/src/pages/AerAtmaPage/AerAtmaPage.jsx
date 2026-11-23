import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './AerAtmaPage.css';
import aer1 from '../../assets/photos/Aer/Aer1.png';
import aer2 from '../../assets/photos/Aer/Aer2.png';
import aer3 from '../../assets/photos/Aer/Aer3.png';
import aer4 from '../../assets/photos/Aer/Aer4.png';
import aer5 from '../../assets/photos/Aer/Aer5.png';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const AerAtmaPage = () => {
    return (
        <div className="aer-atma-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${aer1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>AER under ATMA</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>AER under ATMA</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Project Overview</span>
                        <h2>Enhancing Agriculture Productivity</h2>
                        <p><strong>District Covered:</strong> Shahdol, Singroli, Anooppur, Dindori and Vidisha (covering 12 blocks in Madhya Pradesh)</p>
                        <p><strong>Supported by:</strong> Farmer Welfare and Agriculture Development Dept. Govt. of Madhya Pradesh</p>
                        <p>
                            While the land and water resources development programme creates a basis for productive agriculture, the agriculture productivity enhancement programme under the ATMA project aims to optimize agriculture productivity. Interventions are designed with the participation of farmers in technology development and dissemination, adopting the principle of participatory technology development (PTD).
                        </p>
                        <p>
                            During 2012-13, SVSS covered 852 families under this programme. With added zeal from these experiences, SVSS took the initiative in gearing up and energizing the demonstration programme. To create awareness about the programmes, a series of meetings were organized in every village of the operational GPs before implementation.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={aer2} alt="Agriculture Productivity Enhancement" />
                    </div>
                </div>

                {/* Section 2: Agriculture & Allied Demonstrations */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Demonstrations</span>
                        <h2>Agriculture & Allied Crops</h2>
                        <p>
                            <strong>Demonstration (Agriculture):</strong> Under this programme, agriculture seed support (namely soybean) was provided to 60 farmers across 12 villages, along with organic manure, multi-micro nutrients, and Integrated Pest Management (IPM). For encouraging organic farming, we motivated 52 farmers to opt for Vermi compost units. Farmers use vermi compost for organic farming, and landless farmers sell the worms for good returns.
                        </p>
                        <p>
                            <strong>Demonstration (Allied) - Vegetables:</strong> We have been focusing on vegetable cultivation for small and marginal farmers. We demonstrated 20 demos on various vegetables. While many opt for traditional methods, 78 new farmers adopted the trellis (Mandwa) system for creeper vegetables, achieving high production using cheaper local materials like Bamboo and Teak. Farmers have also successfully cultivated turmeric, ginger, onion, and garlic.
                        </p>
                        <p>
                            <strong>Horticulture and Agro Forestry:</strong> We successfully demonstrated 4 plots of horticulture (flower crops) and agro-forestry. SVSS supports farmers to plant on fallow land, utilizing short-duration crops like papaya as intercropping. Cumulatively, 18 horticulture plots were developed, and about 10 farmers opted for flower crops like roses.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={aer3} alt="Vegetable and Horticulture Demonstration" />
                    </div>
                </div>

                {/* Section 3: Farm Field School */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Farmer Education</span>
                        <h2>Farmer Field School (FFS) & Exposure Visits</h2>
                        <p className="lead-paragraph">
                            The purpose of the Farmers Field School (FFS) is the extension of technologies through a participatory and trickle-down approach, grooming local leaders for future extension.
                        </p>
                        <p>
                            FFS is a virtual in-situ school where farmers receive hands-on training on various productivity enhancement technologies, with a primary focus on learning by doing. During the period, 12 farm schools were established in various villages, blocks, and districts. Typically, one FFS covers 50-80 farmers from one village and caters to their training needs on Good Agriculture Practices (GAP).
                        </p>
                        <p>
                            Farmers are taught progressive farming practices through participatory learning. Front Line Demonstration (FLD) plots exhibit specific techniques in isolation, encouraging farmers to experiment on their own fields. Inter and intra-village exposure visits are organized to other farmer's field school initiatives, agriculture universities, and KVKs, exposing farmers to various technologies to test and validate them under their own management conditions.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={aer4} alt="Farmer Field School Training" />
                    </div>
                </div>

                {/* Section 4: Capacity Building */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Institution Building</span>
                        <h2>Capacity Building Programme</h2>
                        <p>
                            The community institutions groomed for the agriculture productivity enhancement programme at the village level include SHGs, activity-based Livelihood Groups, Kishan clubs for general agriculture technology promotion, and vegetable growers groups.
                        </p>
                        <p>
                            The concept of lead farmers (Achiever farmers) is practiced to engage them as agents for disseminating preferred technologies developed through the FFS method. We conducted a total of 36 training programs during the reporting period, investing significant time and resources into building capacity for technology development and dissemination. Technical inputs were provided by the Department of Agriculture, and progress is reviewed jointly by the ATMA team and SVSS.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={aer5} alt="Capacity Building Programme" />
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default AerAtmaPage;
