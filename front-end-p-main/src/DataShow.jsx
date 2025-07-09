import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './DataShow.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DataShow({search, userData}) {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = userData.userId;
        axios.get(`http://localhost:3001/getPatients/${userId}`)
            .then(res => setPatients(res.data))
            .catch(err => console.log(err));
    }, []);

    const columns = [
        { 
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            grow: 1
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
            grow: 1
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            grow: 1
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
            grow: 1
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="action-buttons">
                    <button 
                        onClick={() => handleUpdate(row.id)} 
                        className="update-btn"
                        title="Update Patient"
                    >
                        <i className="fas fa-edit"></i> Edit 
                    </button>
                    <button 
                        onClick={() => handleDelete(row.id)} 
                        className="delete-btn"
                        title="Delete Patient"
                    >
                        <i className="fas fa-trash"></i> Delete 
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            button: true,
            grow: 1
        }
    ];

    const handleRowDoubleClick = (row) => {
        setSelectedPatient(row);
        setShowDetails(true);
    };

    const handleUpdate = (id) => {
        const selectedUser = patients.find(user => user.id === id);
        if (selectedUser) {
            navigate(`/CaseInfo`, { state: { From: "update", PatientData: selectedUser } });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            axios.post("http://localhost:3001/deletePatients", {id})
                .then(() => window.location.reload())
                .catch(err => console.log(err));
        }
    };

    const filteredPatients = patients.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });

    const customStyles = {
        rows: {
            style: {
                minHeight: '60px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
    };

    return (
        <div className="data-show-container">
            <div className="data-table-container">
                <DataTable 
                    columns={columns}
                    data={filteredPatients}
                    fixedHeader
                    onRowDoubleClicked={handleRowDoubleClick}
                    highlightOnHover
                    pointerOnHover
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    noDataComponent={<div className="no-data">No patients found</div>}
                />
            </div>

            {showDetails && selectedPatient && (
                <div className="details-overlay" onClick={() => setShowDetails(false)}>
                    <div className="details-content" onClick={e => e.stopPropagation()}>
                        <div className="details-header">
                            <h2>Patient Details</h2>
                            <button className="close-button" onClick={() => setShowDetails(false)}>×</button>
                        </div>
                        <div className="details-body">
                            <div className="details-section">
                                <h3>Personal Information</h3>
                                <div className="details-grid">
                                    <div className="details-item">
                                        <span className="details-label">Name</span>
                                        <span className="details-value">{selectedPatient.name}</span>
                                    </div>
                                    <div className="details-item">
                                        <span className="details-label">Phone</span>
                                        <span className="details-value">{selectedPatient.phone}</span>
                                    </div>
                                    <div className="details-item">
                                        <span className="details-label">Email</span>
                                        <span className="details-value">{selectedPatient.email}</span>
                                    </div>
                                    <div className="details-item">
                                        <span className="details-label">Address</span>
                                        <span className="details-value">{selectedPatient.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="details-section">
                                <h3>Surgery Information</h3>
                                <div className="details-grid">
                                    <div className="details-item">
                                        <span className="details-label">Type of Surgery</span>
                                        <span className="details-value">{selectedPatient.typeOfSurgery}</span>
                                    </div>
                                    <div className="details-item">
                                        <span className="details-label">Name of Surgery</span>
                                        <span className="details-value">{selectedPatient.nameOfSurgery}</span>
                                    </div>
                                    <div className="details-item">
                                        <span className="details-label">Date of Intervention</span>
                                        <span className="details-value">{selectedPatient.dateOfIntervention}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="details-section">
                                <h3>Additional Information</h3>
                                <div className="details-item full-width">
                                    <span className="details-label">Observation</span>
                                    <span className="details-value">{selectedPatient.observation}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataShow;