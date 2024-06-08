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

    var prefix = '/admin';
    var controller = require('../../controllers/admin/index')(models);
    var middlewares = require('../../middlewares/admin/index')();

    app.get(`${prefix}/employee`, middlewares.signInCheck.dashboardAccess, controller.employeeController.view);
    app.get(`${prefix}/employee/add`, middlewares.signInCheck.dashboardAccess, controller.employeeController.add);
    app.post(`${prefix}/employee/saveEmployee`, middlewares.signInCheck.dashboardAccess, upload.single('profile'), controller.employeeController.saveEmployee);
    app.get(`${prefix}/employee/edit/:id`, middlewares.signInCheck.dashboardAccess, controller.employeeController.edit);
    app.post(`${prefix}/employee/saveEdit/:id`, middlewares.signInCheck.dashboardAccess, upload.single('profile'), controller.employeeController.saveEdit);

}