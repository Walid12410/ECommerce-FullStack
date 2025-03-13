const Joi = require("joi");

function validationCreateProductSize(obj) {
    const schema = Joi.object({
        ProductNo: Joi.number().required(),
        SizeValue: Joi.string().min(1).max(50).trim().required(),
        Quantity: Joi.number().required(),
    });

    return schema.validate(obj);
}


function validationUpdateProductSize(obj) {
    const schema = Joi.object({
        SizeValue: Joi.string().min(1).max(50).trim().required(),
        Quantity: Joi.number().required(),
    });

    return schema.validate(obj);
}


module.exports = { 
    validationUpdateProductSize,
    validationCreateProductSize
}