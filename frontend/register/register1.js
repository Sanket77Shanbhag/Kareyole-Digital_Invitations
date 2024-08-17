// 
import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

// const router = express.Router([mergeParams]);
const app = express();
app.use(express.static(path.join(__dirname, 'register')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ashadu@0403',
  database: 'kareyole'
});
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  app.get('/register.html', (req, res) => { 
    
    const { name, user_id, password } = req.body;

    // Check if the email already exists
    pool.query('SELECT * FROM users WHERE user_id = ?', [user_id], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (results.length > 0) {
          // Email already exists, send error response
          res.status(400).json({ message: 'Email already exists' });
        } else {
          // Email doesn't exist, insert new user into the database
          pool.query('INSERT INTO users ( user_id,name, password) ALUES (?, ?, ?)', [ user_id,name, password], (error, results) => {
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

});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
