// Bringing in necessary packages
// package to bring in inquirer questions for user prompt
const inquirer = require("inquirer");
// package to bring in my database
const mySql = require('mysql2');
// package to be able to see current database table in terminal
require('console.table');


// connecting to database 
const db = mySql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'company_employees_db'
    },
    console.log("connected to database!!")
);

// ============================================================================
// ============================================================================
// Functions to call throughout use of application

const init = () => {
  return inquirer.prompt([
    {
      type: 'list',
      message: "What would you like to do?",
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
      name: "userChoice"
    },
  ])

  .then((answers) => {
    console.log(answers)
    if(answers.userChoice === 'View all departments') {
      // query db to access database
      db.query('SELECT * FROM department', function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
      })
    } else if (answers.userChoice === 'View all roles') {
      db.query('SELECT roles.id, roles.title, roles.salary, department.name FROM roles JOIN department on roles.department_id = department.id', function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
      })
    } else if (answers.userChoice === 'View all employees') {
      db.query('SELECT * FROM employee', function(err, res) {
        if(err) throw err;
        console.table(res);
        init();
      })
    } else if (answers.userChoice === 'Add a department') {

    }
  })
}

// TODO:Left off --- finish up!!
const addDeptQ = () => {
   inquirer.prompt([
    {
       type: "input",
       message: "what is the name of the new department",
       title: "newDepartment"
    },

  ])
  .then((answers) => {
    db.query(`${answers.newDepartment}`, function (err) {
      if (err) throw err;
      console.log('New Department Added!')
    })
  })
}

// TODO: make a function to call when add a role is selected
const addRoleQ = () => {
  return inquirer.prompt([
    {

    },

  ])
}


// TODO: make a function to call when add a department is selected
const addEmployeeQ = () => {
  return inquirer.prompt([
    {

    },

  ])
}

// TODO: make a function to call when add a department is selected
const updateEmployeeQ = () => {
  return inquirer.prompt([
    {

    },

  ])
}



// ============================================================================
// ============================================================================
// To initialize application
init();