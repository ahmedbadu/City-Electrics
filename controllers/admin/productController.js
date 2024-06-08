module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const productInfo = await models.productSchema.find({}).sort({ _id: -1 }).populate('category_id');
            res.render('backend/product/product.html', {
                userInfo: req.session.admin,
                productInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            const [categoryInfo] = await Promise.all([
                models.categorySchema.find({}),
            ]);
            res.render('backend/product/add.html', {
                userInfo: req.session.admin,
                categoryInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveProduct = async function (req, res) {
        try {
            for(let i=0;i<req.body.productName.length;i++){
                let data = {
                    category_id: req.body.selectCategory,
                    product_name: req.body.productName[i],
                    price: req.body.price[i],
                    product_image: req.body.image[i],
                    description: req.body.description[i],
                }
                const saveProduct = await models.productSchema.create(data);
            }
            res.redirect('/admin/product');
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}