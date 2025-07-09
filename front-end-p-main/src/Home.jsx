import logo from "./assets/Logo.jpeg";
import bgImage from "./assets/connnn.jpg"; 
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate(); 

  return (
    <div className="home-container">
      <nav className="nav">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate("/Login", { state: { action: "Login" } })}>
            Log in
          </button>
          <button className="nav-btn2" onClick={() => navigate("/Login", { state: { action: "SignUp" } })}>
            Sign up
          </button>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Empowering Women Through Breast Cancer Awareness</h1>
          <p className="hero-subtitle">
            Join our community of support, education, and hope in the fight against breast cancer
          </p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => navigate("/Login", { state: { action: "SignUp" } })}>
              Join Our Community
            </button>
            <button className="secondary-btn" onClick={() => navigate("/about")}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;