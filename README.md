# Employee-Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a simple application that allows the user to track and update records for their employees. I have taken the liberty of creating a walkthrough that shows the functionality of this application once it has been installed:
https://drive.google.com/file/d/1P43Lz0gLDRsG7XBcuR68dX6xgi9_NBok/view

## Installation
First go to the directory containing the server.js file for this appplication.

npm init, npm install, npm install inquirer, npm install --save mysql2, and npm install console.table --save need to all be run before starting this application.

## Usage
Log into your mysql account by typing: mysql -u root -p then enter your password.
In the mysql prompt type source db/schema.sql followed by source db/seeds.sql to create and prepopulate the table.

To start, simply enter: npm start

View All Departments will show a table of all the departments with their associated ids.
View All Roles will show a table containing the job title, role id, salary, and department that the role belongs to.
View All Employees will show employee ids, first names, last names, title, salary, department, and if they have a manager.

Add Department will ask you to name the department and that department will be added to the database.
Add Role will ask you to name the role, salary, and department and adds it to the database.
Add Employee will ask you to enter first name, last name, role, and manager for this new employee to add to the database.
Update Employee Role will let you select the employee to update and then also select their new role before updating it in the database.

## License

This project is covered under a MIT license. Feel free to use it as you wish.

## Questions

  GitHub User Name: willsan0723

  [GitHub Repository](https://github.com/willsan0723/)

  If you have any additional questions you can reach me at william.santee@gmail.com
