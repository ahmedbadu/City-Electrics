module.exports = function (app) {

    app.use(function (req, res, next) {
        const fs = require('fs');
        res.writeHead(404, { 'content-type': 'text/html' });
        fs.readFile('./views/error/error-404.html', null, function (error, data) {
            if (error) {
                res.write('not found');
            }
            else {
                res.write(data);
            }
            res.end();
        })
    });

}