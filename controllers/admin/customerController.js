const { model } = require("mongoose");

module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const customerInfo = await models.customerSchema.find({ branch_id: req.session.admin.branch_id }).sort({ _id: -1 }).populate('branch_id');
            res.render('backend/customer/customer.html', {
                userInfo: req.session.admin,
                customerInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            res.render('backend/customer/add.html', {
                userInfo: req.session.admin,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveCustomer = async function (req, res) {
        try {
            const { customerName, email, phone } = req.body;
            const save = await models.customerSchema.create({
                customer_name: customerName,
                email: email,
                phone: phone,
                branch_id: req.session.admin.branch_id,
            });
            if (save) {
                res.redirect('/admin/customer');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.edit = async function (req, res) {
        try {
            const id = req.params.id;
            const customerInfo = await models.customerSchema.findOne({ _id: id });
            res.render('backend/customer/edit.html', {
                userInfo: req.session.admin,
                customerInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.updateCustomer = async function (req, res) {
        try {
            const id = req.params.id;
            const { customerName, email, phone } = req.body;
            const update = await models.customerSchema.updateOne({ _id: id }, {
                customer_name: customerName,
                email: email,
                phone: phone,
            });
            if (update) {
                res.redirect('/admin/customer');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}