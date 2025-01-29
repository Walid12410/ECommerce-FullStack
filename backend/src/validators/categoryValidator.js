const Joi = require("joi");

// validation for new category
function validationNewCategory(obj) {
    const schema = Joi.object({
        CategoryName : Joi.string().min(1).max(150).trim().required()
    });

    return schema.validate(obj);
}


// validation for update category
function validationupdateCategory(obj) {
    const schema = Joi.object({
        CategoryName : Joi.string().min(1).max(150).trim().required()
    });

    return schema.validate(obj);
}

module.exports = {
    validationNewCategory,
    validationupdateCategory
}