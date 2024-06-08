var mongoose = require('mongoose');
module.exports = function () {

    var productSchema = new mongoose.Schema({
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category_master',
        },
        product_name: {
            type: String,
        },
        price: {
            type: String,
        },
        description: {
            type: String,
        },
        product_image: {
            type: String,
        }
    });

    const productModel = mongoose.model('product_master', productSchema);

    return productModel;

}