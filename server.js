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
  "Add Employee",
  "Update Employee Role",
  "View All Roles",
  "Add Role",
  "View All Departments",
  "Add Department",
  "Exit",
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
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
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
              console.error("Error while closing the database connection: " + err);
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

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID of the new employee?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager ID of the new employee?",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err) => {
        if (err) {
          console.error("Unable to add a newemployee: " + err);
        } else {
          console.log("A new employee has been added successfully.");
        }
        startApp();
      });
    });
}

function updateEmployee() {
  const employeeQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee";
  const roleQuery = "SELECT id, title FROM role";
  connection.query(employeeQuery, (err, employeeResults) => {
    if (err) {
      console.error("Issue selecting employee: " + err);
      return;
    }
    connection.query(roleQuery, (err, roleResults) => {
      if (err) {
        console.error("Issue selecting role: " + err);
        return;
      }
      const employeeChoices = employeeResults.map((employee) => ({
        name: employee.full_name,
        value: employee.id,
      }));
      const roleChoices = roleResults.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Choose an employee to update.",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "roleId",
            message: "What is the role ID of the employee?",
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          const updateQuery = "UPDATE employee SET role_id = ? WHERE id = ?";
          connection.query(updateQuery, [answers.roleId, answers.employeeId], (err) => {
            if (err) {
              console.error("Error updating employee role: " + err);
            } else {
              console.log("Employee role updated successfully.");
            }
            startApp();
          });
        });
    });
  });
}

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

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: "name",
        message: "What is the name of the new role?"
      },
      {
        type: "input",
        name: "wages",
        message: "How much will the new role make?"
      },
      {
        type: "input",
        name: "d_id",
        message: "What is the department ID that will be associated to this role?"
      }
    ])
    .then((answer) => {
      const sql = "INSERT INTO role (name, wages, d_id) VALUES (?, ?, ?)";
      db.query(sql, [answer.name, answer.wages, answer.d_id], (err) => {
        if (err) {
          console.error("Unable to add a new role: " + err);
        } else {
          console.log("A new role has successfully been added.")
        }
        startPrompts();
      });
    });
}

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
        name: "name",
        message: "What is the name of the new department?"
      },
    ])
    .then((answer) => {
      const sql = "INSERT INTO department (name) VALUES (?)";
      db.query(sql, [answer.name], (err) => {
        if (err) {
          console.error("Unable to add a new department: " + err);
        } else {
          console.log("A new department has successfully been added.")
        }
        startPrompts();
      });
    });
}

