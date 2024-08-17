const express = require("express");
const path = require("path");
const bodyparser = require("body-parser")
// const cookie = require("cookie-parser")
const port = "3000";
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");
const { access } = require("fs");
dotenv.config();




const pool = mysql.createPool({
  host: 'localhost',
  port: process.env.PORTNUM,       
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,   
  database: process.env.DBNAME,
  
}).promise();

app.use(express.static(path.join(__dirname, "/Public/css")));
app.use(express.static(path.join(__dirname, "/Public/JS")));
app.use(express.static(path.join(__dirname, "/Public/image")));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookie());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Under test
// Contact us part 
app.post('/contact_us', (req, res) => {
  const { name, email, message } = req.body;

  connection.query(
      'INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?)',
      [name, email, message],
      (err, result) => {
          if (err) {
              console.error(err);
              res.status(500).send('Error storing data');
          } else {
              res.send('Data stored successfully');
          }
      }
  );
});
// Above ok below don't know no idea what to do

app.use(express.json())

app.get("/notes", async (req, res) => {
  const notes = await getNotes()
  res.send(notes)
})

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  const note = await getNote(id)
  res.send(note)
})

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body
  const note = await createNote(title, contents)
  res.status(201).send(note)
})


// <<<<<<< HEAD
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// =======
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})



