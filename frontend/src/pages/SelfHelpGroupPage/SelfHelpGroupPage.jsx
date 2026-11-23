import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './SelfHelpGroupPage.css';

import shgImage1 from '../../assets/photos/SelfHelpGroup/SelfHelpGroup1.png';
import shgImage2 from '../../assets/photos/SelfHelpGroup/SelfHelpGroup2.png';
import shgImage3 from '../../assets/photos/SelfHelpGroup/SelfHelpGroup3.png';

const SelfHelpGroupPage = () => {
    return (
        <div className="shg-page project-details-page" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                <Navbar />
            </div>
            
            {/* Hero Section */}
            <section className="shg-hero" style={{ backgroundImage: `url(${shgImage1})` }}>
                <div className="shg-hero-overlay"></div>
                <div className="shg-hero-content">
                    <h1>Self Help Group</h1>
                    <div className="shg-breadcrumbs">
                        <Link to="/">Home</Link> / <Link to="/completed-projects">Completed Projects</Link> / <span>Self Help Group</span>
                    </div>
                </div>
            </section>
            
            <div className="shg-content">
                <div className="shg-header">
                    <h1>Formation and Strengthening <span className="highlight">Self Help Group</span></h1>
                </div>
                
                <div className="shg-intro">
                    <p>
                        The development & strengthen of poor women’s belonging from rural society. Total 100 numbers of SHG’s under the programme formed and all SHG linked with bank by opening of SHG Bank account in nasrullaganj block of Sehore District M.P. The development of SHG’s & members are initial stage the process of SHG development ongoing viz. Group meeting, Group saving, development of group norms/rules & regulation & training of records maintenance like group meeting minutes records, group savings & lending records. As per project norms for proper execution of the project, Project Implementation Monitoring committee (PIMC) formed by the organization the committee have members from NABARD, Lead bank Manager from bank of India, service area Branch manager of Bank of India, State Bank of India, Narmada Malwa Bank, Punjab National Bank, & representative of SVSS. PIMC meeting held in at every month or as per need of project at least 1 in a quarter.
                    </p>
                </div>
                
                <div className="shg-section">
                    <div className="shg-text">
                        <h2>Empowering Women in the Rural Economy</h2>
                        <p>
                            Women play important roles in the rural economy as farmers, wage earners and entrepreneurs. They also take responsibility for the well-being of the members of their families, including food provision and care for children and the elderly. Rural women’s unpaid work, particularly in poor households, often includes collecting wood and water. Women from indigenous and grassroots communities are often also custodians of traditional knowledge, which is key for their communities’ livelihoods, resilience and culture. Yet, women in rural areas face constraints in engaging in economic activities because of gender-based discrimination and social norms, disproportionate involvement in unpaid work, and unequal access to education, healthcare, property, and financial and other services. They are also disproportionately vulnerable to the impacts of environmental disasters and climate change.
                        </p>
                        <br />
                        <p>
                            Promoting and ensuring gender equality, and empowering rural women through decent work and productive employment, not only contributes to inclusive and sustainable economic growth, but also enhances the effectiveness of poverty reduction and food security initiatives, as well as climate change mitigation and adaptation efforts. The International Labour Organization (ILO)’s Decent Work Agenda offers an integrated framework for rural women’s empowerment, underpinned by international labour standards, social dialogue and the recognition that rural women play a key role in climate action Empowerment is typically conceptualized in three domains: economic, political, and social.
                        </p>
                        <br />
                        <p>
                            Economic empowerment refers to the market domain, in which a person is an economic actor. Political empowerment refers to the state domain, in which a person is a civic actor. Social empowerment refers to the society domain, in which a person is a social actor (Alsop, Bertelsen, and Holland 2006; World Bank 2007). The manifestations and measurement of what empowerment is about, however, depend on the context and on the characteristics of each group in the society. Changes in empowerment for one person or group cannot be assumed to apply to other individuals or groups (Alsop, Bertelsen, and Holland 2006). Furthermore, little is known about whether changes in one realm of empowerment (such as economic) could have negative repercussions in another realm of empowerment (such as social). Women’s empowerment means creating the conditions for women to be able to make choices, which implies that women may have different preferences than men, but also different abilities to make choices because of gender inequalities in bargaining power.
                        </p>
                    </div>
                    
                    <div className="shg-images">
                        <div className="shg-image-wrapper">
                            <img src={shgImage2} alt="Self Help Group Activity 1" />
                        </div>
                        <div className="shg-image-wrapper">
                            <img src={shgImage3} alt="Self Help Group Activity 2" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SelfHelpGroupPage;
