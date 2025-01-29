const Joi = require("joi");


// validaion new subCategory
function validationNewSubCategory(obj) {
    const schema = Joi.object({
        SubCategoryName: Joi.string().min(1).max(150).trim().required(),
        CategoryNo: Joi.number().integer().required()
    });

    return schema.validate(obj);
}

// validation update subCategory
function validationUpdateSubCategory(obj){
    const schema = Joi.object({
        SubCategoryName: Joi.string().min(1).max(150).trim().required(),
        CategoryNo: Joi.number().integer().required()
    });

    return schema.validate(obj);
}

module.exports = {
    validationNewSubCategory,
    validationUpdateSubCategory
}