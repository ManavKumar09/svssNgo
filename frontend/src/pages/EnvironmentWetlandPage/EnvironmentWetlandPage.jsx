import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './EnvironmentWetlandPage.css';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const EnvironmentWetlandPage = () => {
    return (
        <div className="environment-wetland-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>

            {/* Hero Section */}
            <section className="project-hero">
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Environment & Wetland Conservation</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <Link to="/completed-projects/environment-climate">Environment & Climate</Link> / <span>Environment & Wetland</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">

                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Project Overview</span>
                        <h2>Environmental Awareness & Action</h2>
                        <p><strong>Programme:</strong> National Environment Awareness Campaign (NEAC)</p>
                        <p><strong>Financial Assistance:</strong> Ministry of Environment & Forest, Govt. of India (via nodal agency EPCO, Bhopal)</p>
                        <p>
                            We are actively involved in generating awareness through seminars, workshops, plantation programmes, and training sessions designed to foster community participation. Our initiatives focus on critical issues such as the intersection of women and the environment, cultivation of medicinal plants, techniques for maintaining clean water resources, and combatting environmental pollution.
                        </p>
                        <p>
                            Our approach ensures that local communities are not just passive recipients of information, but active participants in safeguarding their natural surroundings.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <div className="blank-photo-placeholder"></div>
                    </div>
                </div>

                {/* Section 2: Wetland Conservation */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Wetland Conservation</span>
                        <h2>Bhojwetland Project: Preserving Bhopal's Lakes</h2>
                        <p><strong>Funding:</strong> Japan Bank for International Cooperation</p>
                        <p>
                            We actively participated in wetland conservation efforts under the Bhojwetland Project, focusing on the conservation of the Upper and Lower lakes of Bhopal. A key component of our involvement was comprehensive awareness generation across both rural and urban catchment areas surrounding these vital water bodies.
                        </p>
                        <p>
                            To engage different target groups effectively, we organized a variety of interactive events:
                        </p>
                        <ul className="activities-list">
                            <li>Seminars and community rallies.</li>
                            <li>Educational quiz programmes for youth.</li>
                            <li>Painting competitions for school children.</li>
                            <li>Targeted outreach for rural communities and school teachers.</li>
                        </ul>
                    </div>
                    <div className="project-image-content">
                        <div className="blank-photo-placeholder"></div>
                    </div>
                </div>

                {/* Section 3: Medicinal Plants */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Medicinal Plants</span>
                        <h2>Traditional Knowledge & Conservation</h2>
                        <p>
                            Medicinal plants, or medicinal herbs, have been discovered and used in healing practices since prehistoric times. Plants synthesize hundreds of chemical compounds for defense and protection against insects, fungi, diseases, and herbivorous mammals.
                        </p>
                        <p>
                            Historical records of herbs date back to the Sumerian civilization (c. 3000 BC), the Ebers Papyrus from ancient Egypt (c. 1550 BC), and the works of Greek physician Dioscorides (c. 60 AD). Today, drug research continues to utilize ethnobotany to search for pharmacologically active substances, yielding hundreds of useful compounds like aspirin, digoxin, quinine, and opium, primarily categorized into alkaloids, glycosides, polyphenols, and terpenes.
                        </p>
                        <p>
                            While medicinal plants are widely used as folk medicine in non-industrialized societies due to their availability and affordability, they face significant modern challenges. The World Health Organization coordinates networks to encourage their safe and rational use amidst a poorly regulated botanical herbal market. Furthermore, these plants face severe environmental threats from climate change, habitat destruction, and over-collection driven by market demand.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <div className="blank-photo-placeholder"></div>
                    </div>
                </div>

                {/* Section 4: Women & Environment */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Women & Environment</span>
                        <h2>Gender Equality in Sustainable Development</h2>
                        <p>
                            Around the world, women play distinct and crucial roles in managing natural resources. They are deeply involved in managing plants and animals in forests, drylands, wetlands, and agriculture. They hold primary responsibility for collecting water, fuel, and fodder for domestic use and income generation, effectively overseeing local land and water resources.
                        </p>
                        <p>
                            In doing so, women contribute immense time, energy, skills, and personal vision to family and community development. Their extensive, hands-on experience makes them an invaluable source of knowledge and expertise on environmental management and appropriate conservation actions.
                        </p>
                        <p>
                            Despite these contributions, a wide gender gap remains. Research highlights that gender equality is essential for economies and that sustainable development is impossible without equity. Gender equality and equity are not only fundamental human rights and matters of social justice, but they are also absolute prerequisites for successful environmental conservation, sustainable development, and human security.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <div className="blank-photo-placeholder"></div>
                    </div>
                </div>

            </FadeIn>

            <Footer />
        </div>
    );
};

export default EnvironmentWetlandPage;
