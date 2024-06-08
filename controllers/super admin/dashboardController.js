module.exports = function(models){

    var module = {}

    module.superAdminDashboard = function(req,res){
        try {
            const userInfo = req.session.super_admin;
            res.render('backend/dashboard.html',{
                userInfo,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}