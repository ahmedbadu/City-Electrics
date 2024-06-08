module.exports = function (models) {

    var module = {};

    module.view = async function (req, res) {
        try {
            const userInfo = req.session.employee;
            res.render('backend/dashboard.html', {
                userInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.signOut = function (req, res) {
        try {
            req.session.employee = null;
            res.redirect('/employee/login');
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}