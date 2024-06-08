var userValidate = require('../../models/joiSchema/userSchema');
const bcryptjs = require('bcryptjs');
module.exports = function (models) {
    var module = {};

    module.admin = async function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            const [adminInfo] = await Promise.all([
                models.userModel.find({ user_type: 'admin' }).populate('branch_id'),
            ]);
            res.render('backend/admin/admin.html', {
                userInfo,
                adminInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            const userInfo = req.session.super_admin;
            const branchInfo = await models.branchSchema.find({}).populate(['state_id', 'city_id']);
            res.render('backend/admin/add.html', {
                userInfo,
                branchInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveAdmin = async function (req, res) {
        try {
            if (req.file && req.file.filename) {
                const { error } = await userValidate.validate(req.body);
                if (error) {
                    res.send(error.message);
                }
                else {
                    const encPass = await bcryptjs.hash(req.body.password, 10);
                    const saveResult = await models.userModel.create({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: encPass,
                        profile: req.file.filename,
                        user_type: 'admin',
                        branch_id: req.body.branch_id,
                    });
                    if (saveResult) {
                        res.send('<script>alert("New Admin Created Successfully...!");document.location="/superAdmin/admin";</script>');
                    }
                }
            }
            else {
                const { error } = await userValidate.validate(req.body);
                if (error) {
                    res.send(error.message);
                }
                else {
                    const encPass = await bcryptjs.hash(req.body.password, 10);
                    const saveResult = await models.userModel.create({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: encPass,
                        profile: 'no_image.png',
                        user_type: 'admin',
                        branch_id: req.body.branch_id,
                    });
                    if (saveResult) {
                        res.send('<script>alert("New Admin Created Successfully...!");document.location="/superAdmin/admin";</script>');
                    }
                }
            }
        } catch (error) {
            if (error.keyPattern.email) {
                res.send('<script>alert("Email already exist...!");document.location="/superAdmin/admin";</script>');
            }
            else {
                res.send(error.message);
            }
        }
    }

    module.edit = async function (req, res) {
        try {
            const admin_id = req.params.id;
            const userInfo = req.session.super_admin;
            const [adminInfo, branchInfo] = await Promise.all([
                models.userModel.findOne({ _id: admin_id }),
                models.branchSchema.find({}).populate(['state_id', 'city_id']),
            ])
            res.render('backend/admin/edit.html', {
                userInfo,
                adminInfo,
                branchInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveEdit = async function (req, res) {
        try {
            if (req.file && req.file.filename) {
                const updateAdmin = await models.userModel.updateOne({ _id: req.params.id }, {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    profile: req.file.filename,
                });
                if (updateAdmin) {
                    res.send('<script>alert("Admin updated successfully...!");document.location="/superAdmin/admin";</script>');
                }
            }
            else {
                const updateAdmin = await models.userModel.updateOne({ _id: req.params.id }, {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                });
                if (updateAdmin) {
                    res.send('<script>alert("Admin updated successfully...!");document.location="/superAdmin/admin";</script>');
                }
            }
        } catch (error) {
            if (error.keyPattern.email) {
                res.send('<script>alert("Email already exist...!");document.location="/superAdmin/admin";</script>');
            }
            else {
                res.send(error.message);
            }
        }
    }

    return module;
}