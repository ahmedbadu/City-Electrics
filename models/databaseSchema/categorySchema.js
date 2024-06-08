var mongoose = require('mongoose');
module.exports = function () {

    var categorySchema = new mongoose.Schema({
        category_name: {
            type: String,
        },
        description: {
            type: String,
        }
    });

    const categoryModel = mongoose.model('category_master', categorySchema);

    return categoryModel;

}