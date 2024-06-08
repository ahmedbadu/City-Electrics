module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const salesInfo = await models.salesSchema.find({ branch_id: req.session.admin.branch_id }).sort({ _id: -1 }).populate('customer_id');
            res.render('backend/sales/sales.html', {
                userInfo: req.session.admin,
                salesInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            const [customerInfo, categoryInfo] = await Promise.all([
                models.customerSchema.find({ branch_id: req.session.admin.branch_id }),
                models.categorySchema.find({}),
            ])
            res.render('backend/sales/add.html', {
                userInfo: req.session.admin,
                customerInfo,
                categoryInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveSales = async function (req, res) {
        try {
            const { selectCustomer, date } = req.body;
            const saveSales = await models.salesSchema.create({
                customer_id: selectCustomer,
                branch_id: req.session.admin.branch_id,
                date: date,
                sales_status: "Pending",
            });
            if (saveSales) {
                for (let i = 0; i < req.body.selectCategory.length; i++) {
                    var total_price = req.body.price[i] * req.body.quantity[i];
                    let data = {
                        product_id: req.body.selectProduct[i],
                        sales_id: saveSales._id,
                        price: req.body.price[i],
                        quantity: req.body.quantity[i],
                        total_price: total_price,
                    }
                    var sales_details = await models.salesDetailSchema.create(data);
                }
                res.redirect('/admin/sales');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.generateBill = async function(req,res){
        try {
            const id = req.params.id;
            var subTotal = 0;
            const [salesInfo,salesDetailInfo] = await Promise.all([
                models.salesSchema.findOne({_id: id}).populate('customer_id'),
                models.salesDetailSchema.find({sales_id: id}).populate('product_id'),
            ]);
            for(let i=0;i<salesDetailInfo.length;i++){
                subTotal += salesDetailInfo[i].total_price;
            }
            res.render('backend/sales/generateBill.html',{
                userInfo: req.session.admin,
                salesInfo,
                salesDetailInfo,
                subTotal,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}