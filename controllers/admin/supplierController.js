module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const supplierInfo = await models.supplierSchema.find({ branch_id: req.session.admin.branch_id }).sort({ _id: -1 }).populate('branch_id');
            res.render('backend/supplier/supplier.html', {
                userInfo: req.session.admin,
                supplierInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            res.render('backend/supplier/add.html', {
                userInfo: req.session.admin,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveSupplier = async function (req, res) {
        try {
            const { supplierName, email, phone } = req.body;
            const save = await models.supplierSchema.create({
                supplier_name: supplierName,
                email: email,
                phone: phone,
                branch_id: req.session.admin.branch_id,
            });
            if (save) {
                res.redirect('/admin/supplier');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.edit = async function (req, res) {
        try {
            const id = req.params.id;
            const supplierData = await models.supplierSchema.findOne({ _id: id });
            res.render('backend/supplier/edit.html', {
                userInfo: req.session.admin,
                supplierData,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.updateSupplier = async function (req, res) {
        try {
            const id = req.params.id;
            const { supplierName, email, phone } = req.body;
            const update = await models.supplierSchema.updateOne({ _id: id }, {
                supplier_name: supplierName,
                email: email,
                phone: phone,
            });
            if (update) {
                res.redirect('/admin/supplier');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}