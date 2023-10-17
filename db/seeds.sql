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
VALUES ("John", "Doe", 1, NULL),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, NULL),
    ("Kevin", "Tupik", 4, 3),
    ("Kunal", "Singh", 5, NULL),
    ("Malia", "Brown", 6, 5),
    ("Sarah", "Lourd", 7, NULL),
    ("Tom", "Allen", 8, 7); 