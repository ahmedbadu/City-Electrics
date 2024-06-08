module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/customer`, middlewares.signInCheck.dashboardAccess, controller.customerController.view);
    app.get(`${prefix}/customer/add`, middlewares.signInCheck.dashboardAccess, controller.customerController.add);
    app.post(`${prefix}/customer/saveCustomer`, middlewares.signInCheck.dashboardAccess, controller.customerController.saveCustomer);
    app.get(`${prefix}/customer/edit/:id`, middlewares.signInCheck.dashboardAccess, controller.customerController.edit);
    app.post(`${prefix}/customer/updateCustomer/:id`, middlewares.signInCheck.dashboardAccess, controller.customerController.updateCustomer);

}