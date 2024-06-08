module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const employeeInfo = await models.userModel.find({ user_type: 'employee' }).sort({ _id: -1 }).populate('branch_id');
            res.render('backend/employee/employee.html', {
                userInfo: req.session.super_admin,
                employeeInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}