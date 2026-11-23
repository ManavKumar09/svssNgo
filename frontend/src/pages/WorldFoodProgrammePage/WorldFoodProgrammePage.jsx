import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './WorldFoodProgrammePage.css';
import worldFood1 from '../../assets/photos/WorldFood/WorldFood1.png';
import worldFood2 from '../../assets/photos/WorldFood/WorldFood2.png';
import worldFood3 from '../../assets/photos/WorldFood/WorldFood3.png';
import { Link } from 'react-router-dom';
import FadeIn from '../../components/FadeIn/FadeIn';

const WorldFoodProgrammePage = () => {
    return (
        <div className="world-food-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="project-hero" style={{ backgroundImage: `url(${worldFood1})` }}>
                <div className="project-hero-overlay"></div>
                <FadeIn delay={0.2} direction="up" className="project-hero-content">
                    <h1>World Food Programme</h1>
                    <div className="project-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>World Food Programme</span>
                    </div>
                </FadeIn>
            </section>

            {/* Main Content Sections */}
            <FadeIn delay={0.3} direction="up" className="project-content-container">
                
                {/* Section 1: Overview */}
                <div className="project-content-block">
                    <div className="project-text-content">
                        <span className="section-tag">Sponsored Agency</span>
                        <h2>Department of Forest Govt. of Madhya Pradesh</h2>
                        <p>
                            SVSS builds the capacity of the community members on a cluster basis to acquire entrepreneurship skills and to provide long-term handholding support to community groups to successfully run business enterprises. Similarly, the CBO leaders are imparted training and subsequently refresher training on handholding to Joint Forest Management Committees (JFMC).
                        </p>
                        <p>
                            The community members are also trained on major forest policies that have a bearing on the local community, the major MP JFMC resolutions and their implementations, and biodiversity and its importance. Training also covers the Tribal Forest Rights Act, social issues & conflict management, sustainable forest management, soil & water conservation, development needs identification, and micro-planning of JFMC committees.
                        </p>
                        <p>
                            <strong>Organization is working with 60 JFMC in Burhanpur district of Madhya Pradesh under World Food Programme & Department of Forest Madhya Pradesh.</strong>
                        </p>
                    </div>
                    <div className="project-image-content">
                        <img src={worldFood2} alt="Community Capacity Building" />
                    </div>
                </div>

                {/* Section 2: History & Forms */}
                <div className="project-content-block reversed">
                    <div className="project-text-content">
                        <span className="section-tag">Community Tenure</span>
                        <h2>Formal Community Management of Forests</h2>
                        <p>
                            A brief listing of various forms of formal community tenure and management of forests both past and present is provided below:
                        </p>
                        <ul className="activities-list">
                            <li><strong>1900s:</strong> Forest Cooperatives in the Madras Presidency.</li>
                            <li><strong>1927:</strong> Section 28 - Village Forest Provision of the Indian Forest Act.</li>
                            <li><strong>1930s onwards:</strong> Van Panchayats in the (now) Uttarakhand.</li>
                            <li><strong>1940s:</strong> Cooperative Forest Societies in Kangra (earlier Punjab, now Himachal Pradesh).</li>
                            <li><strong>1980s:</strong> Woodlots on panchayat lands under Social Forestry (with Revenue sharing agreements).</li>
                            <li><strong>1990 onwards:</strong> Forest Protection Committees (FPCs) under JFM.</li>
                            <li><strong>Recent:</strong> Community Forest Rights & Resource (CFRt & CFRe) under the FRA.</li>
                        </ul>
                    </div>
                    <div className="project-image-content">
                        <img src={worldFood3} alt="Forest Management and Protection" />
                    </div>
                </div>

                {/* Section 3: Membership */}
                <div className="project-content-block full-width">
                    <div className="project-text-content center-text">
                        <span className="section-tag">JFMC Membership</span>
                        <h2>Who Can Become a Member?</h2>
                        <p className="lead-paragraph">
                            All adult members residing within the revenue boundaries of the area where a JFMC is being proposed are eligible and must be made members.
                        </p>
                        <p>
                            The area could be a village or group of villages, a hamlet, or a combination of whole villages and hamlets of other villages, depending on location and historical relations and forest use patterns. Membership criteria are as per the JFM resolution of the state. Membership for a JFMC is open for all members of the gram sabha – i.e., voting adults (in some states membership is open to one male and one female member of each household).
                        </p>
                        <p>
                            Members may consider putting a non-resident member option in their byelaws. This will allow members who live outside the village to also participate in the activities of the JFMC, without necessarily having to be on-site. However, they will not be able to participate in the meeting when Byelaws will be adopted. Byelaws should consider the following with respect to non-resident members: Voting rights, Level of contributions, Share in forest produce (self collected), and Share in net income (as and when received from the FD).
                        </p>
                    </div>
                </div>

                {/* Section 4: Forests Value */}
                <div className="project-content-block full-width" style={{ marginTop: '-40px' }}>
                    <div className="project-text-content center-text">
                        <span className="section-tag">The Value of Forests</span>
                        <h2>A Repository of Biodiversity</h2>
                        <p>
                            Forests are the most valuable Natural Resource, which have been nurturing the need and greed of man since time immemorial. They are the source of timber, water, fuel, and fodder and are looked upon as the most critical link in photosynthesis and as a repository of biodiversity having an immense importance for global eco-systems. 
                        </p>
                        <p>
                            While need-based utilization conforms to the norms of sustainable utilization, greed often leads to unsustainable extraction leading to degradation of the resource as well as generating more conflicts.
                        </p>
                    </div>
                </div>

            </FadeIn>
            
            <Footer />
        </div>
    );
};

export default WorldFoodProgrammePage;
