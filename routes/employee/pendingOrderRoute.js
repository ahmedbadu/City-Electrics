module.exports = function (app, models) {

    var prefix = '/employee';
    var controller = require('../../controllers/employee/index')(models);
    var middleware = require('../../middlewares/employee/index')();

    app.get(`${prefix}/pendingOrders`, middleware.signInCheck.dashboardAccess, controller.pendingOrderController.view);

}