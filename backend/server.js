require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER ,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Barbershop backend!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});