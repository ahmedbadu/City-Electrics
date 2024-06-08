module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/sales`, middlewares.signInCheck.dashboardAccess, controller.salesController.view);
    app.get(`${prefix}/sales/add`, middlewares.signInCheck.dashboardAccess, controller.salesController.add);
    app.post(`${prefix}/sales/saveSales`, middlewares.signInCheck.dashboardAccess, controller.salesController.saveSales);
    app.get(`${prefix}/sales/generateBill/:id`,middlewares.signInCheck.dashboardAccess, controller.salesController.generateBill);

}