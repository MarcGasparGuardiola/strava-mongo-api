const Joi = require('@hapi/joi');
const c = require('../config/constants');

module.exports.validate = (schema, inputValidation) => {
  return (req, res, next) => {
    let objToValidate;

    switch (inputValidation) {
      case 'body':
        objToValidate = req.body;
        break;
      case 'params':
        objToValidate = req.params;
        break;
      case 'query':
        objToValidate = req.query;
        break;
      default:
        objToValidate = {};
        break;
    }

    const result = schema.validate(objToValidate);

    if (result.error) {
      // console.log(result.error);
      const errorDetails = result.error.details.map((error) => error.message);
      res.status(c.status.badRequest).send({
        title: 'ERROR input',
        errorDetails
      });
    } else {
      next();
    }
  };
};