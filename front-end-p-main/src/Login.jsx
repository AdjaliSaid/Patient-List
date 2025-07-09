import user from './assets/user.png';
import password from './assets/password.png';
import eyeIcon from './assets/eye.png';
import emailIcon from './assets/email.png';
import phoneIcon from './assets/phone.png';
import './login.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from 'axios';

function Login() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [users, setUsers] = useState([]);
    const [action, setAction] = useState(location.state?.action || "Login");
    const [showMessage, setShowMessage] = useState(false);
    const [showMessage2, setShowMessage2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (location.state?.action) {
            setAction(location.state.action);
        }
    }, [location.state]);

    useEffect(() => {
        axios.get('http://localhost:3001/getUsers')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    const [userData, setUserData] = useState({
        name: "",
        password: "",
        email: "",
        phone: ""
    });

    const handleInputChange = (field, value) => {
        setUserData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    function valueExists() {
        return users.find(user => 
            user.name === userData.name && 
            user.password === userData.password
        )?.id || -1;
    }
    
    function HandleSignUp() {
        if (!userData.name || !userData.password || !userData.email || !userData.phone) {
            handleValidation();
            return;
        }

        setIsLoading(true);
        const id = valueExists();
        
        if (id === -1) {
            axios.post("http://localhost:3001/createUser", userData)
                .then(req => {
                    const newUserData = {
                        userId: req.data.insertId,
                        username: userData.name,
                        password: userData.password,
                        email: userData.email,
                        phone: userData.phone
                    };
                    localStorage.setItem('userData', JSON.stringify(newUserData));
                    navigate("/home2", { state: newUserData });
                })
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        } else {
            setShowMessage(true);
            setIsLoading(false);
        }
    }

    function HandleLogin() {
        if (!userData.name || !userData.password) {
            handleValidation();
            return;
        }

        setIsLoading(true);
        const id = valueExists();
        
        if (id !== -1) {
            const user = users.find(user => 
                user.name === userData.name && 
                user.password === userData.password
            );
            
            const userDataToStore = {
                userId: id,
                username: userData.name,
                password: userData.password,
                email: user.email || '',
                phone: user.phone || ''
            };
            localStorage.setItem('userData', JSON.stringify(userDataToStore));
            navigate("/home2", { state: userDataToStore });
        } else {
            setShowMessage2(true);
            setIsLoading(false);
        }
    }

    function handleValidation() {
        const nameInput = document.getElementById("name");
        const passwordInput = document.getElementById("password");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        
        if (!userData.name) {
            nameInput.classList.add("error");
        } else {
            nameInput.classList.remove("error");
        }
        
        if (!userData.password) {
            passwordInput.classList.add("error");
        } else {
            passwordInput.classList.remove("error");
        }

        if (action === "SignUp") {
            if (!userData.email) {
                emailInput.classList.add("error");
            } else {
                emailInput.classList.remove("error");
            }

            if (!userData.phone) {
                phoneInput.classList.add("error");
            } else {
                phoneInput.classList.remove("error");
            }
        }
    }

    return (
        <div className="login-container">
            <div className="back-home-container">
                <button className="back-home-btn" onClick={() => navigate("/")}>
                    <i className="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>

            <div className="auth-container">
                <div className="auth-header">
                    <h1>{action}</h1>
                    <div className="auth-underline"></div>
                </div>

                <div className="auth-form">
                    <div className="input-group" id="name">
                        <div className="input-icon">
                            <img src={user} alt="user icon" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={userData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </div>

                    <div className="input-group" id="password">
                        <div className="input-icon">
                            <img src={password} alt="password icon" />
                        </div>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={userData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        <button 
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                        >
                            <img src={eyeIcon} alt="toggle password visibility" className="eye-icon" />
                        </button>
                    </div>

                    {action === "SignUp" && (
                        <>
                            <div className="input-group" id="email">
                                <div className="input-icon">
                                    <img src={emailIcon} alt="email icon" />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={userData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>

                            <div className="input-group" id="phone">
                                <div className="input-icon">
                                    <img src={phoneIcon} alt="phone icon" />
                                </div>
                                <input 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    value={userData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className="submit-container">
                        {action === "Login" ? (
                            <button 
                                className="submit-btn" 
                                onClick={HandleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        ) : (
                            <button 
                                className="submit-btn" 
                                onClick={HandleSignUp}
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating account..." : "Sign Up"}
                            </button>
                        )}
                    </div>

                    {showMessage && (
                        <div className="error-message">
                            Username already exists. Please try another one.
                        </div>
                    )}
                    {showMessage2 && (
                        <div className="error-message">
                            Account not found. Please sign up first.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
