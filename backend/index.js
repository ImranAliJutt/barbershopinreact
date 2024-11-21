require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Allows cross-origin requests from your frontend

// Connect to MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'barbershop',
  port: process.env.DB_PORT || 3306,
});


// Establish connection to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Barbershop backend!');
});

// Endpoint to handle form submission
app.post('/api/appointments', (req, res) => {
  const { firstName, lastName, email, phone, date, description } = req.body;

  const sql = 'INSERT INTO appointments (firstName, lastName, email, phone, date, description) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, phone, date, description], (err) => {
    if (err) {
      console.error('Database error:', err);
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
      console.error('Database error:', err);
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
      console.error('Database error:', err);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Appointment not found');
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
      console.error('Database error:', err);
      return res.status(500).send('Server error');
    }
    if (results.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
