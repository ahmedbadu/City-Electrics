module.exports = function (models) {

    var module = {};

    module.viewSalaryReport = async function (req, res) {
        try {
            res.render('backend/report/salaryReport.html', {
                userInfo: req.session.admin,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.getSalaryReport = async function (req, res) {
        try {
            const { start_date, end_date } = req.body;
            const getSalary = await models.salarySchema.find({
                salary_date: {
                    $gte: start_date,
                    $lte: end_date,
                }
            }).populate('employee_id');
            res.send(getSalary);
        } catch (error) {
            res.send(error.message);
        }
    }

    module.viewSalesReport = async function (req, res) {
        try {
            res.render('backend/report/salesReport.html',{
                userInfo: req.session.admin,
            });
        } catch (error) {
            res.send(error.message);
        }
    }

    module.getSalesReport = async function(req,res){
        try {
            
        } catch (error) {
            res.send(error.message);
        }
    }

    return module;

}