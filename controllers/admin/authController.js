const bcryptjs = require('bcryptjs');
module.exports = function (models) {
    var module = {};

    module.login = function (req, res) {
        try {
            const postURL = '/admin/checkUser';
            const username = 'Admin';
            res.render('backend/auth/login.html', {
                postURL,
                username,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.checkUser = async function (req, res) {
        try {
            const { email, password } = req.body;
            const verifyEmail = await models.userModel.findOne({
                email: email,
                user_type: 'admin',
            });
            if(verifyEmail){
                const comPass = await bcryptjs.compare(password,verifyEmail.password);
                if(comPass){
                    req.session.admin = verifyEmail;
                    res.redirect('/admin/dashboard');
                }
                else{
                    res.send('<script>alert("Invalid password!");history.back();</script>');
                }
            }
            else{
                res.send('<script>alert("Invalid email and password!");history.back();</script>');
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;
}