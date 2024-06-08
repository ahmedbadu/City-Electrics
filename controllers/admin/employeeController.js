const bcryptjs = require('bcryptjs');
module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const userInfo = req.session.admin;
            const employeeInfo = await models.userModel.find({ user_type: 'employee',branch_id:req.session.admin.branch_id }).populate('branch_id');
            res.render('backend/employee/employee.html', {
                userInfo,
                employeeInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            const userInfo = req.session.admin;
            const branchInfo = await models.branchSchema.find({}).populate(['state_id', 'city_id']);
            res.render('backend/employee/add.html', {
                userInfo,
                branchInfo
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveEmployee = async function (req, res) {
        try {
            const { firstName, lastName, email, phone, password } = req.body;
            const encPass = await bcryptjs.hash(password, 10);
            if (req.file && req.file.filename) {
                const saveEmployee = await models.userModel.create({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    password: encPass,
                    profile: req.file.filename,
                    user_type: 'employee',
                    branch_id: req.session.admin.branch_id,
                });
                if (saveEmployee) {
                    res.redirect('/admin/employee');
                }
            }
            else {
                const saveEmployee = await models.userModel.create({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    password: encPass,
                    profile: 'no_image.png',
                    user_type: 'employee',
                    branch_id: req.session.admin.branch_id,
                });
                if (saveEmployee) {
                    res.redirect('/admin/employee');
                }
            }
        } catch (error) {
            if (error.keyPattern.email) {
                res.send('<script>alert("Email already exist...!");document.location="/admin/employee";</script>');
            }
            else {
                res.send(error.message);
            }
        }
    }

    module.edit = async function (req, res) {
        try {
            const id = req.params.id;
            const [findEmployee, branchInfo] = await Promise.all([
                models.userModel.findOne({ _id: id }),
                models.branchSchema.find({}).populate(['state_id', 'city_id']),
            ]);
            const userInfo = req.session.admin;
            res.render('backend/employee/edit.html', {
                userInfo,
                findEmployee,
                branchInfo
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveEdit = async function (req, res) {
        try {
            const id = req.params.id;
            const { firstName, lastName, email, phone } = req.body;
            if(req.file && req.file.filename){
                const updateEmployee = await models.userModel.updateOne({_id:id},{
                    first_name: firstName,
                    last_name:lastName,
                    email:email,
                    phone:phone,
                    profile: req.file.filename,
                });
                if(updateEmployee){
                    res.redirect('/admin/employee');
                }
            }
            else{
                const updateEmployee = await models.userModel.updateOne({_id:id},{
                    first_name: firstName,
                    last_name:lastName,
                    email:email,
                    phone:phone,
                });
                if(updateEmployee){
                    res.redirect('/admin/employee');
                }
            }
        } catch (error) {
            if (error.keyPattern.email) {
                res.send('<script>alert("Email already exist...!");document.location="/admin/employee";</script>');
            }
            else {
                res.send(error.message);
            }
        }
    }

    return module;

}