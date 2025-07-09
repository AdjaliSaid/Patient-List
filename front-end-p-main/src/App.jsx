import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import React from "react";
import Home2 from "./Home2"; 
import Login from "./Login";
import CaseInfo from "./CaseInfo"; // Import the new page component
import About from './About';
import PlatformInfo from './PlatformInfo';
import PersonalInfo from './PersonalInfo';
import './index.css';

function App() {
              
  return (
    // navbar
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/CaseInfo" element={<CaseInfo />} />
        <Route path="/platform" element={<PlatformInfo />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
      </Routes>
    </Router>
  );
}



export default App;


