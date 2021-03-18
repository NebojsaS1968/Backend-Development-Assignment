const Dream = require("../models/dream");

const getAllDreamTypes = async (req, res, next) => {
  const dreamTypes = Dream.schema.path("type").enumValues;
  res.status(200).send({ dreamTypes });
};

module.exports = {
  getAllDreamTypes,
};
