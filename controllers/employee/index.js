module.exports = function (models) {

    var module = {};

    module.authController = require('./authController')(models);
    module.dashboardController = require('./dashboardController')(models);
    module.leavesController = require('./leavesController')(models);
    module.salaryController = require('./salaryController')(models);
    module.pendingOrderController = require('./pendingOrderConttroller')(models);

    return module;

}