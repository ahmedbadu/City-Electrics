var mongoose = require('mongoose');
module.exports = function () {

    var purchaseDetailSchema = new mongoose.Schema({
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product_master',
        },
        purchase_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'purchase_master',
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

    var purchaseDetailModel = mongoose.model('purchase_detail', purchaseDetailSchema);

    return purchaseDetailModel;

}