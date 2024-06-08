module.exports = function (app, models) {

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/login`, middlewares.signInCheck.isLogin, controller.authController.login);
    app.post(`${prefix}/checkUser`, controller.authController.checkUser);

}