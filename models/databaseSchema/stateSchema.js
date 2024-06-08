var mongoose = require('mongoose');
module.exports= function(){
    var stateSchema = new mongoose.Schema({
        state_name:{
            type: String,
        },
        created_date:{
            type: String,
        }
    });
    var stateModel = mongoose.model('state_master',stateSchema);
    return stateModel;
}