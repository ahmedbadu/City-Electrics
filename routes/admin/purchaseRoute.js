module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/purchase`, middlewares.signInCheck.dashboardAccess, controller.purchaseController.view);
    app.get(`${prefix}/purchase/add`, middlewares.signInCheck.dashboardAccess, controller.purchaseController.add);
    app.get(`${prefix}/product/getProducts`, middlewares.signInCheck.dashboardAccess, controller.purchaseController.getProducts);
    app.post(`${prefix}/purchase/savePurchase`, middlewares.signInCheck.dashboardAccess, controller.purchaseController.savePurchase);
    app.get(`${prefix}/purchase/generateBill/:id`, middlewares.signInCheck.dashboardAccess, controller.purchaseController.generateBill);
    app.get(`${prefix}/purchase/delivered/:id`, middlewares.signInCheck.dashboardAccess, controller.purchaseController.deliveredStatus);
    app.get(`${prefix}/purchase/cancelled/:id`, middlewares.signInCheck.dashboardAccess, controller.purchaseController.cancelledStatus);

}