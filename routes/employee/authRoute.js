module.exports = function (app, models) {

    var prefix = '/employee';
    var controller = require('../../controllers/employee/index')(models);
    var middleware = require('../../middlewares/employee/index')();

    app.get(`${prefix}/login`, middleware.signInCheck.isLogin, controller.authController.login);
    app.post(`${prefix}/checkUser`, controller.authController.checkUser)

}