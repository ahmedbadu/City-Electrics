const mongoose = require("mongoose")

module.exports = function () {
    var branchSchema = new mongoose.Schema({
        state_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'state_master',
        },
        city_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'city_master',
        },
        address: {
            type: String,
        },
        phone: {
            type: Number,
        },
        created_date: {
            type: String,
        }
    });
    var branchModel = mongoose.model('branch_master', branchSchema);
    return branchModel;
}