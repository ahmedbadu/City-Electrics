module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const leavesInfo = await models.leavesSchema.find({ employee_id: req.session.employee._id }).sort({ _id: -1 }).populate('employee_id');
            res.render('backend/leaves/leaves.html', {
                userInfo: req.session.employee,
                leavesInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            res.render('backend/leaves/add.html', {
                postUrl: '/employee/leaves/saveLeaves',
                userInfo: req.session.employee,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveLeave = async function (req, res) {
        try {
            const { startDate, endDate, leaveType, appliedFor, description } = req.body;
            const saveLeaves = await models.leavesSchema.create({
                employee_id: req.session.employee._id,
                from_date: startDate,
                to_date: endDate,
                leave_type: leaveType,
                applied_for: appliedFor,
                description: description,
                leave_status: 'Pending',
            });
            if (saveLeaves) {
                res.redirect('/employee/leaves');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}