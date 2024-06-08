module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/salaryReport`, middlewares.signInCheck.dashboardAccess, controller.reportController.viewSalaryReport);
    app.post(`${prefix}/salaryReport/getReport`, middlewares.signInCheck.dashboardAccess, controller.reportController.getSalaryReport);
    app.get(`${prefix}/salesReport`, middlewares.signInCheck.dashboardAccess, controller.reportController.viewSalesReport);
    app.post(`${prefix}/salesReport/getReport`)

}