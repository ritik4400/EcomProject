const Joi = require('joi');

const cartSchema = Joi.object({
    userId:Joi.string().required(),
    productId:Joi.string().required(),
     quantity:Joi.number().required()
})

module.exports= {
    cartSchema
}