module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/supplier`, middlewares.signInCheck.dashboardAccess, controller.supplierController.view);
    app.get(`${prefix}/supplier/add`, middlewares.signInCheck.dashboardAccess, controller.supplierController.add);
    app.post(`${prefix}/supplier/saveSupplier`, middlewares.signInCheck.dashboardAccess, controller.supplierController.saveSupplier);
    app.get(`${prefix}/supplier/edit/:id`, middlewares.signInCheck.dashboardAccess, controller.supplierController.edit);
    app.post(`${prefix}/supplier/updateSupplier/:id`, middlewares.signInCheck.dashboardAccess, controller.supplierController.updateSupplier);

}