module.exports = function (app, models) {

    var prefix = '/superAdmin';
    var controller = require('../../controllers/super admin/index')(models);
    var middlewares = require('../../middlewares/super admin/index')();

    app.get(`${prefix}/state`, middlewares.signInCheck.dashboardAccess, controller.stateController.state);
    app.get(`${prefix}/addState`, middlewares.signInCheck.dashboardAccess, controller.stateController.addState);
    app.get(`${prefix}/editState/:sid`,middlewares.signInCheck.dashboardAccess,controller.stateController.editState);

    app.post(`${prefix}/addState`, middlewares.signInCheck.dashboardAccess, controller.stateController.saveState);
    app.post(`${prefix}/editState`,middlewares.signInCheck.dashboardAccess,controller.stateController.SaveEditState);

}