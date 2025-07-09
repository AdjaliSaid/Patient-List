import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PersonalInfo.css';
import axios from 'axios';

function PersonalInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        name: '',
        password: '',
        email: '',
        phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get user data from localStorage if not in location state
        const storedUserData = localStorage.getItem('userData');
        console.log('Stored User Data:', storedUserData);
        console.log('Location State:', location.state);

        if (location.state) {
            console.log('Using location state data');
            setUserData(location.state);
            setEditedData({
                name: location.state.name || location.state.username || '',
                password: location.state.password || '',
                email: location.state.email || '',
                phone: location.state.phone || ''
            });
        } else if (storedUserData) {
            console.log('Using localStorage data');
            try {
                const parsedData = JSON.parse(storedUserData);
                setUserData(parsedData);
                setEditedData({
                    name: parsedData.name || parsedData.username || '',
                    password: parsedData.password || '',
                    email: parsedData.email || '',
                    phone: parsedData.phone || ''
                });
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                navigate('/Login');
            }
        } else {
            console.log('No user data found, redirecting to login');
            navigate('/Login');
        }

        // Set current date
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        setCurrentDate(now.toLocaleDateString('en-US', options));
    }, [location.state, navigate]);

    const handleBack = () => {
        navigate('/home2', { state: userData });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError('');
    };

    const handleSave = async () => {
        try {
            // Validate required fields
            if (!editedData.name) {
                setError('Username is required');
                return;
            }
            if (!editedData.password) {
                setError('Password is required');
                return;
            }

            // Log the data we're about to send
            console.log('Current user data:', userData);
            console.log('Edited data:', editedData);

            // Get the user ID from the stored data
            const userId = userData.id || userData.userId || userData.user_id;
            console.log('User ID found:', userId);

            if (!userId) {
                console.error('User data structure:', userData);
                setError('User ID not found. Please try logging in again.');
                return;
            }

            const updateData = {
                id: userId,
                name: editedData.name,
                password: editedData.password,
                email: editedData.email,
                phone: editedData.phone
            };

            console.log('Sending update request with data:', updateData);

            // Update in database
            const response = await axios.post("http://localhost:3001/updateUser", updateData);

            console.log('Server response:', response.data);

            if (!response.data) {
                setError('Failed to update user information. Please try again.');
                return;
            }

            // Update local state with the response data
            const updatedUserData = {
                ...userData,
                ...response.data
            };
            
            setUserData(updatedUserData);
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            setIsEditing(false);
            setError('');
        } catch (error) {
            console.error('Error updating user:', error);
            if (error.response) {
                setError(`Server error: ${error.response.status} - ${error.response.data}`);
            } else if (error.request) {
                setError('No response from server. Please check your connection.');
            } else {
                setError('Failed to update user information. Please try again.');
            }
        }
    };

    const handleCancel = () => {
        setEditedData({
            name: userData.name || userData.username || '',
            password: userData.password || '',
            email: userData.email || '',
            phone: userData.phone || ''
        });
        setIsEditing(false);
        setError('');
    };

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Add loading state
    if (!userData) {
        return (
            <div className="personal-info-page">
                <div className="loading-message">Loading user information...</div>
            </div>
        );
    }

    return (
        <div className="personal-info-page">
            <div className="back-home-container">
                <button className="back-home-btn" onClick={handleBack}>
                    <i className="fas fa-arrow-left"></i> Back to Dashboard
                </button>
            </div>
            <div className="personal-info-container">
                <div className="info-header">
                    <h1>Personal Information</h1>
                    {!isEditing ? (
                        <button className="edit-btn" onClick={handleEdit}>
                            <i className="fas fa-edit"></i> Edit
                        </button>
                    ) : (
                        <div className="edit-buttons">
                            <button className="save-btn" onClick={handleSave}>
                                <i className="fas fa-save"></i> Save
                            </button>
                            <button className="cancel-btn" onClick={handleCancel}>
                                <i className="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    )}
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="info-card">
                    <div className="info-section">
                        <h2>Account Details</h2>
                        <div className="info-item">
                            <span className="info-label">Username:</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="edit-input"
                                />
                            ) : (
                                <span className="info-value">{userData.name || userData.username || 'Not available'}</span>
                            )}
                        </div>
                        <div className="info-item">
                            <span className="info-label">Password:</span>
                            {isEditing ? (
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={editedData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="edit-input"
                                    />
                                    <button 
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                                    </button>
                                </div>
                            ) : (
                                <span className="info-value">{userData.password || 'Not available'}</span>
                            )}
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editedData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="edit-input"
                                    placeholder="Enter your email"
                                />
                            ) : (
                                <span className="info-value">{userData.email || 'Not available'}</span>
                            )}
                        </div>
                        <div className="info-item">
                            <span className="info-label">Phone:</span>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={editedData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="edit-input"
                                    placeholder="Enter your phone number"
                                />
                            ) : (
                                <span className="info-value">{userData.phone || 'Not available'}</span>
                            )}
                        </div>
                        <div className="info-item">
                            <span className="info-label">Last Login:</span>
                            <span className="info-value">{currentDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfo; 