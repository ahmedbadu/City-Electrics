module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const leavesInfo = await models.leavesSchema.find({}).sort({ _id: -1 }).populate('employee_id');
            res.render('backend/leaves/leaves.html', {
                userInfo: req.session.super_admin,
                leavesInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}