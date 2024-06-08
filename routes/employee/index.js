module.exports = function (app, models) {

    require('./authRoute')(app, models);
    require('./dashboardRoute')(app, models);
    require('./leavesRoute')(app, models);
    require('./salaryRoute')(app, models);
    require('./pendingOrderRoute')(app, models);

}