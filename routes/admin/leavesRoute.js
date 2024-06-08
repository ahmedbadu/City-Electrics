module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/leaves`, middlewares.signInCheck.dashboardAccess, controller.leavesController.view);
    app.get(`${prefix}/leaves/add`, middlewares.signInCheck.dashboardAccess, controller.leavesController.add);
    app.post(`${prefix}/leaves/saveLeaves`, middlewares.signInCheck.dashboardAccess, controller.leavesController.saveLeaves);
    app.get(`${prefix}/leaves/edit/:id`, middlewares.signInCheck.dashboardAccess, controller.leavesController.edit);
    app.post(`${prefix}/leaves/editLeaves/:id`, middlewares.signInCheck.dashboardAccess, controller.leavesController.updateLeaves);
    app.get(`${prefix}/leaves/delete/:id`, middlewares.signInCheck.dashboardAccess, controller.leavesController.deleteLeaves);
    app.get(`${prefix}/leaves/approveLeave/:id`, middlewares.signInCheck.dashboardAccess, controller.leavesController.approveLeave);
    app.get(`${prefix}/leaves/rejectLeave/:id`, middlewares.signInCheck.dashboardAccess, controller.leavesController.rejectLeave)

}