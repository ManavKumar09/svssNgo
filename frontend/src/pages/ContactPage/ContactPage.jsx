import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ContactPage.css';

const DEFAULT_SETTINGS = {
    address: 'M-20/3-A, Saket Nagar, Bhopal-462001, Madhya Pradesh, India',
    phone1: '+91-9425373168',
    phone2: '',
    workingHours: 'Mon–Sat, 10am – 6pm',
    email: 'svssngobpl@gmail.com'
};

const ContactPage = () => {
    const [formStatus, setFormStatus] = useState('');
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.key) {
                        setSettings(prev => ({
                            ...prev,
                            address: data.address !== undefined ? data.address : prev.address,
                            phone1: data.phone1 !== undefined ? data.phone1 : prev.phone1,
                            phone2: data.phone2 !== undefined ? data.phone2 : '',
                            workingHours: data.workingHours !== undefined ? data.workingHours : prev.workingHours,
                            email: data.email !== undefined ? data.email : prev.email
                        }));
                    }
                }
            } catch (err) {
                console.warn('Could not fetch dynamic contact settings, using fallback values', err);
            }
        };

        fetchSettings();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormStatus("Sending...");
        const formData = new FormData(event.target);

        // Convert FormData to plain object for JSON submission
        const json = {};
        for (let [key, value] of formData.entries()) {
            json[key] = value;
        }

        try {
            const response = await fetch("http://localhost:5000/api/forms/contact", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });

            const data = await response.json();

            if (response.ok) {
                setFormStatus("Message sent successfully! We will get back to you soon.");
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
        <div className="contact-page">
            <div className="contact-page-header">
                <Navbar textTheme="dark" />
                <div className="contact-header-content">
                    <span className="contact-subtitle">CONTACT</span>
                    <h1 className="contact-title">Walk with us.</h1>
                    <p className="contact-description">
                        Whether you're a community member, a funder, a volunteer or a journalist — 
                        we'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="contact-content-container">
                <div className="contact-left-col">
                    <div className="contact-info-card">
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <div className="contact-info-text">
                            <h3>Head Office</h3>
                            <p>{settings.address}</p>
                        </div>
                    </div>

                    <div className="contact-info-card">
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <div className="contact-info-text">
                            <h3>Phone</h3>
                            <p>{settings.phone1}{settings.phone2 ? <><br/>{settings.phone2}</> : ''}<br/><span className="contact-time">{settings.workingHours}</span></p>
                        </div>
                    </div>

                    <div className="contact-info-card">
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <div className="contact-info-text">
                            <h3>Email</h3>
                            <p><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
                        </div>
                    </div>
                </div>

                <div className="contact-right-col">
                    <div className="message-form-container">
                        <h2 className="form-title">Send us a message</h2>
                        <form className="message-form" onSubmit={onSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input type="text" name="name" required />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input type="email" name="email" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject *</label>
                                <input type="text" name="subject" required />
                            </div>
                            <div className="form-group">
                                <label>Message *</label>
                                <textarea name="message" rows="6" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn" disabled={formStatus === "Sending..."}>
                                {formStatus === "Sending..." ? "Sending..." : "Send Message"}
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

export default ContactPage;
