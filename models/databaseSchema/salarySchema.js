var mongoose = require('mongoose');
module.exports = function () {
    var salarySchema = new mongoose.Schema({
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user_master',
        },
        salary_date: {
            type: String,
        },
        salary_month: {
            type: String,
        },
        salary_amount: {
            type: String,
        },
    });

    var salaryModel = mongoose.model('salary_master', salarySchema);
    return salaryModel;
}