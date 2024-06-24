// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'root',
    password: 'root',      
    database: 'testcrud' // The database name
});

db.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database.');
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the CRUD API');
});

// Create a user
app.post('/user', (req, res) => {
  let newUser = { name: req.body.name, email: req.body.email };
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, newUser, (err, result) => {
    if (err) throw err;
    res.send('User added...');
  });
});

// Read all users
app.get('/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a user
app.put('/user/:id', (req, res) => {
  let updatedUser = { name: req.body.name, email: req.body.email };
  let sql = `UPDATE users SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updatedUser, (err, result) => {
    if (err) throw err;
    res.send('User updated...');
  });
});

// Delete a user
app.delete('/user/:id', (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('User deleted...');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
