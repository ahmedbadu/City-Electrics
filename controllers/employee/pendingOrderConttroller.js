module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const salesInfo = await models.salesSchema.find({ branch_id: req.session.employee.branch_id,sales_status:'Pending' }).sort({ _id: -1 }).populate('customer_id');
            res.render('backend/sales/pendingOrders.html', {
                userInfo: req.session.employee,
                salesInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}