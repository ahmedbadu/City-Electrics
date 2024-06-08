var mongoose = require('mongoose');
module.exports = function () {
    var userSchema = new mongoose.Schema({
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: Number,
        },
        password: {
            type: String,
        },
        profile: {
            type: String,
        },
        user_type: {
            type: String,
            Enumerator: ['super admin', 'admin', 'employee'],
        },
        branch_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'branch_master',
        },
        delete_status: {
            type: Number,
            default: 0,
        }
    });

    var userModel = mongoose.model('user_master', userSchema);

    return userModel;

}