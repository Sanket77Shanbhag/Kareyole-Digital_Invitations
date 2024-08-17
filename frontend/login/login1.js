const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, 'login')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  password: 'password',
  database: 'kareyole' 
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query to check if the user exists with provided email and password
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        //  send success response
        res.status(200).json({ message: 'Login successful' });
      } else {
        //  send error response
        res.status(401).json({ message: 'Invalid email or password' });
      }
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
