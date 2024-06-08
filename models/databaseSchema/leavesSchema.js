var mongoose = require('mongoose');
module.exports = function () {

    var leavesSchema = new mongoose.Schema({
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user_master',
        },
        from_date: {
            type: String,
        },
        to_date: {
            type: String,
        },
        leave_type: {
            type: String,
            enum: ['Paid', 'Unpaid'],
        },
        applied_for: {
            type: String,
            enum: ['full day', 'half day 1st half', 'half day 2nd half'],
        },
        description: {
            type: String,
        },
        leave_status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
        }
    });

    const leavesModel = mongoose.model('leaves_master', leavesSchema);
    return leavesModel;

}