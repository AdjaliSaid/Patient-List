import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CaseInfo.css'; 
import axios from 'axios';
import bgImage from './assets/home2.jpg';

function CaseInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [PatientData, setPatientData] = React.useState(location.state.PatientData || {});

  const handleInputChange = (field, value) => {
    setPatientData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  
  function handleSubmit(event) {  
    event.preventDefault();
    const {
      name,
      address,
      typeOfSurgery,
      dateOfIntervention,
      nameOfSurgery,
      observation,
      phone,
      email,
      userId
    } = PatientData;
    
    // Format the date to YYYY-MM-DD
    const formattedDate = dateOfIntervention ? new Date(dateOfIntervention).toISOString().split('T')[0] : '';
    
    if(name) {
      if(location.state.From === "insert") {
        axios.post("http://localhost:3001/insertPatients", {
          name,
          address,
          typeOfSurgery,
          dateOfIntervention: formattedDate,
          nameOfSurgery,
          observation,
          phone,
          email,
          userId
        })
        .then(response => {
          console.log('Insert successful:', response.data);
          navigate(-1);
        })
        .catch(error => {
          console.error('Error inserting patient:', error);
          const errorMessage = error.response?.data || 'Failed to add patient. Please try again.';
          alert(errorMessage);
        });
      } else {
        const id = location.state?.PatientData.id;
        if (!id) {
          alert('Patient ID not found. Please try again.');
          return;
        }

        console.log('Updating patient with ID:', id);
        console.log('Update data:', {
          id,
          name,
          address,
          typeOfSurgery,
          dateOfIntervention: formattedDate,
          nameOfSurgery,
          observation,
          phone,
          email
        });

        axios.post("http://localhost:3001/updatePatients", {
          id,
          name,
          address,
          typeOfSurgery,
          dateOfIntervention: formattedDate,
          nameOfSurgery,
          observation,
          phone,
          email
        })
        .then(response => {
          console.log('Update successful:', response.data);
          if (response.data) {
            navigate(-1);
          } else {
            alert('Failed to update patient. No data returned from server.');
          }
        })
        .catch(error => {
          console.error('Error updating patient:', error);
          const errorMessage = error.response?.data || 'Failed to update patient. Please try again.';
          alert(errorMessage);
        });
      }
    } else {
      const labelName = document.getElementById("nameLabel");
      const inputName = document.getElementById("name");
      labelName.style.color = "red";
      inputName.style.border = '2px solid red';
    }
  }

  return (
    <div className="case-info-container" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      width: "100vw",
      margin: "0",
      padding: "20px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      position: "relative",
      overflowY: "auto"
    }}>
      <div className="back-home-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
          <span>Back</span>
        </button>
      </div>
      <div className="container">
        <div className="header">
          <div className="text">Patient Information</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label id="nameLabel" htmlFor="name">Name</label>
              <input 
                id="name" 
                type="text" 
                placeholder="Enter patient's name" 
                value={PatientData.name || ''} 
                onChange={(e) => handleInputChange('name', e.target.value)} 
              />
            </div>

            <div className="input-field">
              <label htmlFor="address">Address</label>
              <input 
                id="address" 
                type="text" 
                placeholder="Enter patient's address" 
                value={PatientData.address || ''} 
                onChange={(e) => handleInputChange('address', e.target.value)} 
              />
            </div>

            <div className="input-field">
              <label htmlFor="typeOfSurgery">Type of Surgery</label>
              <input 
                id="typeOfSurgery" 
                type="text" 
                placeholder="Enter type of surgery" 
                value={PatientData.typeOfSurgery || ''} 
                onChange={(e) => handleInputChange('typeOfSurgery', e.target.value)} 
              />
            </div>

            <div className="input-field">
              <label htmlFor="dateOfIntervention">Date of Intervention</label>
              <input 
                id="dateOfIntervention" 
                type="date" 
                value={PatientData.dateOfIntervention || ''} 
                onChange={(e) => handleInputChange('dateOfIntervention', e.target.value)} 
              />
            </div>

            <div className="input-field">
              <label htmlFor="nameOfSurgery">Name of Surgery</label>
              <input 
                id="nameOfSurgery" 
                type="text" 
                placeholder="Enter name of surgery" 
                value={PatientData.nameOfSurgery || ''} 
                onChange={(e) => handleInputChange('nameOfSurgery', e.target.value)} 
              />
            </div>

            <div className="input-field">
              <label htmlFor="observation">Observation</label>
              <textarea 
                id="observation" 
                placeholder="Enter observations" 
                value={PatientData.observation || ''} 
                onChange={(e) => handleInputChange('observation', e.target.value)} 
                rows="3"
              />
            </div>

            <div className="input-field">
              <label htmlFor="phone">Phone</label>
              <input 
                id="phone" 
                type="tel" 
                placeholder="Enter patient's phone number" 
                value={PatientData.phone || ''} 
                onChange={(e) => handleInputChange('phone', e.target.value)} 
              />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="Enter patient's email" 
                value={PatientData.email || ''} 
                onChange={(e) => handleInputChange('email', e.target.value)} 
              />
            </div>

            <div className='submit-container'>
              <button className='sub-btn' type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CaseInfo;

