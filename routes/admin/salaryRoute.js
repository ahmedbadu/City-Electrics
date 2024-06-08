module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/salary`, middlewares.signInCheck.dashboardAccess, controller.salaryController.view);
    app.get(`${prefix}/salary/add`, middlewares.signInCheck.dashboardAccess, controller.salaryController.add);
    app.post(`${prefix}/salary/saveSalary`, middlewares.signInCheck.dashboardAccess, controller.salaryController.saveSalary);
    app.get(`${prefix}/salary/delete/:id`, middlewares.signInCheck.dashboardAccess, controller.salaryController.deleteSalary);
    app.get(`${prefix}/salary/edit/:id`,middlewares.signInCheck.dashboardAccess, controller.salaryController.editSalary);
    app.post(`${prefix}/salary/updateSalary/:id`,middlewares.signInCheck.dashboardAccess, controller.salaryController.updateSalary);

}