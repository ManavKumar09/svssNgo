import React, { useEffect } from 'react';
import './PodfProjectsPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const PodfProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const podfProjects = [
        { id: 1, organization: 'NABARD MP RO', category: 'PODF', name: 'Devnarayan Farmer Producer Company L.T.D', date: '10.10.2018', state: 'Madhya Pradesh', district: 'Bhopal', block: 'Fanda' },
        { id: 2, organization: 'NABARD MP RO', category: 'PODF', name: 'Reva Farmer Producer Company L.T.D', date: '13.12.2011', state: 'Madhya Pradesh', district: 'Sehore', block: 'Jamoniya Talab' },
        { id: 3, organization: 'NABARD MP RO', category: 'PODF', name: 'Gopala Dudgh Upatadak Farmer Producer Company L.T.D', date: '02.11.2015', state: 'Madhya Pradesh', district: 'Sehore', block: 'Sehore' },
        { id: 4, organization: 'NABARD MP RO', category: 'PODF', name: 'Heera Seeds Producer Company L.T.D', date: '02.11.2015', state: 'Madhya Pradesh', district: 'Sehore', block: 'Icchawar' },
        { id: 5, organization: 'NABARD MP RO', category: 'PODF', name: 'Erda Farmer Producer Company L.T.D', date: '24.01.2020', state: 'Madhya Pradesh', district: 'Sehore', block: 'Sehore' },
        { id: 6, organization: 'NABARD MP RO', category: 'PODF', name: 'Parvati Milk Producer Company L.T.D', date: '21.10.2015', state: 'Madhya Pradesh', district: 'Bhopal', block: 'Fanda' },
        { id: 7, organization: 'NABARD MP RO', category: 'PODF', name: 'Sidrapur Agro Producer Company L.T.D', date: '21.04.2019', state: 'Madhya Pradesh', district: 'Sehore', block: 'Sehore' },
        { id: 8, organization: 'NABARD MP RO', category: 'PODF', name: 'Varidhi Kisan Producer Company L.T.D', date: '15.01.2020', state: 'Madhya Pradesh', district: 'Sehore', block: 'Sehore' },
        { id: 9, organization: 'NABARD MP RO', category: 'PODF', name: 'Bhojpal Farmer Producer Company L.T.D', date: '23.04.2018', state: 'Madhya Pradesh', district: 'Bhopal', block: 'Bairasiya' },
        { id: 10, organization: 'NABARD MP RO', category: 'PODF', name: 'Evraj Seeds Producer Company L.T.D', date: '18.04.2019', state: 'Madhya Pradesh', district: 'Bhopal', block: 'Bairasiya' },
        { id: 11, organization: 'NABARD MP RO', category: 'PODF', name: 'Kharpi Farmers Producer Company L.T.D', date: '06.03.2019', state: 'Madhya Pradesh', district: 'Bhopal', block: 'Bhopal' },
        { id: 12, organization: 'NABARD MP RO', category: 'PODF', name: 'Urjit Farmer Producer Company L.T.D', date: '30.01.2019', state: 'Madhya Pradesh', district: 'Bhopal', block: 'Phanda' }
    ];

    return (
        <div className="podf-projects-page" style={{ paddingTop: '0' }}>
            <Navbar textTheme="dark" />
            
            <section className="podf-projects-hero">
                <div className="podf-projects-hero-content">
                    <h1>Projects under <span className="highlight">PODF</span></h1>
                    <p>Producer Organization Development Fund</p>
                </div>
            </section>

            <section className="podf-projects-section">
                <div className="podf-projects-container">
                    <p className="podf-projects-subtitle">Details of the ongoing FPOs supported by NABARD MP RO</p>
                    
                    <div className="table-responsive">
                        <table className="projects-table">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Organization</th>
                                    <th>Category</th>
                                    <th>Project Name</th>
                                    <th>Date</th>
                                    <th>State</th>
                                    <th>District</th>
                                    <th>Block / Tehsil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {podfProjects.map((project) => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.organization}</td>
                                        <td>{project.category}</td>
                                        <td>{project.name}</td>
                                        <td>{project.date}</td>
                                        <td>{project.state}</td>
                                        <td>{project.district}</td>
                                        <td>{project.block}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default PodfProjectsPage;
