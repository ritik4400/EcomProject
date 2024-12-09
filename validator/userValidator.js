const Joi = require('joi');

const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
});

const registerSchema = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    isAdmin:Joi.boolean().optional()
})

const updateUserSchema = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    isAdmin:Joi.boolean().optional()
})

module.exports={
    loginSchema,
    registerSchema,
    updateUserSchema
}