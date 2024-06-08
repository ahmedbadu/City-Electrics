module.exports = function (app, models) {

    var prefix = '/employee';
    var controller = require('../../controllers/employee/index')(models);
    var middleware = require('../../middlewares/employee/index')();

    app.get(`${prefix}/leaves`, middleware.signInCheck.dashboardAccess, controller.leavesController.view);
    app.get(`${prefix}/leaves/add`, middleware.signInCheck.dashboardAccess, controller.leavesController.add);
    app.post(`${prefix}/leaves/saveLeaves`, middleware.signInCheck.dashboardAccess, controller.leavesController.saveLeave);

}