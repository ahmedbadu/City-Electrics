module.exports = function(models){
    var module = {};

    module.signInCheck = require('./signInCheck')();
    module.checkExistBranch = require('./checkExistBranch')(models);

    return module;
}