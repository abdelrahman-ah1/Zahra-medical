
CREATE DATABASE IF NOT EXISTS zahra_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE zahra_db;

-- Create the reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    machine VARCHAR(255) NOT NULL,
    compliment TEXT,
    date_field DATE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create indexes for faster queries
CREATE INDEX idx_email ON reservations(email);
CREATE INDEX idx_date ON reservations(date_field);
