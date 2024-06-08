var mongoose = require('mongoose');
module.exports = function () {

    var purchaseSchema = new mongoose.Schema({
        supplier_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'supplier_master',
        },
        branch_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'branch_master',
        },
        date: {
            type: String,
        },
        purchase_status: {
            type: String,
            enum: ['Pending', 'Delivered', 'Cancelled'],
        }
    });

    const purchaseModel = mongoose.model('purchase_master', purchaseSchema);

    return purchaseModel;

}