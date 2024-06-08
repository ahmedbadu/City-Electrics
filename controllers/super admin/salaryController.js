module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const salaryInfo = await models.salarySchema.find({}).sort({ _id: -1 }).populate('employee_id');
            res.render('backend/salary/salary.html', {
                userInfo: req.session.super_admin,
                salaryInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}