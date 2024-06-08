module.exports = function (app, models) {

    require('./authRoute')(app, models);
    require('./dashboardRoute')(app, models);
    require('./stateRoute')(app, models);
    require('./cityRoute')(app, models);
    require('./branchRoute')(app, models);
    require('./admin')(app, models);
    require('./employeeRoute')(app, models);
    require('./salaryRoute')(app, models);
    require('./leavesRoute')(app, models);

}