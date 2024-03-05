const {fakerEN_IN: faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();


const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    port: process.env.PORTNUM,       
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,    
    database: process.env.DBNAME
});

