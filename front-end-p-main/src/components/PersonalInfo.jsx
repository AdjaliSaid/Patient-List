import React, { useState } from 'react';
import '../home2.css';

function PersonalInfo({ userData }) {
    const [showPersonalInfo, setShowPersonalInfo] = useState(false);

    return (
        <div className="personal-info-container">
            <button 
                className="nav-btn" 
                onClick={() => setShowPersonalInfo(!showPersonalInfo)}
            >
                Personal Information
            </button>
            {showPersonalInfo && (
                <div className="personal-info-dropdown">
                    <div className="info-item">
                        <span className="info-label">Username:</span>
                        <span className="info-value">{userData?.username}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Password:</span>
                        <span className="info-value">{userData?.password}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PersonalInfo; 