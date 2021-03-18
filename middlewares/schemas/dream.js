const Joi = require("joi");

const addDreamSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
});

module.exports = { addDreamSchema };
