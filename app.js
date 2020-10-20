const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employeesArray = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

    
    function getNextEmployee(){
        
    console.log("Choose a team member to add or choose to render your teams webpage!");
    inquirer.prompt([
    {
        type: 'list',
        name: 'employeeType',
        message: 'What is the team members role in the company?',
        choices: ['Manager', 'Engineer', 'Intern', 'Render my team page!']
    },
    {
        type: 'input',
        name: 'name',
        message: 'What is the team members name?',
        when: function(response) {
            return response.employeeType != 'Render my team page!';
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the team members ID?',
        when: function(response) {
            return response.employeeType != 'Render my team page!';
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the team members email?',
        when: function(response) {
            return response.employeeType != 'Render my team page!';
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the team members office number',
        when: function(response) {
            return response.employeeType == 'Manager';
        }
    },
    {
        type: 'input',
        name: 'gitHub',
        message: 'What is the team members GitHub username?',
        when: function(response) {
            return response.employeeType == 'Engineer';
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is the team members school?',
        when: function(response) {
            return response.employeeType == 'Intern';
        }
    }
    ]).then
    (function (response) {
        switch (response.employeeType) {
            case 'Manager':
                const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
                employeesArray.push(manager);
                getNextEmployee();
                break;

            case 'Engineer':
                const engineer = new Engineer(response.name, response.id, response.email, response.gitHub);
                employeesArray.push(engineer);
                getNextEmployee();
                break;

            case 'Intern':
                const intern = new Intern(response.name, response.id, response.email, response.school);
                employeesArray.push(intern);
                getNextEmployee();
                break;
            
            case 'Render my team page!':
                console.log(`Your webpage has been rendered in the following location: ${outputPath}`)
                fs.writeFileSync(outputPath, render(employeesArray), "utf8");
                break;
        }
    })
};
getNextEmployee();

// getNextEmployee();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
