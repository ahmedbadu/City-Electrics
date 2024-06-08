module.exports = function (app, models) {

    var prefix = '/employee';
    var controller = require('../../controllers/employee/index')(models);
    var middleware = require('../../middlewares/employee/index')();

    app.get(`${prefix}/salary`, middleware.signInCheck.dashboardAccess, controller.salaryController.view);

}