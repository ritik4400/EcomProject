const Joi = require('joi');

const createProductSchema = Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().integer().precision(3).required(),
    category:Joi.string().required(),
    stock:Joi.number().required()
})

module.exports ={
    createProductSchema
};