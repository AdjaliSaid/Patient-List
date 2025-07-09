const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app= express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"PatientsDB"
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully');
});

// Get user by ID
app.get("/getUser/:id", function(req, res) {
    const userId = req.params.id;
    console.log('Getting user with ID:', userId);
    
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], function(err, data) {
        if(err) {
            console.error('Database error:', err);
            return res.status(500).json("Error");
        }
        console.log('User data:', data);
        return res.json(data[0]);
    });
});

// Update user information
app.post("/updateUser", function(req, res) {
    console.log('Received update request:', req.body);
    
    // Validate required fields
    if (!req.body.id) {
        console.error('Missing user ID');
        return res.status(400).json("Missing user ID");
    }
    
    const VALUES = [
        req.body.name,
        req.body.password,
        req.body.email || '',
        req.body.phone || ''
    ];
    const id = req.body.id;
    
    console.log('Values to update:', VALUES);
    console.log('User ID:', id);
    
    // First check if user exists
    db.query("SELECT * FROM users WHERE id = ?", [id], function(err, data) {
        if(err) {
            console.error('Error checking user:', err);
            return res.status(500).json("Error checking user");
        }
        
        if(data.length === 0) {
            console.error('User not found with ID:', id);
            return res.status(404).json("User not found");
        }
        
        // If user exists, perform update
        const sql = "UPDATE users SET name=?, password=?, email=?, phone=? WHERE id=?";
        db.query(sql, [...VALUES, id], function(err, result) {
            if(err) {
                console.error('Database error:', err);
                return res.status(500).json("Database error: " + err.message);
            }
            console.log('Update successful:', result);
            
            // Get updated user data
            db.query("SELECT * FROM users WHERE id = ?", [id], function(err, updatedData) {
                if(err) {
                    console.error('Error getting updated data:', err);
                    return res.json(result);
                }
                return res.json(updatedData[0]);
            });
        });
    });
});

//start Patients handling
// response to home2 for print all the patients
app.get("/getPatients/:userId",function (req,res) {
    const id=req.params.userId;    
    const sql="SELECT * FROM patients WHERE userId = ?";
    db.query(sql,[id],function(err,data) {
        if(err) return res.json("Error");
        return res.json(data);
    });
})
// get request from home2 to insert a patient in database
app.post("/insertPatients",function (req,res) { 
    const VALUES = [
        req.body.name,
        req.body.address,
        req.body.typeOfSurgery,
        req.body.dateOfIntervention,
        req.body.nameOfSurgery,
        req.body.observation,
        req.body.phone,
        req.body.email,
        req.body.userId
    ];  
    const sql="INSERT INTO patients (name, address, typeOfSurgery, dateOfIntervention, nameOfSurgery, observation, phone, email, userId) VALUES(?,?,?,?,?,?,?,?,?)";
    db.query(sql,VALUES, function(err, data) {
        if(err) return res.json("Error");
        return res.json(data);
    });
})
// get request from home2 to update a patient in database
app.post("/updatePatients", function(req, res) { 
    console.log('Received patient update request:', req.body);
    
    // Validate required fields
    if (!req.body.id) {
        console.error('Missing patient ID');
        return res.status(400).json("Missing patient ID");
    }

    const VALUES = [
        req.body.name || '',
        req.body.address || '',
        req.body.typeOfSurgery || '',
        req.body.dateOfIntervention || '',
        req.body.nameOfSurgery || '',
        req.body.observation || '',
        req.body.phone || '',
        req.body.email || ''
    ];  

    const id = req.body.id;
    console.log('Updating patient with ID:', id);
    console.log('Values to update:', VALUES);

    // First check if patient exists
    db.query("SELECT * FROM patients WHERE id = ?", [id], function(err, data) {
        if(err) {
            console.error('Error checking patient:', err);
            return res.status(500).json("Error checking patient: " + err.message);
        }
        
        if(data.length === 0) {
            console.error('Patient not found with ID:', id);
            return res.status(404).json("Patient not found");
        }

        const sql = "UPDATE patients SET name=?, address=?, typeOfSurgery=?, dateOfIntervention=?, nameOfSurgery=?, observation=?, phone=?, email=? WHERE id=?";
        db.query(sql, [...VALUES, id], function(err, result) {
            if(err) {
                console.error('Database error:', err);
                return res.status(500).json("Database error: " + err.message);
            }
            console.log('Update successful:', result);
            
            // Get updated patient data
            db.query("SELECT * FROM patients WHERE id = ?", [id], function(err, updatedData) {
                if(err) {
                    console.error('Error getting updated data:', err);
                    return res.json(result);
                }
                console.log('Updated patient data:', updatedData[0]);
                return res.json(updatedData[0]);
            });
        });
    });
});
// get request from home2 to delete a patient in database
app.post("/deletePatients",function (req,res) { 
    const id=req.body.id;
    const sql="DELETE FROM patients WHERE id=?";
    db.query(sql,[id], function(err, data) {
        if(err) return res.json("Error");
        return res.json(data);
    });
})
//end Patients handling

//start users handling
// get request from home2 to insert a patient in database
app.post("/createUser",function (req,res) { 
    const VALUES = [
        req.body.name,
        req.body.password,
        req.body.email || '',
        req.body.phone || ''
    ];
    const sql="INSERT INTO users (name, password, email, phone) VALUES(?,?,?,?)";
    db.query(sql,VALUES,function(err,data) {
        if(err) {
            console.error('Error creating user:', err);
            return res.status(500).json("Error creating user");
        }
        console.log('User created successfully:', data);
        return res.json(data);
    });
})
// response to login for get all the users
app.get("/getUsers",function (req,res) {
    const sql="SELECT * FROM users";
    db.query(sql,function(err,data) {
        if(err) return res.json("Error");
        return res.json(data);
    });
})
//end users handling

app.listen(3001,function () {
    console.log("server is run");
})