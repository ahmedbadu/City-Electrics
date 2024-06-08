const Joi = require('joi');

const userValidate = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().length(10).required(),
    password: Joi.string().required(),
    branch_id: Joi.string().required(),
});

module.exports = userValidate;