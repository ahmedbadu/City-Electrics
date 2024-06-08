const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/user_images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({
    storage: storage,
})
module.exports = function (app, models) {

    var prefix = '/superAdmin';
    var controller = require('../../controllers/super admin/index')(models);
    var middlewares = require('../../middlewares/super admin/index')(models);

    app.get(`${prefix}/admin`, middlewares.signInCheck.dashboardAccess, controller.adminController.admin);
    app.get(`${prefix}/admin/add`, middlewares.signInCheck.dashboardAccess, controller.adminController.add);
    app.post(`${prefix}/admin/saveAdmin`, middlewares.signInCheck.dashboardAccess, upload.single('profile'), middlewares.checkExistBranch.checkBranch, controller.adminController.saveAdmin);
    app.get(`${prefix}/admin/edit/:id`, middlewares.signInCheck.dashboardAccess, controller.adminController.edit);
    app.post(`${prefix}/admin/update/:id`, middlewares.signInCheck.dashboardAccess, upload.single('profile'), controller.adminController.saveEdit);

}