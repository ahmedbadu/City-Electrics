module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const userInfo = req.session.admin;
            const categoryInfo = await models.categorySchema.find({}).sort({ _id: -1 });
            res.render('backend/category/category.html', {
                userInfo,
                categoryInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.add = async function (req, res) {
        try {
            const userInfo = req.session.admin;
            res.render('backend/category/add.html', {
                userInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.saveCategory = async function (req, res) {
        try {
            const { categoryName, description } = req.body;
            const saveCategory = await models.categorySchema.create({
                category_name: categoryName,
                description: description,
            });
            if (saveCategory) {
                res.redirect('/admin/category');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    module.edit = async function (req, res) {
        try {
            const id = req.params.id;
            const categoryData = await models.categorySchema.findOne({ _id: id });
            res.render('backend/category/edit.html', {
                categoryData,
                userInfo : req.session.admin,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.updateCategory = async function (req, res) {
        try {
            const id = req.params.id;
            const { categoryName, description } = req.body;
            const update = await models.categorySchema.updateOne({ _id: id }, {
                category_name: categoryName,
                description: description,
            });
            if(update){
                res.redirect('/admin/category');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}