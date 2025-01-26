const Joi = require("joi");


// validation create product
function validationCreateProduct(obj) {
    const schema = Joi.object({
        ProductName: Joi.string().min(1).max(150).trim().required(),
        ProductDesc: Joi.string().min(1).max(500).trim().required(),
        Price: Joi.number().required(),
        Stock: Joi.number().required(),
        SubCategoryNo: Joi.number().integer().required(),
        CreatedAt : Joi.date().required(),
        CompanyNo : Joi.number().required(),
    });

    return schema.validate(obj);
}


module.exports = { 
    validationCreateProduct
}