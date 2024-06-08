module.exports = function (app, models) {

    require('./authRoute')(app, models);
    require('./dashboardRoute')(app, models);
    require('./employeeRoute')(app, models);
    require('./salaryRoute')(app, models);
    require('./leavesRoute')(app, models);
    require('./categoryRoute')(app, models);
    require('./supplierRoute')(app, models);
    require('./customerRoute')(app, models);
    require('./productRoute')(app, models);
    require('./purchaseRoute')(app, models);
    require('./salesRoute')(app, models);
    require('./reportRoute')(app, models);

}