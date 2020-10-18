const inquirer = require("inquirer");
const cTable = require('console.table');

function questions() {
    return inquirer.prompt([
        {
            type: "list",
            name: "initial_choice",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Done"]
        }
    ])
        .then(userChoice => {
            switch (userChoice.initial_choice) {
                case "View All Departments":
                    // display departments
                    break;
                case "View All Roles":
                    // display roles
                    break;
                case "View All Employees":
                    // display Employees
                    break;
                case "Add Department":
                    // add department
                    break;
                case "Add Role":
                    // add Role
                    break;
                case "Add Employee":
                    // add Employee
                    break;
                case "Update Employee Role":
                    // update Employee
                    // function to update role
                    break;
                case "Done":
                    break;
            }
        })
}

// {
//     type: "input",
//     name: "update_id",
//     message: "What is the ID of the employee that you would like to update?"
// }


// function call to initialize program
questions();