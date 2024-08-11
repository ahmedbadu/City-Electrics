var multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/user_images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

let upload = multer({
    storage: storage,
})

module.exports = function (app, models) {

    var prefix = '/superAdmin';
    var controller = require('../../controllers/super admin/index')(models);
    var middlewares = require('../../middlewares/super admin/index')();

    app.get(`${prefix}/login`, middlewares.signInCheck.isLogin, controller.authController.signin);
    app.get(`${prefix}/forgotpassword`, controller.authController.forgot);
    app.get(`${prefix}/signOut`, controller.authController.signOut);
    app.get(`${prefix}/profile`, middlewares.signInCheck.dashboardAccess, controller.authController.profile);

    app.post(`${prefix}/editProfile/:id`, middlewares.signInCheck.dashboardAccess, upload.single('profile'), controller.authController.editProfile);
    app.post(`${prefix}/checkUser`, controller.authController.signinCheck);
    app.post(`${prefix}/forgotPassword`, controller.authController.forgotPasswordPost);

}