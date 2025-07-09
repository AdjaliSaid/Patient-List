DROP DATABASE IF EXISTS PatientsDB;
CREATE DATABASE PatientsDB;
USE PatientsDB;

CREATE TABLE users (
    id INT(15) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(30)
);

CREATE TABLE patients (
    id INT(15) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    address VARCHAR(100),
    typeOfSurgery VARCHAR(50),
    dateOfIntervention DATE,
    nameOfSurgery VARCHAR(100),
    observation TEXT,
    phone VARCHAR(30),
    email VARCHAR(100),
    userId int,
    FOREIGN KEY(userId) REFERENCES users(id)
);