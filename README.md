# improved-broccoli

# Steps

## First i had to install all of my dependencies running npm install.

## Start setting up the schema.sql file to set up the database and what tables will be within it. It also includes the primary and foreign keys showing how the tables are connected.

## Set up the seeds file that will input info into the tables.

## Creating a server.js file.

## require both inquirer and mysql2.

## Create the connection with you're login info.

## Set up the const that has all of the options that the user will be prompted with.

## Set up a const for the department choices.

## Set up a const for the manager choices.

## Set up a const for the role choices.

## Set up a const for the employee choices.

## The main function starts the prompts and using a switch function it can navigate between the options that can be chosen and depending on which one was chosen it will call a specific function that performs that task.

## Also includes an exit option to get out of running the server.

## I made a function that allows you to view the employees table, roles table, department table, add a department, add a role, add an employee, update an employee, update an employee manager, view the employees by manager, view employees by department, delete a department, delete a role, delete an enployee, and the total salary being paid out for all of the employees employed with the company. Each function has the prompt function being called at the end of it to keep the prompts popping up after an option has been chosen.

## Running node server.js allows you to start the prompts and start editing and viewing the tables.

# Walk-Through Video

## ![Video Walk Through](./Challenge%2012%20walkthrough.webm)