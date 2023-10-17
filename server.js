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
  "Update Employees Manager",
  "View Employees by Manager",
  "View Employees by Department",
  "Delete Department",
  "Delete Role",
  "Delete Employee",
  "View Total Salary",
  "Exit"
];

const departmentChoices = [
  "Sales",
  "Engineering",
  "Finance",
  "Legal"
];

const managerChoices = [
  "John Doe",
  "Mike Chan",
  "Ashley Rodriguez",
  "Kevin Tupik",
  "Kunal Singh",
  "Malia Brown",
  "Sarah Lourd",
  "Tom Allen"
];

const roleChoices = [
  "Sales Lead",
  "Salesperson",
  "Lead Engineer",
  "Software Engineer",
  "Account Manager",
  "Accountant",
  "Legal Team Lead",
  "Lawyer"
];

const employeeChoices = [
  "John Doe",
  "Mike Chan",
  "Ashley Rodriguez",
  "Kevin Tupik",
  "Kunal Singh",
  "Malia Brown",
  "Sarah Lourd",
  "Tom Allen"
]

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
        case "Update Employees Manager":
          updateEmployeeManager()
          break;
        case "View Employees by Manager":
          viewEmployeesByManager()
          break;
        case "View Employees by Department":
          viewEmployeesByDepartment()
          break;
        case "Delete Department":
          deleteDepartment()
          break;
        case "Delete Role":
          deleteRole()
          break;
        case "Delete Employee":
          deleteEmployee()
          break;
        case "View Total Salary":
          viewSalarySum()
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

function viewSalarySum() {
  const sql = 'SELECT SUM(salary) AS total_salary FROM roles';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error calculating total salary: ' + err);
    } else {
      const totalSalary = result[0].total_salary;
      console.log('Total salary of all roles: $' + totalSalary);
    }
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
          roleChoices.push(answer.name, answer.wages, answer.department);
        }
        startPrompts();
      });
    });
}


function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the new employees first name?',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the new employees last name?',
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the new employees role?',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is the new employees manager?',
        choices: managerChoices,
      },
    ])
    .then((answer) => {
      const managerChoice = answer.manager;
      const selectedRole = answer.role;

      const roleId = roleChoices.indexOf(selectedRole) + 1;
      const managerId = managerChoices.indexOf(managerChoice) + 1;

      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      db.query(sql, [answer.first_name, answer.last_name, roleId, managerId], (err) => {
        if (err) {
          console.error('Unable to add a new employee: ' + err);
        } else {
          console.log('A new employee has successfully been added.');
          employeeChoices.push(answer.first_name, answer.last_name, answer.role, answer.manager);
        }
        startPrompts();
      });
    });
}

function updateEmployee() {
  const employeeQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee";
  const roleQuery = "SELECT id, title FROM roles";
  db.query(employeeQuery, (err, employeeResults) => {
    if (err) {
      console.error("Issue selecting employee: " + err);
      return;
    }
    db.query(roleQuery, (err, roleResults) => {
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
          db.query(updateQuery, [answers.roleId, answers.employeeId], (err) => {
            if (err) {
              console.error("Error updating employee role: " + err);
            } else {
              console.log("Employee role updated successfully.");
            }
            startPrompts();
          });
        });
    });
  });
}

function updateEmployee() {
  const employeeQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee";
  const roleQuery = "SELECT id, title FROM roles";
  db.query(employeeQuery, (err, employeeResults) => {
    if (err) {
      console.error("Issue selecting employee: " + err);
      return;
    }
    db.query(roleQuery, (err, roleResults) => {
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
          db.query(updateQuery, [answers.roleId, answers.employeeId], (err) => {
            if (err) {
              console.error("Error updating employee role: " + err);
            } else {
              console.log("Employee role updated successfully.");
            }
            startPrompts();
          });
        });
    });
  });
}

function updateEmployeeManager() {
  const employeeQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee";
  db.query(employeeQuery, (err, employeeResults) => {
    if (err) {
      console.error("Issue selecting employee: " + err);
      return;
    }

    const employeeChoices = employeeResults.map((employee) => ({
      name: employee.full_name,
      value: employee.id,
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
          name: "managerId",
          message: "Select the new manager for the employee:",
          choices: employeeChoices,
        },
      ])
      .then((answers) => {
        const updateQuery = "UPDATE employee SET manager_id = ? WHERE id = ?";
        db.query(updateQuery, [answers.managerId, answers.employeeId], (err) => {
          if (err) {
            console.error("Error updating employee manager: " + err);
          } else {
            console.log("Employee manager updated successfully.");
          }
          startPrompts();
        });
      });
  });
}

function viewEmployeesByManager() {
  const sql = `
    SELECT
      M.id AS manager_id,
      CONCAT(M.first_name, ' ', M.last_name) AS manager_name,
      E.id AS employee_id,
      CONCAT(E.first_name, ' ', E.last_name) AS employee_name
    FROM
      employee E
      LEFT JOIN employee M ON E.manager_id = M.id
    ORDER BY
      manager_name, employee_name;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Unable to view employees by manager: " + err);
      return;
    }
    console.table(results);
    startPrompts();
  });
};

function viewEmployeesByDepartment() {
  const sql = `
  SELECT
  roles.department_id AS department_id,
  department.name AS department_name,
  employee.id AS employee_id,
  CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name
FROM
  employee
  INNER JOIN roles ON employee.role_id = roles.id
  INNER JOIN department ON roles.department_id = department.id
ORDER BY
  department_name, employee_name;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error viewing employees by department: " + err);
      return;
    }

    console.log("List of Employees by Department:");
    let currentDepartment = null;

    results.forEach((row) => {
      if (row.department_name !== currentDepartment) {
        currentDepartment = row.department_name;
        console.log(`Department: ${row.department_name}`);
      }

      console.log(`Employee: ${row.employee_name}`);
    });

    startPrompts();
  });
}

function deleteDepartment() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'department',
        message: 'Which department would you like to delete?',
        choices: departmentChoices,
      },
    ])
    .then((answer) => {

      const selectedDepartment = answer.department;

      const departmentId = departmentChoices.indexOf(selectedDepartment) + 1;

      const checkDependenciesQuery = `
        SELECT COUNT(*) AS count
        FROM roles
        WHERE department_id = ?;
      `;

      db.query(checkDependenciesQuery, [departmentId], (err, results) => {
        if (err) {
          console.error('Error checking dependencies: ' + err);
          return startPrompts();
        }

        const dependencyCount = results[0].count;

        if (dependencyCount > 0) {
          console.log('Cannot delete the department because it has dependencies (e.g., roles).');
          return startPrompts();
        }

        const deleteQuery = 'DELETE FROM department WHERE id = ?';

        db.query(deleteQuery, [departmentId], (err) => {
          if (err) {
            console.error('Unable to delete department: ' + err);
          } else {
            console.log('The department has been successfully deleted.');
          }
          startPrompts();
        });
      });
    });
}

function deleteRole() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Which role would you like to delete?',
        choices: roleChoices,
      },
    ])
    .then((answer) => {
      const selectedRole = answer.role;
      const roleId = roleChoices.indexOf(selectedRole) + 1;

      const checkDependenciesQuery = `
        SELECT COUNT(*) AS count
        FROM employee
        WHERE role_id = ?;
      `;

      db.query(checkDependenciesQuery, [roleId], (err, results) => {
        if (err) {
          console.error('Error checking dependencies: ' + err);
          return startPrompts();
        }

        const dependencyCount = results[0].count;

        if (dependencyCount > 0) {
          console.log('Cannot delete the role because it has dependencies (e.g., employees).');
          return startPrompts();
        }

        const deleteQuery = 'DELETE FROM roles WHERE id = ?';

        db.query(deleteQuery, [roleId], (err) => {
          if (err) {
            console.error('Unable to delete role: ' + err);
          } else {
            console.log('The role has been successfully deleted.');
          }
          startPrompts();
        });
      });
    });
}

function deleteEmployee() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to delete?',
        choices: employeeChoices,
      },
    ])
    .then((answer) => {
      const selectedEmployee = answer.employee;
      const employeeId = employeeChoices.indexOf(selectedEmployee) + 1;

      const checkDependenciesQuery = `
        SELECT COUNT(*) AS count
        FROM employee
        WHERE manager_id = ?;
      `;

      db.query(checkDependenciesQuery, [employeeId], (err, results) => {
        if (err) {
          console.error('Error checking dependencies: ' + err);
          return startPrompts();
        }

        const dependencyCount = results[0].count;

        if (dependencyCount > 0) {
          console.log('Cannot delete the employee because they have dependencies (e.g., subordinates).');
          return startPrompts();
        }

        const deleteQuery = 'DELETE FROM employee WHERE id = ?';

        db.query(deleteQuery, [employeeId], (err) => {
          if (err) {
            console.error('Unable to delete employee: ' + err);
          } else {
            console.log('The employee has been successfully deleted.');
          }
          startPrompts();
        });
      });
    });
}
