module.exports = function () {
     var module = {};

     module.stateSchema = require('./stateSchema')();
     module.citySchema = require('./citySchema')();
     module.branchSchema = require('./branchSchema')();
     module.userModel = require('./userSchema')();
     module.salarySchema = require('./salarySchema')();
     module.leavesSchema = require('./leavesSchema')();
     module.categorySchema = require('./categorySchema')();
     module.supplierSchema = require('./supplierSchema')();
     module.customerSchema = require('./customerSchema')();
     module.productSchema = require('./productSchema')();
     module.purchaseSchema = require('./purchaseSchema')();
     module.purchaseDetailSchema = require('./purchaseDetailSchema')();
     module.salesSchema = require('./salesSchema')();
     module.salesDetailSchema = require('./salesDetailSchema')();

     return module;
}