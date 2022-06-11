// Bringing in necessary packages
// TODO: Maybe bring index.js file here and write what function needed in there
// package to bring in inquirer questions for user prompt
const inquirer = require("inquirer");
// package to bring in my database
const mySql = require('mysql2');
// package to be able to see current database table in terminal
const cTable = require('console.table');
// package to use express to be able to run server
const express = require('express');

// ==============================================
// ==============================================

// creating port for local server 
const PORT = process.env.PORT || 3001
// variable to be able to use express functions
const app = express();

// ==============================================
// ==============================================

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ==============================================
// ==============================================


// connecting to database 
const db = mySql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: ''
    },
    console.log("connected to database!!")
);

// ===============================================
// ===============================================

// TODO: input functions to execute when application starts to run 


// ===============================================
// ===============================================

// for application to run server and what port it is listening to 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });