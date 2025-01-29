const Joi = require("joi");

function validationGender(obj) {
    const schema = Joi.object({
        GenderName: Joi.string().min(1).max(255).trim().required(),
    });

    return schema.validate(obj);
}

module.exports = {
    validationGender
}