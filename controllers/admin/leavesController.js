module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const userInfo = req.session.admin;
            const leavesInfo = await models.leavesSchema.find({}).sort({ _id: -1 }).populate('employee_id');
            res.render('backend/leaves/leaves.html', {
                userInfo,
                leavesInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            const userInfo = req.session.admin;
            const employeeInfo = await models.userModel.find({ user_type: 'employee', branch_id: req.session.admin.branch_id });
            res.render('backend/leaves/add.html', {
                employeeInfo,
                userInfo,
                postUrl: '/admin/leaves/saveLeaves',
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveLeaves = async function (req, res) {
        try {
            const { selectEmployee, startDate, endDate, leaveType, appliedFor, description } = req.body;
            const saveLeaves = await models.leavesSchema.create({
                employee_id: selectEmployee,
                from_date: startDate,
                to_date: endDate,
                leave_type: leaveType,
                applied_for: appliedFor,
                description: description,
                leave_status: 'Pending',
            });
            if (saveLeaves) {
                res.redirect('/admin/leaves');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.edit = async function (req, res) {
        try {
            const id = req.params.id;
            const [employeeInfo, leaveInfo] = await Promise.all([
                models.userModel.find({ user_type: 'employee', branch_id: req.session.admin.branch_id }),
                models.leavesSchema.findOne({ _id: id }),
            ]);
            const userInfo = req.session.admin;
            res.render('backend/leaves/edit.html', {
                userInfo,
                leaveInfo,
                employeeInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.updateLeaves = async function (req, res) {
        try {
            const id = req.params.id;
            const { selectEmployee, startDate, endDate, leaveType, appliedFor, description } = req.body;
            const updateLeaves = await models.leavesSchema.updateOne({ _id: id }, {
                employee_id: selectEmployee,
                from_date: startDate,
                to_date: endDate,
                leave_type: leaveType,
                applied_for: appliedFor,
                description: description,
            });
            if (updateLeaves) {
                res.redirect('/admin/leaves');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.deleteLeaves = async function (req, res) {
        try {
            const id = req.params.id;
            const deleteLeaves = await models.leavesSchema.deleteOne({ _id: id });
            if (deleteLeaves) {
                res.redirect('/admin/leaves');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.approveLeave = async function (req, res) {
        try {
            const id = req.params.id;
            const updateStatus = await models.leavesSchema.updateOne({ _id: id }, {
                leave_status: 'Approved',
            });
            if (updateStatus) {
                res.redirect('/admin/leaves');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.rejectLeave = async function (req, res) {
        try {
            const id = req.params.id;
            const updateStatus = await models.leavesSchema.updateOne({ _id: id }, {
                leave_status: 'Rejected',
            });
            if (updateStatus) {
                res.redirect('/admin/leaves');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}