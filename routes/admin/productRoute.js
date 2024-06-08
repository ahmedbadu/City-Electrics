module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/product`, middlewares.signInCheck.dashboardAccess, controller.productController.view);
    app.get(`${prefix}/product/add`, middlewares.signInCheck.dashboardAccess, controller.productController.add);
    app.post(`${prefix}/product/saveProduct`, middlewares.signInCheck.dashboardAccess, controller.productController.saveProduct);

}