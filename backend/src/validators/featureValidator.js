const Joi = require("joi");


function validationFeature(obj) {
    const schema = Joi.object({
        ProductNo: Joi.number().integer().required(),
        StartDate: Joi.date().required(),
        EndDate: Joi.date().required(),
    });

    return schema.validate(obj);
}


module.exports = validationFeature;