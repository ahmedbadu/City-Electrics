module.exports = function (app, models) {

    var prefix = '/superAdmin';
    var controller = require('../../controllers/super admin/index')(models);
    var middlewares = require('../../middlewares/super admin/index')();

    app.get(`${prefix}/city`, middlewares.signInCheck.dashboardAccess, controller.cityController.city);
    app.get(`${prefix}/addCity`, middlewares.signInCheck.dashboardAccess, controller.cityController.addCity);
    app.get(`${prefix}/editCity/:cid`, middlewares.signInCheck.dashboardAccess, controller.cityController.editCity);

    app.post(`${prefix}/addCity`, middlewares.signInCheck.dashboardAccess, controller.cityController.saveAddCity);
    app.post(`${prefix}/editCity`, middlewares.signInCheck.dashboardAccess, controller.cityController.saveEditCity);

}