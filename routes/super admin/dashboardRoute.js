module.exports = function (app, models) {

    var prefix = '/superAdmin';
    var controller = require('../../controllers/super admin/index')(models);
    var middlewares = require('../../middlewares/super admin/index')();

    app.get(`${prefix}/dashboard`, middlewares.signInCheck.dashboardAccess, controller.dashboardController.superAdminDashboard);

}