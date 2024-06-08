module.exports = function(app,models){

    var prefix = '/superAdmin';
    var controller = require('../../controllers/super admin/index')(models);
    var middlewares = require('../../middlewares/super admin/index')(models);

    app.get(`${prefix}/employee`,middlewares.signInCheck.dashboardAccess, controller.employeeController.view);

}