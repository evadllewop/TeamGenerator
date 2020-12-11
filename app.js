
//create variables for all of the 'requires'
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// empty array that will contain the team members
const teamMembers = [];

// prompt user for type of role
const roleQuestion = [
    {
        type: "list",
        name: "role",
        message: "What is this employee's role?",
        choices: ["Intern", "Engineer", 'No more employees']
    }
];

// object array that contains the 'intern' questions
const internQs = [
    {
        name: "name",
        message: "What is the intern's name?",
        type: "input"
    },
    {
        name: 'id',
        type: 'input',
        message: "What is the intern's id?"
    },
    {
        name: "email",
        type: "input",
        message: "What is the intern's email?"
    },
    {
        name: "school",
        type: "input",
        message: "What school did the intern graduate from?"
    }
];

// object array that contains the 'engineer' questions
const engineerQs = [
    {
        name: "name",
        message: "What is the engineer's name?",
        type: "input"
    },
    {
        name: 'id',
        type: 'input',
        message: "What is the engineer's id?"
    },
    {
        name: "email",
        type: "input",
        message: "What is the engineer's email?"
    },
    {
        name: "github",
        type: "input",
        message: "What is the engineer's Github user name?"
    },

];

// object array that contains the 'manager' questions
const managerQs = [
    {
        name: "name",
        message: "What is the manager's name?",
        type: "input"
    },
    {
        name: 'id',
        type: 'input',
        message: "What is the manager's id?"
    },
    {
        name: "email",
        type: "input",
        message: "What is the manager's email?"
    },
    {
        name: "office",
        type: "input",
        message: "What is the manager's office number?"
    }
];

// // function to write 'team.html' file to the 'output' folder
function writeToFile(data) {
    return fs.writeFile(outputPath, data, err => {
        if (err) {
            console.log(err);
        }
        console.log("Your HTML file has been generated successfully")
    });
}

// function to prompt user with 'manager' questions
function promptManager() {
    inquirer.prompt(managerQs)

        .then(mgrAnswers => {
            // console.log(mgrAnswers)
            const manager = new Manager(mgrAnswers.name, mgrAnswers.id, mgrAnswers.email, mgrAnswers.office);
            teamMembers.push(manager);
            promptEmployees();
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}


// function to prompt user with employee questions
function promptEmployees() {
    inquirer.prompt(roleQuestion)
        .then(answers => {

            // if user chooses 'intern', prompt questions, create new 'intern' and push result to 'teamMembers' array
            if (answers.role === "Intern") {
                inquirer.prompt(internQs)
                    .then(answers => {
                        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                        teamMembers.push(intern);
                        promptEmployees()
                    })
            }
            // if user chooses 'engineer', prompt questions, create new 'engineer' and push result to 'teamMembers' array
            if (answers.role === "Engineer") {
                inquirer.prompt(engineerQs)
                    .then(answers => {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                        teamMembers.push(engineer);
                        promptEmployees()
                    })
            }

            // if user chooses 'No more employees', write 'team.html' file
            if (answers.role === 'No more employees') {
                console.log(teamMembers)
                writeToFile(render(teamMembers))
            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}


// function call to initialize program
promptManager();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
