const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.createflightSchema = Joi.object({
  fromAirport: Joi.string().regex(/^[a-zA-Z ]+$/).max(10).required(),
  toAirport: Joi.string().regex(/^[a-zA-Z ]+$/).max(10).required(),
  departureDate: Joi.date().required(),
  arrivalDate: Joi.date().required(),
  price: Joi.string().regex(/^\d+\.\d{0,2}$/).required(),
  passangerName: Joi.string().regex(/^[a-zA-Z ]+$/).max(300).required()
});

module.exports.selectflightSchema = Joi.object({
  id: Joi.objectId().required(),
});

module.exports.selectAllSchema = Joi.object({
  skip: Joi.number().integer().optional(),
  limit: Joi.number().integer().optional(),
}).and('skip', 'limit');

module.exports.updateflightSchema = Joi.object({
  fromAirport: Joi.string().regex(/^[a-zA-Z ]+$/).max(10).optional(),
  toAirport: Joi.string().regex(/^[a-zA-Z ]+$/).max(10).optional(),
  departureDate: Joi.date().optional(),
  arrivalDate: Joi.date().optional(),
  price: Joi.number().precision(2).min(0.00).max(999.99).optional(),
  passangerName: Joi.string().regex(/^[a-zA-Z ]+$/).max(300).optional()
});