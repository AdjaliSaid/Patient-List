import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlatformInfo.css';

function PlatformInfo() {
    const navigate = useNavigate();

    return (
        <div className="platform-container">
            <div className="back-home-container">
                <button className="back-home-btn" onClick={() => navigate("/")}>
                    <i className="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>

            <div className="platform-content">
                <div className="platform-header">
                    <h1>Our Platform Features</h1>
                    <div className="platform-underline"></div>
                </div>

                <div className="platform-sections">
                    <div className="platform-section">
                        <h2>Patient Management</h2>
                        <p>
                            Our platform provides a comprehensive patient management system that allows healthcare providers to:
                        </p>
                        <ul>
                            <li>Track patient progress and treatment plans</li>
                            <li>Manage appointments and follow-ups</li>
                            <li>Store and access medical records securely</li>
                            <li>Monitor treatment effectiveness</li>
                        </ul>
                    </div>

                    <div className="platform-section">
                        <h2>Data Analytics</h2>
                        <p>
                            Advanced analytics tools help healthcare providers make informed decisions:
                        </p>
                        <ul>
                            <li>Real-time data visualization</li>
                            <li>Treatment outcome analysis</li>
                            <li>Patient progress tracking</li>
                            <li>Resource allocation optimization</li>
                        </ul>
                    </div>

                    <div className="platform-section">
                        <h2>Communication Tools</h2>
                        <p>
                            Seamless communication between patients and healthcare providers:
                        </p>
                        <ul>
                            <li>Secure messaging system</li>
                            <li>Appointment reminders</li>
                            <li>Treatment updates</li>
                            <li>Emergency notifications</li>
                        </ul>
                    </div>

                    <div className="platform-section">
                        <h2>Security & Privacy</h2>
                        <p>
                            Your data security is our top priority:
                        </p>
                        <ul>
                            <li>End-to-end encryption</li>
                            <li>HIPAA compliance</li>
                            <li>Regular security audits</li>
                            <li>Data backup systems</li>
                        </ul>
                    </div>
                </div>

                <div className="platform-cta">
                    <h2>Ready to Get Started?</h2>
                    <p>Join our platform today and experience the difference in breast cancer care management.</p>
                    <button className="cta-button" onClick={() => navigate("/login")}>
                        Sign Up Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlatformInfo; 