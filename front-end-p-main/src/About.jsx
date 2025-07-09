import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

function About() {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            <div className="back-home-container">
                <button className="back-home-btn" onClick={() => navigate("/")}>
                    <i className="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>

            <div className="about-content">
                <div className="about-header">
                    <h1>About Our Platform</h1>
                    <div className="about-underline"></div>
                </div>

                <div className="about-sections">
                    <div className="about-section">
                        <h2>The Challenge</h2>
                        <p>
                            In healthcare, managing patient data is crucial yet challenging. Medical histories, 
                            diagnostic results, treatment plans, and surgical records are traditionally managed 
                            through paper files or disconnected computer systems. This fragmented approach leads to:
                        </p>
                        <ul>
                            <li>Misplaced or lost patient records</li>
                            <li>Redundant data entry across different systems</li>
                            <li>Delays in accessing critical information during consultations</li>
                            <li>Increased risk of medical errors</li>
                            <li>Reduced time for patient care due to administrative tasks</li>
                        </ul>
                    </div>

                    <div className="about-section">
                        <h2>Our Solution</h2>
                        <p>
                            We've developed a unified, accessible, and secure platform that modernizes healthcare 
                            data management. Our system:
                        </p>
                        <ul>
                            <li>Centralizes all patient information in one secure location</li>
                            <li>Eliminates redundant data entry</li>
                            <li>Provides instant access to critical patient information</li>
                            <li>Reduces administrative workload</li>
                            <li>Enhances accuracy in patient care</li>
                        </ul>
                    </div>

                    <div className="about-section">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to transform healthcare data management by providing a platform that 
                            enables physicians to focus on what matters most - patient care. By streamlining 
                            administrative processes and ensuring accurate, accessible patient information, we aim 
                            to improve healthcare delivery and patient outcomes.
                        </p>
                    </div>
                </div>

                <div className="about-contact">
                    <h2>Get Started</h2>
                    <p>Ready to modernize your healthcare data management?</p>
                    <div className="contact-info">
                        <p>Contact us to learn more about implementing our solution in your practice:</p>
                        <p>Email: halima.abdelli07@gmail.com</p>
                        <p>Phone: +213 675805115</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About; 