
// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ashadu@0403',
  database: 'kareyole'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) throw err;
    res.json(result);
  });
});

app.get('/register', (req, res) => { 
    
  const { name, user_id, password } = req.body;

  // Check if the email already exists
  db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        // Email already exists, send error response
        res.status(400).json({ message: 'Email already exists' });
      } else {
        // Email doesn't exist, insert new user into the database
        db.query('INSERT INTO users ( user_id,name, password) ALUES (?, ?, ?)', [ user_id,name, password], (error, results) => {
          if (error) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            // User registered successfully, send success response
            res.status(200).json({ message: 'Registration successful' });
          }
        });
      }
    }
  });
});
/*
app.get('/employees/:id', (req, res) => {
  const id = req.params.id; 
  const sql = 'SELECT * FROM employee WHERE id = ?';
  db.query(sql, id, (err, result) => {
    console.log(result);
    if (err) throw err;
    res.json(result);
  });
});

app.post('/employees', (req, res) => {
  const employee = req.body;
  const sql = 'INSERT INTO employee SET ?';
  db.query(sql, employee, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const employee = req.body;
  console.log(employee);
  console.log(id);
  const sql = 'UPDATE employee SET ? WHERE id = ?';
  db.query(sql, [employee, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const sql = 'DELETE FROM employee WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
*/
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
=======
// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ashadu@0403',
  database: 'kareyole'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) throw err;
    res.json(result);
  });
});

app.get('/register', (req, res) => { 
    
  const { name, user_id, password } = req.body;

  // Check if the email already exists
  db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        // Email already exists, send error response
        res.status(400).json({ message: 'Email already exists' });
      } else {
        // Email doesn't exist, insert new user into the database
        db.query('INSERT INTO users ( user_id,name, password) ALUES (?, ?, ?)', [ user_id,name, password], (error, results) => {
          if (error) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            // User registered successfully, send success response
            res.status(200).json({ message: 'Registration successful' });
          }
        });
      }
    }
  });
});
/*
app.get('/employees/:id', (req, res) => {
  const id = req.params.id; 
  const sql = 'SELECT * FROM employee WHERE id = ?';
  db.query(sql, id, (err, result) => {
    console.log(result);
    if (err) throw err;
    res.json(result);
  });
});

app.post('/employees', (req, res) => {
  const employee = req.body;
  const sql = 'INSERT INTO employee SET ?';
  db.query(sql, employee, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const employee = req.body;
  console.log(employee);
  console.log(id);
  const sql = 'UPDATE employee SET ? WHERE id = ?';
  db.query(sql, [employee, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const sql = 'DELETE FROM employee WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
*/
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

