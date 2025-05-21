const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please enter a valid email address.',
      'any.required': 'Email is required.'
    }),
  password: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 6 characters.',
      'any.required': 'Password is required.'
    })
});

const registerSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.empty': 'Username is required.',
      'any.required': 'Username is required.'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please enter a valid email address.',
      'any.required': 'Email is required.'
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.'
    }),
  role: Joi.string()
    .optional()
    .messages({
      'string.base': 'Role must be a string.'
    })
});

const updateUserSchema = Joi.object({
  username: Joi.string()
    .optional()
    .messages({
      'string.base': 'Username must be a string.'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages({
      'string.email': 'Please enter a valid email address.'
    }),
  password: Joi.string()
    .optional()
    .messages({
      'string.base': 'Password must be a string.'
    }),
  role: Joi.string()
    .optional()
    .messages({
      'string.base': 'Role must be a string.'
    })
});



module.exports={
    loginSchema,
registerSchema,
    updateUserSchema
}