import mysql from'mysql2'
const {fakerEN_IN: faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();


const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    port: process.env.PORTNUM,       
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,    
    database: process.env.DBNAME
}).promise()


async function insertName(id,name){
    let attributeValAry = [id, name]; 
    pool.query("insert into name values (?)", [attributeValAry])
        .then((res)=>console.log(`inserted name ${attributeValAry} succesfully`))
        .catch((err)=>console.log(err));
}

async function insertPassword(id, name){
    let attributeValAry = [id, name];
    pool.query("insert into password values (?)", [attributeValAry])
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
}


module.exports = {
    insertName,
    insertPassword
}