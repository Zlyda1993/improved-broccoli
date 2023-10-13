const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Code1993*',
    database: 'work_db',
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: " + err.stack);
        return;
    }
    console.log("Connected to the database as id" + db.threadId);
    startPrompts();
});


const startUpOptions = [
    "View All Employees",
    //   "Add Employee",
    //   "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "Exit",
];

const departmentChoices = [
    "Sales",
    "Engineering",
    "Finance",
    "Legal"
];

function startPrompts() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'viewEdit',
                choices: startUpOptions,
            },
        ])
        .then((answers) => {
            const selectedOption = answers.viewEdit;
            switch (selectedOption) {
                case "View All Employees":
                    viewEmployees();
                    break;
                //   case "Add Employee":
                //     addEmployee();
                //     break;
                //   case "Update Employee Role":
                //     updateEmployee();
                //     break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Exit":
                    db.end((err) => {
                        if (err) {
                            console.error("Error while closing the database db: " + err);
                        }
                        console.log("Exiting the application.");
                    });
                    break;
            }
        });
}

function viewEmployees() {
    const sql = 'SELECT * FROM employee';

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Unable to show employees: " + err);
            return;
        }
        console.table(results);
        startPrompts();
    });
};

function viewRoles() {
    const sql = 'SELECT * FROM roles';

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Unable to show roles: " + err);
            return;
        }
        console.table(results);
        startPrompts();
    });
};

function viewDepartments() {
    const sql = 'SELECT * FROM department'

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Unable to show departments: " + err);
            return;
        }
        console.table(results);
        startPrompts();
    });
};

function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the new department?',
        },
      ])
      .then((answer) => {
        const sql = 'INSERT INTO department (name) VALUES (?)';
        db.query(sql, [answer.name], (err) => {
          if (err) {
            console.error('Unable to add a new department: ' + err);
          } else {
            console.log('A new department has successfully been added.');
            departmentChoices.push(answer.name);
          }
          startPrompts();
        });
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the new role?',
        },
        {
          type: 'input',
          name: 'wages',
          message: 'How much will the new role make?',
        },
        {
          type: 'list',
          name: 'department',
          message: 'Select a department that this role will belong to.',
          choices: departmentChoices,
        },
      ])
      .then((answer) => {
        const departmentChoice = answer.department;
  
        const departmentId = departmentChoices.indexOf(departmentChoice) + 1;
  
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(sql, [answer.name, answer.wages, departmentId], (err) => {
          if (err) {
            console.error('Unable to add a new role: ' + err);
          } else {
            console.log('A new role has successfully been added.');
          }
          startPrompts();
        });
      });
  }

