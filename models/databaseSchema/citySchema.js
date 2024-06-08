var mongoose = require('mongoose');
module.exports = function () {
    var citySchema = new mongoose.Schema({
        city_name: {
            type: String,
        },
        state_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'state_master',
        },
        created_date: {
            type: String,
        }
    });
    var cityModel = mongoose.model('city_master', citySchema);
    return cityModel;
}