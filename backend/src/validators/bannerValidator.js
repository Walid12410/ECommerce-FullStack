const Joi = require("joi");


function validationBanner(obj) {
    const schema = Joi.object({
        Title: Joi.string().min(1).max(500).trim().required(),
        Description: Joi.string().min(1).max(500).trim().required(),
        StartDate: Joi.date().required(),
        EndDate: Joi.date().required(),
        IsActive: Joi.bool().required(),
        SubCategoryNo: Joi.number().required(),
    });

    return schema.validate(obj);
}

const validationUpdateImage = (data) => {
    const schema = Joi.object({
        ImagePublicID: Joi.string().required(),  // Ensure it's a string
    });
    return schema.validate(data);
};



module.exports = {
    validationBanner,
    validationUpdateImage
}