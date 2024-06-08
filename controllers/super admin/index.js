module.exports = function (models) {
    var module = {}

    module.authController = require('./authController')(models);
    module.dashboardController = require('./dashboardController')(models);
    module.stateController = require('./stateController')(models);
    module.cityController = require('./cityController')(models);
    module.branchController = require('./branchController')(models);
    module.adminController = require('./adminController')(models);
    module.employeeController = require('./employeeController')(models);
    module.salaryController = require('./salaryController')(models);
    module.leavesController = require('./leavesController')(models);

    return module;
}