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
                    findDept();
                    break;
                case "Add Employee":
                    findRole();
                    break;
                case "Update Employee Role":
                    findEmployee();
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
// need to pull up departments so it's a selection rather than requiring an id number
function findDept() {
    var query = "SELECT * FROM department"

    connection.query(query, function (err, res) {
        if (err) throw err;

        const deptChoice = res.map(({ id, name }) => ({
            value: id, name: `${name}`
        }));
        addRole(deptChoice)
    })

}
// now this function takes in the choices
function addRole(deptChoice) {
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
            type: "list",
            name: "add_role_id",
            message: "What is the department this new role belongs to?",
            choices: deptChoice
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
// function to display roles
function findRole() {
    var query = "SELECT title AS name, id FROM role"

    connection.query(query, function (err, res) {
        if (err) throw err;

        const roleChoice = res.map(({ id, name }) => ({
            value: id,
            name: name
        }));
        // needs to link to managers so employee creation can have both
        findManager(roleChoice);
    })
}

// function to display managers
function findManager(roleChoice) {
    var query = "SELECT * FROM employee"

    connection.query(query, function (err, res) {
        if (err) throw err;

        let managerChoice = res.map(({ id, first_name, last_name }) =>
            ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
        const noManager = {
            name: "This employee doesn't have a manager.",
            value: null
        }
        managerChoice.push(noManager)

        addEmployee(roleChoice, managerChoice);
    });
}

// function to display employees
function findEmployee() {
    var query = "SELECT * FROM employee"

    connection.query(query, function (err, res) {
        if (err) throw err;

        const employeeChoice = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        // need to add to employee role so both can be passed to update function
        employeeRole(employeeChoice);
    })
}

// function to add a new employee
function addEmployee(roleChoice, managerChoice) {
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
            type: "list",
            name: "add_employee_role",
            message: "What is the role of this new employee?",
            choices: roleChoice
        },
        {
            type: "list",
            name: "add_employee_manager",
            message: "Who is the manager of this employee?",
            choices: managerChoice
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

// function to get employee's role for the update function
function employeeRole(employeeChoice) {
    var query = "SELECT title AS name, id FROM role"

    connection.query(query, function (err, res) {
        if (err) throw err;

        const updatesRoles = res.map(({ name, id }) => ({
            name: name,
            value: id
        }));

        updateRole(employeeChoice, updatesRoles);
    });
}

// function to update an employee's role
function updateRole(employeeChoice, updatesRoles) {
    return inquirer.prompt([
        {
            type: "list",
            name: "updateEmployee",
            message: "Which employee would you like to update?",
            choices: employeeChoice
        },
        {
            type: "list",
            name: "newRole",
            message: "What is the new role for this employee?",
            choices: updatesRoles
        }
    ]).then(update => {
        connection.query(`UPDATE employee SET ? WHERE ?`,
            [
                {
                    role_id: update.newRole
                },
                {
                    id: update.updateEmployee
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log("Employee updated.\n");
                questions();
            })
    })
}


function exit() {
    connection.end();
    process.exit();
}
