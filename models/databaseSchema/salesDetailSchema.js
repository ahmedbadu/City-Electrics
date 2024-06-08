var mongoose = require('mongoose');

module.exports = function () {

    var salesDetailSchema = new mongoose.Schema({
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product_master',
        },
        sales_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sales_master',
        },
        price: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        total_price: {
            type: Number,
        }
    });

    var salesDetailModel = mongoose.model('sales_detail', salesDetailSchema);
    return salesDetailModel;

}