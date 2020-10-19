// add packages
const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table');

// establish connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'ih8backend',
    database: 'employees_tracker_db'
});

// connect
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    questions();
});


function questions() {
    return inquirer.prompt([
        {
            type: "list",
            // initial list of choices
            name: "initial_choice",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Done"]
        }
    ])
        .then(userChoice => {
            // add switch cases for queries
            switch (userChoice.initial_choice) {
                case "View All Departments":
                    viewDepartments();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Department":
                    addDepartment()
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "Done":
                    exit();
                    break;
            }
        })
}

function viewDepartments() {
    let query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    })
}

function viewEmployees() {
    // select and join from the db
    let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, concat(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    ORDER BY employee.id ASC`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        // display using console.table for better display
        console.table(res);
        questions();
    });
}

function viewRoles() {
    // select from the db
    let query = `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
    ORDER BY role.id ASC
    `;
    connection.query(query, function (err, res) {
        if (err) throw err;
        // display using console.table for better display
        console.table(res);
        questions();
    });
}

function addDepartment() {
    return inquirer.prompt([
        {
            type: "input",
            name: "add_department_name",
            message: "What is the name of the new department?"
        }
    ]).then(deptInfo => {
        connection.query(`INSERT INTO department SET ?`, {
            name: deptInfo.add_department_name
        },
            function (err, res) {
                if (err) throw err;
                console.log("New department added\n");
                questions();
            })
    })

}
function addRole() {
    return inquirer.prompt([
        {
            type: "input",
            name: "add_role_name",
            message: "What is the name of the new role?"
        },
        {
            type: "input",
            name: "add_role_salary",
            message: "What is the salary of the new role?"
        },
        {
            type: "input",
            name: "add_role_id",
            message: "What is the id of the department this new role belongs to?"

        }
    ]).then(roleInfo => {
        connection.query(`INSERT INTO role SET ?`, {
            title: roleInfo.add_role_name,
            salary: roleInfo.add_role_salary,
            department_id: roleInfo.add_role_id
        },
            function (err, res) {
                if (err) throw err;
                console.log("New role added\n");
                questions();
            })
    })
}

function addEmployee() {
    return inquirer.prompt([
        {
            type: "input",
            name: "add_first_name",
            message: "What is the first name of the new employee?"
        },
        {
            type: "input",
            name: "add_last_name",
            message: "What is the last name of the new employee?"
        },
        {
            type: "input",
            name: "add_employee_role",
            message: "What is the id # of the role of this new employee?"

        },
        {
            type: "input",
            name: "add_employee_manager",
            message: "What is the id # of the manager of this employee?"
        }
    ]).then(employeeInfo => {
        connection.query(`INSERT INTO employee SET ?`, {
            first_name: employeeInfo.add_first_name,
            last_name: employeeInfo.add_last_name,
            role_id: employeeInfo.add_employee_role,
            manager_id: employeeInfo.add_employee_manager
        },
            function (err, res) {
                if (err) throw err;
                console.log("New employee added\n");
                questions();
            })
    })
}

function exit() {
    connection.end();
    process.exit();
}
