import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './VolunteerPage.css';

const VolunteerPage = () => {
    const [formStatus, setFormStatus] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormStatus("Sending...");
        const formData = new FormData(event.target);

        try {
            const response = await fetch("http://localhost:5000/api/forms/volunteer", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setFormStatus("Application submitted successfully! We will contact you soon.");
                event.target.reset();
            } else {
                console.error("Error", data);
                setFormStatus(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error", error);
            setFormStatus("Network error. Please try again.");
        }
    };

    return (
        <div className="policies-page">
            <div className="policies-page-header">
                <Navbar textTheme="dark" />
                <div className="policies-header-content">
                    <span className="policies-subtitle">VOLUNTEER & INTERN</span>
                    <h1 className="policies-title">Join us in the field.</h1>
                    <p className="policies-description">
                        Apply to spend time with us contributing to our programmes. We host students and professionals for field internships of 4–12 weeks.
                    </p>
                </div>
            </div>

            <div className="policies-content-container">


                <div className="policies-right-col">
                    <div className="volunteer-form-container">
                        <div className="form-header">
                            <span className="form-subtitle">APPLY TO VOLUNTEER</span>
                            <h2 className="form-title">Spend a season with us in the field.</h2>
                        </div>
                        <form className="volunteer-form" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Name *</label>
                                <div className="name-fields">
                                    <input type="text" name="first_name" placeholder="First" required />
                                    <input type="text" name="last_name" placeholder="Last" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label>College / Current employer *</label>
                                <input type="text" name="college_employer" required />
                            </div>
                            <div className="form-group">
                                <label>Recommender (faculty / staff) *</label>
                                <input type="text" name="recommender" placeholder="Name, designation, email" required />
                            </div>
                            <div className="form-group">
                                <label>Resume (Upload or Link) *</label>
                                <div className="resume-upload-group">
                                    <input type="file" name="attachment" accept=".pdf,.doc,.docx" />
                                    <span style={{ margin: '10px 0', display: 'block', fontSize: '14px', color: '#666' }}>OR provide a link:</span>
                                    <input type="url" name="resume_link" placeholder="Drive / LinkedIn URL" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Statement of purpose *</label>
                                <textarea name="statement_of_purpose" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn" disabled={formStatus === "Sending..."}>
                                {formStatus === "Sending..." ? "Submitting..." : "Submit Application"}
                            </button>
                            {formStatus && (
                                <div className={`form-status-message ${formStatus.includes("error") || formStatus.includes("wrong") ? "error" : "success"}`} style={{ marginTop: '15px', padding: '10px', borderRadius: '5px', backgroundColor: formStatus.includes("error") || formStatus.includes("wrong") ? '#fdecea' : '#eafdf0', color: formStatus.includes("error") || formStatus.includes("wrong") ? '#d93025' : '#1e8e3e' }}>
                                    {formStatus}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default VolunteerPage;
