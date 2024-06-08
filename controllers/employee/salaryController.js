module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const salaryInfo = await models.salarySchema.find({ employee_id: req.session.employee._id }).sort({ _id: -1 }).populate('employee_id');
            res.render('backend/salary/salary.html', {
                userInfo: req.session.employee,
                salaryInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}