const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allows cross-origin requests from your frontend

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',  // Replace with your MySQL server host
    user: 'root',       // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'barbarshop' // Your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Endpoint to handle form submission
app.post('/api/appointments', (req, res) => {
    const { firstName, lastName, email, phone, date, description } = req.body;

    const sql = 'INSERT INTO appointments (firstName, lastName, email, phone, date, description) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, email, phone, date, description], (err, result) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.status(200).send('Appointment saved successfully');
    });
});

// Endpoint to get all appointments
app.get('/api/appointments', (req, res) => {
    const sql = 'SELECT * FROM appointments ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.status(200).json(results);
    });
});

// Endpoint to delete an appointment by ID
app.delete('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM appointments WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log database error
            return res.status(500).send('Server error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Appointment not found'); // Handle case where ID doesn't exist
        }
        res.status(200).send('Appointment deleted successfully');
    });
});

// Endpoint to update an appointment by ID
app.put('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, date, description } = req.body;
    const sql = 'UPDATE appointments SET firstName = ?, lastName = ?, email = ?, phone = ?, date = ?, description = ? WHERE id = ?';

    db.query(sql, [firstName, lastName, email, phone, date, description, id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Appointment not found');
        }
        res.status(200).send('Appointment updated successfully');
    });
});

// Endpoint to authenticate admin login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM admintable WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        return res.status(500).send('Server error');
      }
      if (results.length > 0) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  });

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
