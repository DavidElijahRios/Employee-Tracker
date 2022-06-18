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
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role'],
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
       addDeptQ();

    } else if (answers.userChoice === 'Add a role') {
      addRoleQ();

    } else if (answers.userChoice === 'Add an employee') {
      addEmployeeQ();

    } else if (answers.userChoice === 'Update employee role') {
      addUpdateQ();

    }
  })
}





// ============================================================================
// ============================================================================
// Functions to access new updated data from database to use as options to select in application.

// Function to get the department from db
const deptArr = [];

const updatedDeptDb = () => {
  db.query("SELECT * from department", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      deptArr.push(res[i].name)
    }
 })
 return deptArr;

} 


const roleArr = [];

const updatedRoleDb = () => {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roleArr.push(res[i].title)
      // console.log("******", roleArr)
    }
  })
   return roleArr;
}




const managers = [];

const managersDb = () => {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      managers.push(res[i].first_name + " " + res[i].last_name)
    }
  })
   return managers;
}



const allEmployeesDb = () => {
  const Employees = [];

  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      Employees.push(res[i].first_name + " " + res[i].last_name)
      // console.log("********",Employees)
    }
  })

   return Employees;
}







// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// =================================================================================================================
// Functions to use in application


const addDeptQ = () => {
  inquirer.prompt([
   {
      type: "input",
      message: "what is the name of the new department?",
      name: "newDepartment"
   },

 ])
 .then((answers) => {
   db.query(`
   INSERT INTO department (name)
      VALUES 
         ("${answers.newDepartment}")`, function (err) {
     if (err) throw err;
     console.log('New Department Added!');
     init();
   })
 })
}




const addRoleQ = () => {
  
  
 return inquirer.prompt([
    {
      type: "input",
      message: "what is the name of the new Role?",
      name: "newRole"
    },
    {
      type: "input",
      message: "what is the salary of the Role?",
      name: "newRoleSal"
    },
    {
      type: "list",
      message: "Which department does the Role belong to?",
      choices: updatedDeptDb(),
      name: "newRolDept"
    },
  ])

  .then((answers) => {
    const roleId = updatedDeptDb().indexOf(answers.newRolDept) + 1
     db.query(`
     INSERT INTO roles (title, salary, department_id)
       VALUES
            ("${answers.newRole}", ${answers.newRoleSal}, ${roleId})
       `, function (err) {
         if (err) throw err;
         console.log('New Role Added!')
         init();
       })
  })
}




const addEmployeeQ = () => {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the first name of the new Employee?",
      name: "firstName"
    },
    {
      type: "input",
      message: "What is the last name of the new Employee?",
      name: "lastName"
    },
    {
      type: "list",
      message: "What is the Employee's Role?",
      choices: updatedRoleDb(),
      name: "empRole"
    },
    {
      type: "list",
      message: "Who is the Employee's Manager?",
      choices: managersDb(),
      name: "empManager"
    },

  ])
  .then((answers) => {
    const roleId = updatedRoleDb().indexOf(answers.empRole) + 1
    const managerId = managersDb().indexOf(answers.empManager)
    db.query(`
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
       VALUES
            ("${answers.firstName}", "${answers.lastName}", ${roleId}, ${managerId})
    `, function (err) {
      if (err) throw err;
      console.log("New employee Added!")
      init();
    })
  })
}

// TODO: Finish the functionality of this last function 
// When I add a third input it works
const addUpdateQ = () => {

  const Employees = [];
  const roleArr = [];

  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      Employees.push(res[i].first_name + " " + res[i].last_name)
      // console.log("********",Employees)
    }

    db.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        roleArr.push(res[i].title)
      }
    })


    console.log();
    
    return inquirer.prompt([
      {
        type: "list",
        message: "Which employee's role do you want to update?",
        choices: Employees,
        name: "upEmployee"
      },
      {
        type: "list",
        message: "Which role do you want to assign the selected employee?",
        choices: roleArr,
        name: "upRole"
      },
  
    ])
  })

  // TODO Finish this update query
  .then((answers) => {
    db.query(`
        SELECT last_name FROM employees WHERE last_name = 
    `, function (err) {
      if (err) throw err;
      console.log("Updated employee's role!")
          init()
    })
  })
}









// ============================================================================
// ============================================================================
// To initialize application
init();