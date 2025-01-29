const Joi = require("joi");


function validationBrand(obj) {
    const schema = Joi.object({
        BrandName: Joi.string().min(1).max(255).trim().required(),
    });

    return schema.validate(obj);
}


module.exports = {
    validationBrand
}