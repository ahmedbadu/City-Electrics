const mongoose = require('mongoose');
module.exports = function () {

    var customerSchema = new mongoose.Schema({
        customer_name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: Number,
        },
        branch_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'branch_master',
        }
    });

    const customerModel = mongoose.model('customer_master', customerSchema);

    return customerModel;

}