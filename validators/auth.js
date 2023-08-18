const Joi = require('joi');

exports.postSignupSchema = Joi.object({
    fullName: Joi.string().min(3)
        .max(64).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
})

exports.postLoginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
})