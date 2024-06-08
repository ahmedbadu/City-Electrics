module.exports = function () {
    var module = {};

    module.isLogin = function (req, res, next) {
        if (req.session.employee) {
            res.redirect('/employee/dashboard');
        }
        else {
            next();
        }
    }

    module.dashboardAccess = function(req,res,next){
        if(req.session.employee){
            next();
        }
        else{
            res.redirect('/employee/login');
        }
    }

    return module;
}