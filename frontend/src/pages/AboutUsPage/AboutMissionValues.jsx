import React from 'react';
import FadeIn from '../../components/FadeIn/FadeIn';
import './AboutMissionValues.css';

// Placeholder images
import img1 from '../../assets/photos/aboutusmission.jpg';
import img2 from '../../assets/photos/aboutusmission2.jpg';
import img3 from '../../assets/photos/aboutusmission3.jpg';

const missionCards = [
    {
        icon: '🤝',
        title: 'Participatory Community Action',
        desc: 'Championing people-led initiatives to overcome multi-dimensional development barriers—social, educational, technological, political, and economic—through direct grassroots mobilization.'
    },
    {
        icon: '⚖️',
        title: 'Climate Justice & Distributive Equity',
        desc: 'Conforming to IPCC principles of procedural and distributive justice. Ensuring green transitions and decarbonization do not place disproportionate financial burdens on the poor.'
    },
    {
        icon: '👩‍👧‍👦',
        title: 'Women’s SHGs & Debt Liberation',
        desc: 'Developing robust Self-Help Group networks as viable economic alternatives, liberating women from the cycles of debt and poverty to achieve sustained financial independence.'
    },
    {
        icon: '🌿',
        title: 'Indigenous & Local Co-Leadership',
        desc: 'Engaging communities as co-designers of resilience rather than passive beneficiaries—uniting scientific insights, indigenous ecological knowledge, and localized climate finance.'
    }
];

const assetCards = [
    {
        icon: '🌱',
        title: 'Natural & Physical Capital',
        desc: 'Securing equitable rights to land, water, forestry, and community commons. Equipping smallholders and tenant farmers with tools, machinery, livestock, and post-harvest storage.'
    },
    {
        icon: '👥',
        title: 'Human Capital & Capability',
        desc: 'Strengthening the rural labor pool through health initiatives, nutrition security, vocational skill training, and gender empowerment for women and adolescent youth.'
    },
    {
        icon: '🏛️',
        title: 'Institutional Rights & Voice',
        desc: 'Protecting legal rights, fostering transparent local governance, and elevating community participation in panchayats, self-help groups, and development decision-making.'
    },
    {
        icon: '💳',
        title: 'Financial Capital & Inclusion',
        desc: 'Unlocking affordable, non-predatory credit, micro-savings, and risk-mitigating insurance to shield vulnerable families from exploitative debt traps during crises.'
    },
    {
        icon: '🛣️',
        title: 'Infrastructural Connectivity',
        desc: 'Expanding access to potable water, sanitation, storage facilities, healthcare centers, schools, and reliable transport and communication networks.'
    }
];

const AboutMissionValues = () => {
    return (
        <section className="mission-values-section">
            <div className="mission-values-container">
                {/* Left Side: Images Grid */}
                <div className="mission-images-wrapper">
                    <FadeIn delay={0.1} direction="right" className="image-top">
                        <img src={img1} alt="Women Empowerment" className="mission-img" />
                    </FadeIn>
                    <div className="image-bottom-row">
                        <FadeIn delay={0.2} direction="up" className="image-bottom-left">
                            <img src={img2} alt="Community Gathering" className="mission-img" />
                        </FadeIn>
                        <FadeIn delay={0.3} direction="up" className="image-bottom-right">
                            <img src={img3} alt="Education" className="mission-img" />
                        </FadeIn>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="mission-content-wrapper">
                    <div className="content-block">
                        <FadeIn delay={0.2}>
                            <h4 className="section-subtitle">OUR MISSION</h4>
                            <h2 className="section-title">
                                To support people-led initiatives through a participatory community approach, overcoming developmental barriers across social, educational, technological, political, and economic spheres; and to build powerful linkages for women’s Self-Help Groups (SHGs) to gain economic independence, break free from debt and poverty, and lead socio-economic transformation.
                            </h2>
                        </FadeIn>
                    </div>

                    <div className="content-block">
                        <FadeIn delay={0.3}>
                            <h4 className="section-subtitle">OUR VISION</h4>
                            <h2 className="section-title">
                                The comprehensive empowerment of deprived sections of society living below the poverty line—enabling them to access, control, and manage vital resources for their autonomous development and the sustainable progress of their rural and urban communities.
                            </h2>
                        </FadeIn>
                    </div>

                    <div className="content-block values-block">
                        <FadeIn delay={0.4}>
                            <h4 className="section-subtitle">OUR CORE VALUES &amp; COMMITMENTS</h4>
                            <ul className="values-list">
                                <li>
                                    <strong>Grassroots Community Ownership:</strong> We co-create interventions with village panchayats, self-help groups, and local champions to ensure authentic community leadership.
                                </li>
                                <li>
                                    <strong>Catalyst for Systemic Change:</strong> We collaborate closely with government initiatives and development partners to accelerate the UN Sustainable Development Goals (SDGs) and spark generational transformation.
                                </li>
                                <li>
                                    <strong>Knowledge &amp; Institutional Guidance:</strong> We serve as a knowledge and resource nexus, sharing tools and best practices with grassroots activists and NGOs to empower those who support others.
                                </li>
                                <li>
                                    <strong>Radical Transparency &amp; Stewardship:</strong> We uphold the highest standards of financial integrity, open public reporting, and respectful care for people and local ecosystems.
                                </li>
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Deep-Dive Mission: Climate Justice & Participatory Framework */}
            <div className="mission-framework-container">
                <FadeIn delay={0.2}>
                    <div className="framework-header">
                        <h4 className="section-subtitle">MISSION IN ACTION</h4>
                        <h2 className="framework-title">Climate Justice, Social Inclusion &amp; Community Agency</h2>
                        <p className="framework-lead">
                            Climate change is fundamentally an inequality crisis. The poorest contribute least yet bear the heaviest burden. Our mission embeds procedural and distributive justice, ensuring green growth protects vulnerable livelihoods and places communities at the helm of solutions.
                        </p>
                    </div>
                </FadeIn>

                <div className="mission-cards-grid">
                    {missionCards.map((card, index) => (
                        <FadeIn key={index} delay={0.2 + index * 0.08} className="framework-card-fade">
                            <div className="framework-card mission-card">
                                <span className="framework-icon">{card.icon}</span>
                                <h3 className="framework-card-title">{card.title}</h3>
                                <p className="framework-card-desc">{card.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.4}>
                    <div className="mission-highlight-box">
                        <h3 className="highlight-box-title">Centering Vulnerable Groups &amp; Citizen-Led Transitions</h3>
                        <p className="highlight-box-desc">
                            We prioritize female-headed households, landless tenants, indigenous peoples, persons with disabilities, and migrant workers. By democratizing climate information and fostering civic dialogue, we overcome behavioral and political barriers to green development—ensuring climate policies empower rather than financially burden marginalized households.
                        </p>
                    </div>
                </FadeIn>
            </div>

            {/* Deep-Dive Vision Framework */}
            <div className="vision-framework-container">
                <FadeIn delay={0.2}>
                    <div className="framework-header">
                        <h4 className="section-subtitle">UNDERSTANDING RURAL REALITIES</h4>
                        <h2 className="framework-title">The Socio-Economic Architecture Behind Our Vision</h2>
                        <p className="framework-lead">
                            Rural poverty is not homogenous. It spans small cultivators, tenant farmers, landless laborers, and village artisans—each navigating unique structural barriers, varying access to land and capital, and highly volatile economic returns.
                        </p>
                    </div>
                </FadeIn>

                <div className="vision-assets-grid">
                    {assetCards.map((asset, index) => (
                        <FadeIn key={index} delay={0.2 + index * 0.08} className="framework-card-fade">
                            <div className="framework-card asset-card">
                                <span className="framework-icon">{asset.icon}</span>
                                <h3 className="framework-card-title">{asset.title}</h3>
                                <p className="framework-card-desc">{asset.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.4}>
                    <div className="vision-resilience-box">
                        <div className="resilience-content">
                            <h3 className="resilience-title">Building Shock-Absorption Capacity &amp; Market Integration</h3>
                            <p className="resilience-desc">
                                The rural poor are deeply vulnerable to abrupt weather shocks, health crises, market volatility, and climate shifts due to low financial reserves. Our vision systematically strengthens household resilience: transitioning families from high-cost informal debt to sustainable capital, diversifying income through non-farm and artisan opportunities, and creating community-managed safety nets that turn vulnerability into enduring self-reliance.
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default AboutMissionValues;
