const Joi = require("joi");


function validationCompany(obj) {
    const schema = Joi.object({
        CompanyName: Joi.string().min(1).max(150).trim().required(),
        CompanyEmail: Joi.string().min(5).trim().required().email(),
        CompanyNumber: Joi.string().min(8).max(20).required(),
        CompanyLocation: Joi.string().min(5).max(255).required(),
        Description: Joi.string().min(5).max(500).required(),
    });

    return schema.validate(obj);
}


module.exports = validationCompany;