var express = require('express');
var http = require('http');
var nunjucks = require('nunjucks');
const cookieSession = require('cookie-session');
const connectDB = require('./config/connection');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.use(cookieSession({
    name: 'city electrics',
    secret: 'City@electrics#1234',
    maxAge: 1 * 60 * 60 * 1000,
}))

var models = require('./models/databaseSchema/index')();

require('./routes/super admin/index')(app, models);
require('./routes/admin/index')(app, models);
require('./routes/employee/index')(app, models);

server.listen(port, () => {
    console.log(`server listen on port ${port}`);
});

require('./config/error')(app);