module.exports = function (models) {

    var module = {};
    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'octomber', 'november', 'december'];

    module.view = async function (req, res) {
        try {
            const userInfo = req.session.admin;
            const salaryInfo = await models.salarySchema.find({}).sort({ _id: -1 }).populate('employee_id');
            res.render('backend/salary/salary.html', {
                userInfo,
                salaryInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            const userInfo = req.session.admin;
            const employeeInfo = await models.userModel.find({ user_type: 'employee', branch_id: req.session.admin.branch_id }).populate('branch_id');
            res.render('backend/salary/add.html', {
                userInfo,
                employeeInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveSalary = async function (req, res) {
        try {
            const { selectEmployee, salaryDate, salaryAmount } = req.body;
            const date = new Date(salaryDate);
            const salaryMonth = months[date.getMonth()] + " " + date.getFullYear();
            const saveDetails = await models.salarySchema.create({
                employee_id: selectEmployee,
                salary_date: salaryDate,
                salary_month: salaryMonth,
                salary_amount: salaryAmount,
            });
            if (saveDetails) {
                res.redirect('/admin/salary');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.deleteSalary = async function (req, res) {
        try {
            const id = req.params.id;
            const deleteSalary = await models.salarySchema.deleteOne({ _id: id });
            if (deleteSalary) {
                res.redirect('/admin/salary');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.editSalary = async function (req, res) {
        try {
            const id = req.params.id;
            const userInfo = req.session.admin;
            const salaryInfo = await models.salarySchema.findOne({ _id: id });
            const employeeInfo = await models.userModel.find({ user_type: 'employee', branch_id: req.session.admin.branch_id });
            res.render('backend/salary/edit.html', {
                salaryInfo,
                userInfo,
                employeeInfo,
            })
        } catch (error) {
            res.send(error.message);
        }
    }

    module.updateSalary = async function (req, res) {
        try {
            const id = req.params.id;
            const { selectEmployee, salaryDate, salaryAmount } = req.body;
            const date = new Date(salaryDate);
            const salaryMonth = months[date.getMonth()] + " " + date.getFullYear();
            const updateSalary = await models.salarySchema.updateOne({ _id: id }, {
                employee_id: selectEmployee,
                salary_date: salaryDate,
                salary_month: salaryMonth,
                salary_amount: salaryAmount,
            });
            if (updateSalary) {
                res.redirect('/admin/salary');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}