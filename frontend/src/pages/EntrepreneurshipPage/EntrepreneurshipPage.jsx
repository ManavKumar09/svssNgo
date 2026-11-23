import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './EntrepreneurshipPage.css';
import entrepreneurship1 from '../../assets/photos/Entrepreneurship/Entrepreneurship1.png';
import entrepreneurship2 from '../../assets/photos/Entrepreneurship/Entrepreneurship2.png';
import entrepreneurship3 from '../../assets/photos/Entrepreneurship/Entrepreneurship3.png';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const EntrepreneurshipPage = () => {
    return (
        <div className="entrepreneurship-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${entrepreneurship1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>Entrepreneurship Development Program</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Entrepreneurship</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Capacity Building</span>
                        <h2>Empowering Through Training</h2>
                        <p>
                            We have provided a variety of training at the District, Block, and village levels for the benefit of the people. Our diverse training programs include:
                        </p>
                        <ul className="activities-list">
                            <li>Medicinal Plant Cultivation</li>
                            <li>Environmental education for School Teachers</li>
                            <li>Capacity building for Panchayat members</li>
                            <li>Vision Building and Leadership qualities for SHG members</li>
                        </ul>
                        <p>
                            Our training on Income Generation Activities included Packaging, Grading, Envelope manufacturing, jute thread making, silk rearing, Pickles preparation, Vermi Compost, Food Processing, etc.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={entrepreneurship2} alt="Capacity Building Training" />
                    </div>
                </div>

                {/* Section 2: Medicinal Farming Training */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Specialized Skills</span>
                        <h2>Medicinal Farming Training</h2>
                        <p>
                            The Youth Farmers Training program for 5 States on Medicinal Plants cultivation was held in Jaipur. A two-day training program was organized twice every month, with the Hahnemann Charitable Mission Society organizing hands-on training at Sunrise Organic Park, Pinjrapole.
                        </p>
                        <p>
                            In this program, young farmers from Gujarat, Kerala, Uttar Pradesh, Maharashtra, Haryana, and Uttarakhand took intensive training on cultivating medicinal crops such as Satavaria, Moringa, Safed Musli, Ashwagandha, and Stevia. 
                        </p>
                        <p>
                            On the first day, detailed information about the utility of medicinal crops and advanced organic farming was given, including processes of grading, storage, state-level schemes, and bank subsidies. On the second day, farmers were given a live field demonstration of biological compost and manure.
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={entrepreneurship3} alt="Medicinal Farming Field Visit" />
                    </div>
                </div>

                {/* Section 3: Value and Scope */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">Industry Insights</span>
                        <h2>The Vital Role of Medicinal Plants</h2>
                        <p className="lead-paragraph">
                            Medicinal plants play a vital role in the pharmaceutical field. They are widely used in Ayurveda and are closely associated with human health.
                        </p>
                        <p>
                            They exist in natural forests, but their over-extraction has created a threat to their existence in nature, making farm field cultivation the only viable option for today's economic value addition for farmers. Keeping this in view, the Forest Research Institute (FRI), Dehradun conducted a 5-day training in September 2016 on “Cultivation and utilization of medicinal plants” for farmers of Uttarakhand.
                        </p>
                        <p>
                            During the inauguration by Dr. N. S. Bisht (IFS, Dy. Director General, ICFRE), he emphasized the wide scope of medicinal plant-based farming due to rich basic resources. He advised that knowledge of climatic and site suitability is crucial, and the quality of seedlings always counts because a good quality seedling produces a good quantity of product. 
                        </p>
                        <p>
                            He also suggested forming Self Help Groups (SHGs) and Cooperatives at village and block levels to share knowledge and facilitate better marketing of produce. Emphasizing market demand, he noted that scientific harvesting, storage, and processing technology can significantly enhance productivity.
                        </p>
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default EntrepreneurshipPage;
