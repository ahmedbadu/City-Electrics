module.exports = function (app, models) {

    var prefix = '/superAdmin';
    var controller = require('../../controllers/super admin/index')(models);
    var middlewares = require('../../middlewares/super admin/index')();

    app.get(`${prefix}/branch`, middlewares.signInCheck.dashboardAccess, controller.branchController.branch);
    app.get(`${prefix}/branch/add`, middlewares.signInCheck.dashboardAccess, controller.branchController.addBranch);
    app.get(`${prefix}/branch/fetchCity`, middlewares.signInCheck.dashboardAccess, controller.branchController.fetchCity);
    app.post(`${prefix}/branch/saveBranch`, middlewares.signInCheck.dashboardAccess, controller.branchController.saveBranch);
    app.get(`${prefix}/branch/edit/:bid`, middlewares.signInCheck.dashboardAccess, controller.branchController.edit);
    app.post(`${prefix}/branch/editBranch`, middlewares.signInCheck.dashboardAccess, controller.branchController.editBranch);
    app.get(`${prefix}/getCity`, middlewares.signInCheck.dashboardAccess, controller.branchController.getCity);

}