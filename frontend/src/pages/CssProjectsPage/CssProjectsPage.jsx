import React, { useEffect } from 'react';
import './CssProjectsPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const CssProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cssProjects = [
        { id: 1, organization: 'NABARD MP RO', category: 'CSS', name: 'Ajyodhya Far. Producer company Limited', date: '18-11-2021', state: 'Madhya Pradesh', district: 'Shajapur', block: 'Shajapur' },
        { id: 2, organization: 'NABARD MP RO', category: 'CSS', name: 'Kalapipal Far.Pro.Com. LTD', date: '18-08-2021', state: 'Madhya Pradesh', district: 'Shajapur', block: 'Kalapipal' },
        { id: 3, organization: 'NABARD MP RO', category: 'CSS', name: 'Kanchanvarni Far. Pro.Com.LTD.', date: '05-08-2021', state: 'Madhya Pradesh', district: 'Shajapur', block: 'Shujalpur' },
        { id: 4, organization: 'NABARD MP RO', category: 'CSS', name: 'Vat Savitri Jaivik Far.pro. Com. LTD.', date: '21-07-2021', state: 'Madhya Pradesh', district: 'Bhopal', block: 'Phanda' },
        { id: 5, organization: 'NABARD MP RO', category: 'CSS', name: 'Semrighat Far.Pro.Com. LTD.', date: '09-05-2022', state: 'Madhya Pradesh', district: 'Raisen', block: 'Badi' },
        { id: 6, organization: 'NABARD MP RO', category: 'CSS', name: 'Kisanoday Far. Pro. Com. LTD.', date: '26-04-2022', state: 'Madhya Pradesh', district: 'Raisen', block: 'Sanchi' },
        { id: 7, organization: 'NABARD MP RO', category: 'CSS', name: 'Jai Balram Food and Crop Silwani Far. Pro. Com', date: '31-03-2022', state: 'Madhya Pradesh', district: 'Raisen', block: 'Silwani' },
        { id: 8, organization: 'NABARD MP RO', category: 'CSS', name: 'Chandrakeshar Food and Agritech Pro.Com LTD.', date: '31-03-2022', state: 'Madhya Pradesh', district: 'Dewas', block: 'Kannod' },
        { id: 9, organization: 'NABARD MP RO', category: 'CSS', name: 'Narmadeshwar Far.Pro. Com. LTD.', date: '14-04-2022', state: 'Madhya Pradesh', district: 'Dewas', block: 'Khategaon' },
        { id: 10, organization: 'NABARD MP RO', category: 'CSS', name: 'Sivan Jaivik Far.Pro.Com. LTD.', date: '05-08-2021', state: 'Madhya Pradesh', district: 'Sehore', block: 'Sehore' },
        { id: 11, organization: 'NABARD MP RO', category: 'CSS', name: 'Mo. Badodiya Far. Pro.Com. LTD.', date: '28-07-2022', state: 'Madhya Pradesh', district: 'Shajapur', block: 'Mohan Badodiya' },
        { id: 12, organization: 'NABARD MP RO', category: 'CSS', name: 'Rehti Crop Producer Company LTD', date: '16-11-2022', state: 'Madhya Pradesh', district: 'Sehore', block: 'Rehti' },
        { id: 13, organization: 'NABARD MP RO', category: 'CSS', name: 'Bherundakanth Farmer Producer Co. LTD.', date: '06-12-2022', state: 'Madhya Pradesh', district: 'Sehore', block: 'Nasrullaganj' },
        { id: 14, organization: 'NABARD MP RO', category: 'CSS', name: 'Bijadandi Farmer Producer Company Limited', date: '12-08-2021', state: 'Madhya Pradesh', district: 'Mandla', block: 'Bijadandi' },
        { id: 15, organization: 'NABARD MP RO', category: 'CSS', name: 'Mawai Farmer Producer Company Limited', date: '18-08-2021', state: 'Madhya Pradesh', district: 'Mandla', block: 'Mawai' },
        { id: 16, organization: 'NAFED CG', category: 'CSS', name: 'Farmotech Fed Far.Pro.Com. LTD', date: '24-01-2022', state: 'Chattisgarh', district: 'Bilaspur', block: 'Masturi' },
        { id: 17, organization: 'NAFED CG', category: 'CSS', name: 'Kota mahamaya Fed.Far.Pro.Com. LTD', date: '25-03-2022', state: 'Chattisgarh', district: 'Bilaspur', block: 'kota' },
        { id: 18, organization: 'NAFED CG', category: 'CSS', name: 'Bilha Upajau Fed. Far.pro. Com.LTD', date: '08-03-2022', state: 'Chattisgarh', district: 'Bilaspur', block: 'Bilha' },
        { id: 19, organization: 'NAFED CG', category: 'CSS', name: 'Aagranchal Fed.Far.Pro.Com. LTD', date: '06-06-2022', state: 'Chattisgarh', district: 'Mungeli', block: 'Mungeli' },
        { id: 20, organization: 'NAFED CG', category: 'CSS', name: 'Ultapani Valley Fed.Far. Pro. Com.LTD', date: '17-06-2022', state: 'Chattisgarh', district: 'Sarguja', block: 'Mainpat' },
        { id: 21, organization: 'NAFED CG', category: 'CSS', name: 'Surguja karmayogi Agrofed Farmer Producer company LTD.', date: '19-08-2021', state: 'Chattisgarh', district: 'Sarguja', block: 'Lundra' },
        { id: 22, organization: 'NAFED CG', category: 'CSS', name: 'Khudiya fed farmer producer company LTD.', date: '18-07-2022', state: 'Chattisgarh', district: 'Mungeli', block: 'Lormi' },
        { id: 23, organization: 'NAFED CG', category: 'CSS', name: 'SANKALP SHAKTI AGROFED KRISHAK UTPADAK BAHUDDESH', date: '02-07-2021', state: 'Chattisgarh', district: 'Koriya', block: 'Baikunthpur' },
        { id: 24, organization: 'NAFED CG', category: 'CSS', name: 'SONHAT GAURAV AGROFED KRISHAK UTPADAK BAHUDDESH', date: '02-07-2021', state: 'Chattisgarh', district: 'Koriya', block: 'Sonhut' },
    ];

    return (
        <div className="css-projects-page" style={{ paddingTop: '0' }}>
            <Navbar textTheme="dark" />
            
            <section className="css-projects-hero">
                <div className="css-projects-hero-content">
                    <h1>Projects under <span className="highlight">CSS</span></h1>
                    <p>Formation and Promotion of 10,000 Farmer Producer Organizations (FPOs)</p>
                </div>
            </section>

            <section className="css-projects-section">
                <div className="css-projects-container">
                    <p className="css-projects-subtitle">Details of the ongoing FPOs supported by various implementation agencies</p>
                    
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
                                {cssProjects.map((project) => (
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

export default CssProjectsPage;
