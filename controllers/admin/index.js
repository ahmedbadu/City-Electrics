module.exports = function (models) {
    var module = {};

    module.authController = require('./authController')(models);
    module.dashboardController = require('./dashboardController')(models);
    module.employeeController = require('./employeeController')(models);
    module.salaryController = require('./salaryController')(models);
    module.leavesController = require('./leavesController')(models);
    module.categoryController = require('./categoryController')(models);
    module.supplierController = require('./supplierController')(models);
    module.customerController = require('./customerController')(models);
    module.productController = require('./productController')(models);
    module.purchaseController = require('./purchaseController')(models);
    module.salesController = require('./salesController')(models);
    module.reportController = require('./reportController')(models);

    return module;
}