module.exports = function (models) {
    var module = {};

    module.view = async function (req, res) {
        try {
            const purchaseInfo = await models.purchaseSchema.find({ branch_id: req.session.admin.branch_id }).populate('supplier_id');
            res.render('backend/purchase/purchase.html', {
                userInfo: req.session.admin,
                purchaseInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            const [supplierInfo, categoryInfo] = await Promise.all([
                models.supplierSchema.find({ branch_id: req.session.admin.branch_id }),
                models.categorySchema.find(),
            ]);
            res.render('backend/purchase/add.html', {
                userInfo: req.session.admin,
                supplierInfo,
                categoryInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.getProducts = async function (req, res) {
        try {
            const id = req.query.category_id;
            const productInfo = await models.productSchema.find({ category_id: id });
            res.send(productInfo);
        } catch (error) {
            res.send(error.message);
        }
    }

    module.savePurchase = async function (req, res) {
        try {
            const { selectSupplier, date } = req.body;
            const purchaseData = await models.purchaseSchema.create({
                supplier_id: selectSupplier,
                branch_id: req.session.admin.branch_id,
                date: date,
                purchase_status: 'Pending',
            });
            if (purchaseData) {
                for (let i = 0; i < req.body.selectCategory.length; i++) {
                    let total = req.body.price[i] * req.body.quantity[i];
                    let data = {
                        product_id: req.body.selectProduct[i],
                        purchase_id: purchaseData._id,
                        price: req.body.price[i],
                        quantity: req.body.quantity[i],
                        total_price: total,
                    }
                    const purchaseDetails = await models.purchaseDetailSchema.create(data);
                    if (purchaseDetails) {
                        res.redirect('/admin/purchase');
                    }
                }
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.generateBill = async function (req, res) {
        try {
            const id = req.params.id;
            var subTotal = 0;
            const [purchaseInfo, purchaseInfoDetails] = await Promise.all([
                models.purchaseSchema.findOne({ _id: id }).populate('supplier_id'),
                models.purchaseDetailSchema.find({ purchase_id: id }).populate('product_id'),
            ]);
            for (let i = 0; i < purchaseInfoDetails.length; i++) {
                subTotal = subTotal + purchaseInfoDetails[i].total_price;
            }
            res.render('backend/purchase/generateBill.html', {
                userInfo: req.session.admin,
                purchaseInfo,
                purchaseInfoDetails,
                subTotal,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.deliveredStatus = async function (req, res) {
        try {
            const id = req.params.id;
            const delivered = await models.purchaseSchema.updateOne({ _id: id }, {
                purchase_status: 'Delivered',
            });
            if (delivered) {
                res.redirect('/admin/purchase');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.cancelledStatus = async function (req, res) {
        try {
            const id = req.params.id;
            const cancelled = await models.purchaseSchema.updateOne({ _id: id }, {
                purchase_status: 'Cancelled',
            });
            if (cancelled) {
                res.redirect('/admin/purchase');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;
}