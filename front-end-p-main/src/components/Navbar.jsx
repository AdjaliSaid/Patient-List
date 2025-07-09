import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/Logo.jpeg";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Function to check if user is logged in
    const isLoggedIn = () => {
        const userData = localStorage.getItem('userData');
        return userData !== null;
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/');
    };

    return (
        <nav className="nav">
            <div className="logo" onClick={() => navigate('/')}>
                <img src={logo} alt="Logo" className="logo-img" />
            </div>
            <div className="nav-buttons">
                {!isLoggedIn() ? (
                    // Not logged in - show login/signup
                    <>
                        <button 
                            className="nav-btn" 
                            onClick={() => navigate("/Login", { state: { action: "Login" } })}
                        >
                            Log in
                        </button>
                        <button 
                            className="nav-btn2" 
                            onClick={() => navigate("/Login", { state: { action: "SignUp" } })}
                        >
                            Sign up
                        </button>
                    </>
                ) : (
                    // Logged in - show navigation based on current page
                    <>
                        {location.pathname === '/home2' ? (
                            <>
                                <button 
                                    className="nav-btn" 
                                    onClick={() => navigate("/")}
                                >
                                    Home
                                </button>
                                <button 
                                    className="nav-btn2" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    className="nav-btn" 
                                    onClick={() => navigate("/home2")}
                                >
                                    Back to Dashboard
                                </button>
                                <button 
                                    className="nav-btn2" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar; 