const mysql = require("mysql2");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Code1993*",
  database: "work_db",
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database as id " + connection.threadId);
  startApp();
});
function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}
function viewDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying departments: " + err);
      return;
    }
    console.table(results);
    startApp();
  });
}
function viewRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying roles: " + err);
      return;
    }
    console.table(results);
    startApp();
  });
}
function viewEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying employees: " + err);
      return;
    }
    console.table(results);
    startApp();
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, [answer.name], (err) => {
        if (err) {
          console.error("Error adding department: " + err);
        } else {
          console.log("Department added successfully.");
        }
        startApp();
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the role title:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the role salary:",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID for the role:",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?";
      connection.query(query, [answer.title, answer.salary, answer.department_id], (err) => {
        if (err) {
          console.error("Error adding role: " + err);
        } else {
          console.log("Role added successfully.");
        }
        startApp();
      });
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role ID for the employee:",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the manager's ID for the employee:",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err) => {
        if (err) {
          console.error("Error adding employee: " + err);
        } else {
          console.log("Employee added successfully.");
        }
        startApp();
      });
    });
}
function updateEmployeeRole() {
  const employeeQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee";
  const roleQuery = "SELECT id, title FROM role";
  connection.query(employeeQuery, (err, employeeResults) => {
    if (err) {
      console.error("Error querying employees: " + err);
      return;
    }
    connection.query(roleQuery, (err, roleResults) => {
      if (err) {
        console.error("Error querying roles: " + err);
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
            message: "Select an employee to update:",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "roleId",
            message: "Select a new role for the employee:",
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