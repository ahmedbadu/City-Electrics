var mongoose = require('mongoose');

module.exports = function () {
    var salesSchema = new mongoose.Schema({
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customer_master',
        },
        branch_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'branch_master',
        },
        date: {
            type: String,
        },
        sales_status: {
            type: String,
            enum: ['Pending', 'Delivered', 'Cancelled'],
        },
    });
    var salesModel = mongoose.model('sales_master', salesSchema);
    return salesModel;
}