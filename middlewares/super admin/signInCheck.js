module.exports = function(){

    var module = {};

    module.isLogin = function(req,res,next){
        if(req.session.super_admin){
            res.redirect('/superAdmin/dashboard');
        }
        else{
            next();
        }
    }

    module.dashboardAccess = function(req,res,next){
        if(req.session.super_admin){
            next();
        }
        else{
            res.redirect('/superAdmin/login');
        }
    }

    return module;

}