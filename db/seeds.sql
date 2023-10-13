INSERT INTO department (name)
VALUES ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), -- Assign department_id for Sales
    ("Salesperson", 80000, 1),  -- Assign department_id for Sales
    ("Lead Engineer", 150000, 2),  -- Assign department_id for Engineering
    ("Software Engineer", 120000, 2),  -- Assign department_id for Engineering
    ("Account Manager", 160000, 3),  -- Assign department_id for Finance
    ("Accountant", 125000, 3),  -- Assign department_id for Finance
    ("Legal Team Lead", 250000, 4),  -- Assign department_id for Legal
    ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL), -- John Doe is a Sales Lead (role_id = 1) with no manager (manager_id = NULL)
    ("Mike", "Chan", 2, 1),  -- Mike Chan is a Salesperson (role_id = 2) and reports to John Doe (manager_id = 1)
    ("Ashley", "Rodriguez", 2, 1), -- Ashley Rodriguez is also a Salesperson and reports to John Doe
    ("Kevin", "Tupik", 3, 3), -- Kevin Tupik is a Lead Engineer and reports to himself (self-reference for manager)
    ("Kunal", "Singh", 4, 3), -- Kunal Singh is a Software Engineer and reports to Kevin Tupik
    ("Malia", "Brown", 5, NULL), -- Malia Brown is an Account Manager with no manager
    ("Sarah", "Lourd", 6, 6), -- Sarah Lourd is an Accountant and reports to herself
    ("Tom", "Allen", 7, NULL); 