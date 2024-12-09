const Joi = require('joi');

const orderSchema = Joi.object({
    userId:Joi.string().required()
})

module.exports= {
    orderSchema
}