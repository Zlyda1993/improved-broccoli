const inquirer = require('inquirer');
const fs = require('fs');

const startUpOptions = [
    "View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
];

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
        
        break;
      case "Add Employee":

        break;
      case "Update Employee Role":

        break;
      case "View All Roles":

        break;
      case "Add Role":

        break;
      case "View All Departments":

        break;
      case "Add Department":

        break;
      default:
        console.log('Invalid option selected.');
    }
  });