module.exports = function () {
    var module = {};

    module.signInCheck = require('./signInCheck')();

    return module;
}