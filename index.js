const inquirer = require("inquirer");
const cTable = require('console.table');

const questions = [{
    type: "list",
    name: "initial_choice",
    message: "What would you like to do?",
    choices: ["View", "Add", "Update Role"]
},
{
    type: "list",
    name: "view_choice",
    message: "What would you like to view?",
    choices: ["Departments", "Roles", "Employees"]
},
{
    type: "list",
    name: "add_choice",
    message: "What would you like to add?",
    choices: ["Department", "Role", "Employee"]
},
{
    type: "input",
    name: "update_id",
    message: "What is the ID of the employee that you would like to update?"
}
]


// function to initialize program
function init() {
    inquirer.prompt(questions).then((inquirerResponses) => {

    })
}

// function call to initialize program
init();