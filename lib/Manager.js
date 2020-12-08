const Employee = require("./Employee.js");

class Manager extends Employee {

    constructor(officeNumber) {
        this.officeNumber = officeNumber;
        super(name, id, email);
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }

}
module.exports = Manager;