import { useState, useEffect } from "react";
import "./home2.css";
import bgImage from "./assets/home2.jpg";
import { useLocation, useNavigate } from "react-router-dom"; 
import SearchBar from "./SearchBar"; 
import DataShow from "./DataShow";
import logo from "./assets/Logo.jpeg";

function Home2() {
    const location = useLocation();
    const navigate = useNavigate();
    const [dataFromSearch, setDataFromSearch] = useState("");    
    const [userData, setUserData] = useState(null);    

    useEffect(() => {
        // Try to get user data from location state first
        if (location.state) {
            console.log('Setting user data from location state:', location.state);
            console.log('User ID in location state:', location.state.id || location.state.userId || location.state.user_id);
            setUserData(location.state);
            // Store in localStorage for persistence
            localStorage.setItem('userData', JSON.stringify(location.state));
        } else {
            // If not in location state, try to get from localStorage
            const storedData = localStorage.getItem('userData');
            if (storedData) {
                console.log('Setting user data from localStorage:', storedData);
                const parsedData = JSON.parse(storedData);
                console.log('User ID in localStorage:', parsedData.id || parsedData.userId || parsedData.user_id);
                setUserData(parsedData);
            } else {
                // If no data found, redirect to login
                console.log('No user data found, redirecting to login');
                navigate('/Login');
            }
        }
    }, [location.state, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/');
    };

    const handlePersonalInfo = () => {
        console.log('Navigating to personal info with data:', userData);
        navigate("/personal-info", { state: userData });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <nav className="nav">
                <div className="logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
                <div className="nav-buttons">
                    <button 
                        className="nav-btn" 
                        onClick={handlePersonalInfo}
                    >
                        Personal Information
                    </button>
                    <button 
                        className="nav-btn2" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="home" style={{ 
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover", 
                backgroundPosition: "center",
                height: "100vh", 
                width: "100%" 
            }}>
                <div className="search-bar-container">
                    <SearchBar sendData={setDataFromSearch} userData={userData}/>
                    <DataShow search={dataFromSearch} userData={userData} />
                </div>
            </div>
        </>
    );
}

export default Home2;
