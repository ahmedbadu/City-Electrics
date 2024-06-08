module.exports = function(models){

    var module = {};

    module.view = async function(req,res){
        try {
            const userInfo = req.session.admin;
            res.render('backend/dashboard.html',{
                userInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.signOut = function(req,res){
        try {
            req.session.admin = null;
            res.redirect('/admin/login');
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}