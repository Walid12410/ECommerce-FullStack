const Joi = require("joi");

// validation new user account
function validationRegisterUser(obj) {
    const schema = Joi.object({
        UserName: Joi.string().min(1).max(100).trim().required(),
        Email: Joi.string().min(5).trim().required().email(),
        Password: Joi.string().min(8).max(255).trim().required(),
        PhoneNumber: Joi.string().min(8).max(20).trim().required(),
    });

    return schema.validate(obj);
}

// validation login user
function validationLoginUser(obj) {
    const schema = Joi.object({
        Email: Joi.string().min(5).trim().required().email(),
        Password: Joi.string().min(8).max(255).trim().required()
    });
    return schema.validate(obj);
}


// validation update user
function validationUpdateUser(obj) {
    const schema = Joi.object({
        UserName: Joi.string().min(1).max(100).trim(),
        PhoneNumber: Joi.string().min(8).max(20).trim(),
    });

    return schema.validate(obj);
}

module.exports = {
    validationRegisterUser,
    validationLoginUser,
    validationUpdateUser
};