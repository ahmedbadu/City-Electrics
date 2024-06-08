module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/dashboard`, middlewares.signInCheck.dashboardAccess, controller.dashboardController.view);
    app.get(`${prefix}/signOut`, controller.dashboardController.signOut);

}