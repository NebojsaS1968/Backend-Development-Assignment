const Joi = require("joi");

const addDreamSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const updateDreamSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});

module.exports = { addDreamSchema, updateDreamSchema };
