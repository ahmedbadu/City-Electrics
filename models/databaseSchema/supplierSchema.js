const mongoose = require('mongoose');
module.exports = function(){

    var supplierSchema = new mongoose.Schema({
        supplier_name:{
            type: String,
        },
        email:{
            type: String,
        },
        phone:{
            type: Number,
        },
        branch_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'branch_master',
        },
    });

    var supplierModel = mongoose.model('supplier_master',supplierSchema);

    return supplierModel;

}