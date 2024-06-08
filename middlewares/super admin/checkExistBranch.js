module.exports = function (models) {
    var module = {};

    module.checkBranch = async function (req, res, next) {
        try {
            if (req.file && req.file.filename) {
                const countUser = await models.userModel.find({ branch_id: req.body.branch_id });
                if (countUser.length == 0) {
                    next();
                }
                else {
                    res.send('<script>alert("Branch already exist...!");document.location="/superAdmin/admin";</script>');
                }
            }
            else {
                const countUser = await models.userModel.find({ branch_id: req.body.branch_id });
                if (countUser.length == 0) {
                    next();
                }
                else {
                    res.send('<script>alert("Branch already exist...!");document.location="/superAdmin/admin";</script>');
                }
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;
}