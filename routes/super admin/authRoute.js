module.exports = function (app, models) {

    var prefix = '/superAdmin';
    var controller = require('../../controllers/super admin/index')(models);
    var middlewares = require('../../middlewares/super admin/index')();

    app.get(`${prefix}/login`, middlewares.signInCheck.isLogin, controller.authController.signin);
    app.get(`${prefix}/forgotpassword`, controller.authController.forgot);
    app.get(`${prefix}/signOut`, controller.authController.signOut);

    app.post(`${prefix}/checkUser`, controller.authController.signinCheck);
    app.post(`${prefix}/forgotPassword`, controller.authController.forgotPasswordPost);

}