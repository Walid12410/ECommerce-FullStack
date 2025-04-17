const Joi = require("joi");

// Validation schema for creating a new coupon
const createCouponSchema = Joi.object({
    Code: Joi.string()
        .required()
        .min(3)
        .max(20)
        .pattern(/^[A-Z0-9-]+$/)
        .messages({
            'string.empty': 'Coupon code is required',
            'string.min': 'Coupon code must be at least 3 characters long',
            'string.max': 'Coupon code must not exceed 20 characters',
            'string.pattern.base': 'Coupon code can only contain uppercase letters, numbers, and hyphens'
        }),
    Savings: Joi.number()
        .required()
        .min(0)
        .max(100)
        .messages({
            'number.base': 'Savings must be a number',
            'number.min': 'Savings cannot be negative',
            'number.max': 'Savings cannot exceed 100%',
            'any.required': 'Savings is required'
        }),
    MinOrderValue: Joi.number()
        .required()
        .min(0)
        .messages({
            'number.base': 'Minimum order value must be a number',
            'number.min': 'Minimum order value cannot be negative',
            'any.required': 'Minimum order value is required'
        }),
    StartDate: Joi.date()
        .required()
        .min('now')
        .messages({
            'date.base': 'Start date must be a valid date',
            'date.min': 'Start date cannot be in the past',
            'any.required': 'Start date is required'
        }),
    ExpiryDate: Joi.date()
        .required()
        .min(Joi.ref('StartDate'))
        .messages({
            'date.base': 'Expiry date must be a valid date',
            'date.min': 'Expiry date must be after start date',
            'any.required': 'Expiry date is required'
        })
});

// Validation schema for updating a coupon
const updateCouponSchema = Joi.object({
    Code: Joi.string()
        .min(3)
        .max(20)
        .pattern(/^[A-Z0-9-]+$/)
        .messages({
            'string.min': 'Coupon code must be at least 3 characters long',
            'string.max': 'Coupon code must not exceed 20 characters',
            'string.pattern.base': 'Coupon code can only contain uppercase letters, numbers, and hyphens'
        }),
    Savings: Joi.number()
        .min(0)
        .max(100)
        .messages({
            'number.base': 'Savings must be a number',
            'number.min': 'Savings cannot be negative',
            'number.max': 'Savings cannot exceed 100%'
        }),
    MinOrderValue: Joi.number()
        .min(0)
        .messages({
            'number.base': 'Minimum order value must be a number',
            'number.min': 'Minimum order value cannot be negative'
        }),
    StartDate: Joi.date()
        .min('now')
        .messages({
            'date.base': 'Start date must be a valid date',
            'date.min': 'Start date cannot be in the past'
        }),
    ExpiryDate: Joi.date()
        .min(Joi.ref('StartDate'))
        .messages({
            'date.base': 'Expiry date must be a valid date',
            'date.min': 'Expiry date must be after start date'
        })
}).min(1); // At least one field must be provided for update

// Validation function for creating a coupon
const validationCoupon = (data) => {
    return createCouponSchema.validate(data, { abortEarly: false });
};

// Validation function for updating a coupon
const validationUpdateCoupon = (data) => {
    return updateCouponSchema.validate(data, { abortEarly: false });
};

module.exports = {
    validationCoupon,
    validationUpdateCoupon
}; 