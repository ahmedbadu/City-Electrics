module.exports = function () {
    var module = {};

    module.isLogin = function (req, res, next) {
        if (req.session.admin) {
            res.redirect('/admin/dashboard');
        }
        else {
            next();
        }
    }

    module.dashboardAccess = function(req,res,next){
        if(req.session.admin){
            next();
        }
        else{
            res.redirect('/admin/login');
        }
    }

    return module;
}