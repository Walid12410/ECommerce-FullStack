const Joi = require("joi");

function validationColor(obj) {
    const schema = Joi.object({
        ColorName: Joi.string().min(1).max(255).trim().required(),
    });

    return schema.validate(obj);
}

module.exports = {
    validationColor
}