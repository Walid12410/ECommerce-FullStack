const Joi = require("joi");

// validation new user account
function validationRegisterCompanyUser(obj) {
    const schema = Joi.object({
        FullName: Joi.string().min(1).max(150).trim().required(),
        Email: Joi.string().min(5).trim().required().email(),
        Password: Joi.string().min(8).max(255).trim().required(),
        CompanyNo: Joi.number().integer().required()
    });

    return schema.validate(obj);
}

// validation login user
function validationLoginCompanyUser(obj) {
    const schema = Joi.object({
        Email: Joi.string().min(5).trim().required().email(),
        Password: Joi.string().min(8).max(255).trim().required()
    });
    return schema.validate(obj);
}


module.exports = {
    validationRegisterCompanyUser,
    validationLoginCompanyUser
};