import { useEffect, useState } from 'react';
import React from 'react';
import './searchbar.css';
import { useNavigate } from "react-router-dom";

function SearchBar({sendData, userData}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        sendData(search);
    }, [search]);

    const handleAddClick = () => {
        navigate("/CaseInfo", { state: { From: "insert", PatientData: userData } });
    };

    return ( 
        <div className="search-container">
            <div className='input-wrapper'>
                <i className="fas fa-search" id="search-icon"></i>
                <input 
                    placeholder='Search patients...' 
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="add-button-container">
                <button 
                    className='Add-button' 
                    onClick={handleAddClick}
                    title="Add New Patient"
                >
                    <i className="fas fa-plus"></i> Add
                </button>
            </div>
        </div>
    );
}

export default SearchBar;