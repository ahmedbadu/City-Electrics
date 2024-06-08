const bcryptjs = require('bcryptjs');
module.exports = function (models) {

    var module = {};

    module.login = async function (req, res) {
        try {
            const postURL = '/employee/checkUser';
            const username = 'Employee';
            res.render('backend/auth/login.html', {
                postURL,
                username,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.checkUser = async function(req,res){
        try {
            const { email, password } = req.body;
            const verifyEmail = await models.userModel.findOne({
                email: email,
                user_type: 'employee',
            });
            if(verifyEmail){
                const comPass = await bcryptjs.compare(password,verifyEmail.password);
                if(comPass){
                    req.session.employee = verifyEmail;
                    res.redirect('/employee/dashboard');
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