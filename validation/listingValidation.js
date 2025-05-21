// validation/listingValidation.js

const Joi = require('joi');

// For listings
const listingValidationSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),  
  location: Joi.string().required(),
  country: Joi.string().required()
});

// For reviews
const reviewValidationSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  })
});


module.exports = {
  listingValidationSchema,
  reviewValidationSchema
};
