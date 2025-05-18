const Joi = require('joi');

const listingValidationSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),  
  location: Joi.string().required(),
  country: Joi.string().required()
});

module.exports = listingValidationSchema;
