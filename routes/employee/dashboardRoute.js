module.exports = function (app, models) {

    var prefix = '/employee';
    var controller = require('../../controllers/employee/index')(models);
    var middleware = require('../../middlewares/employee/index')();

    app.get(`${prefix}/dashboard`, middleware.signInCheck.dashboardAccess, controller.dashboardController.view);
    app.get(`${prefix}/signOut`,middleware.signInCheck.dashboardAccess, controller.dashboardController.signOut);

}