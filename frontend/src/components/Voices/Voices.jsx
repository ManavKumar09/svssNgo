import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import './Voices.css';

const DEFAULT_VOICES = [
    {
        _id: 'default-1',
        quote: "Radio Awaz aur SVSS ki didi-bhaiyon ne humein swasthya aur paisa dono ki samajh di. Aaj humara ghar khud chal raha hai.",
        author: "Lata Devi",
        title: "SHG Member, Sehore"
    },
    {
        _id: 'default-2',
        quote: "SVSS has been one of our most consistent grass-root partners on RKSK, PPSA and the Axshya TB project across multiple districts.",
        author: "Block Health Officer",
        title: "NHM, Madhya Pradesh"
    }
];

const Voices = ({ showReadMore }) => {
    const [voicesList, setVoicesList] = useState(DEFAULT_VOICES);

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/voices');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setVoicesList(data);
                    }
                }
            } catch (err) {
                console.warn('Could not fetch dynamic voices, using fallback values', err);
            }
        };

        fetchVoices();
    }, []);

    return (
        <section className="voices-section" id="reviews">
            <FadeIn delay={0.1} className="voices-header">
                <h4 className="voices-subheading">VOICES</h4>
                <h2 className="voices-heading">
                    What communities and partners<br/>say.
                </h2>
            </FadeIn>
            
            <div className="voices-cards-container">
                {voicesList.map((item, index) => (
                    <FadeIn delay={0.2 + (index * 0.15)} className="voice-card" key={item._id || index}>
                        <p className="voice-quote">
                            "{item.quote}"
                        </p>
                        <div className="voice-author">
                            <span className="author-name">{item.author}</span>
                            <span className="author-title"> · {item.title}</span>
                        </div>
                    </FadeIn>
                ))}
            </div>

            {showReadMore && (
                <FadeIn delay={0.7} className="voices-footer">
                    <Link to="/about-us#reviews" className="voices-link">
                        Read all reviews <span className="arrow">→</span>
                    </Link>
                </FadeIn>
            )}
        </section>
    );
};

export default Voices;
