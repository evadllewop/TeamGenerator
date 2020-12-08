const Employee = require("./Employee.js");

class Intern extends Employee {

    constructor(school) {
        this.school = school;
        super(name, id, email);
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }

}
module.exports = Intern;
