module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/category`, middlewares.signInCheck.dashboardAccess, controller.categoryController.view);
    app.get(`${prefix}/category/add`, middlewares.signInCheck.dashboardAccess, controller.categoryController.add);
    app.post(`${prefix}/category/saveCategory`, middlewares.signInCheck.dashboardAccess, controller.categoryController.saveCategory);
    app.get(`${prefix}/category/edit/:id`, middlewares.signInCheck.dashboardAccess, controller.categoryController.edit);
    app.post(`${prefix}/category/updateCategory/:id`, middlewares.signInCheck.dashboardAccess, controller.categoryController.updateCategory);

}