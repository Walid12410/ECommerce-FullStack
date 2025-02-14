const Joi = require("joi");


function validationOffer(obj) {
    const schema = Joi.object({
        ProductNo: Joi.number().required(),
        DiscountAmt: Joi.number().required(),
        StartDate: Joi.date().required(),
        EndDate: Joi.date().required(),
    });

    return schema.validate(obj);
}

module.exports = {
    validationOffer
}