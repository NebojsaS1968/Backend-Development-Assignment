const Dream = require("../models/dream");

const getAllDreamTypes = async (req, res, next) => {
  const dreamTypes = Dream.schema.path("type").enumValues;
  res.status(200).send({ dreamTypes });
};

const getAllDreams = async (req, res, next) => {
  const { title, type, startDate, endDate } = req.query;
  const dreamTypes = Dream.schema.path("type").enumValues;

  // query by type and date range
  if (type && startDate && endDate) {
    for (i = 0; i < dreamTypes.length; i++) {
      if (type === dreamTypes[i]) {
        const queryType = await Dream.find({ type: dreamTypes[i] })
          .where("date")
          .gte(startDate)
          .lte(endDate);
        return res.status(200).send({ dreams: queryType });
      }
    }
  } else {
    for (i = 0; i < dreamTypes.length; i++) {
      if (type === dreamTypes[i]) {
        const queryType = await Dream.find({ type: dreamTypes[i] });
        return res.status(200).send({ dreams: queryType });
      }
    }
  }

  // query by title
  if (title) {
    const queryTitle = await Dream.find({ title });
    return res.status(200).send({ dreams: queryTitle });
  }

  //query by date range
  if (startDate && endDate) {
    const queryDate = await Dream.find({
      date: { $gte: startDate, $lte: endDate },
    });
    return res.status(200).send({ dreams: queryDate });
  }

  // NO queries
  const dreams = await Dream.find({});
  res.status(200).send({ dreams });
};

const getDreamById = async (req, res, next) => {
  const { id } = req.params;
  const dream = await Dream.findById(id);
  res.status(200).send({ dream });
};

const createNewDream = async (req, res, next) => {
  // Check to see if type is included in enum in model or not
  const dreamTypes = Dream.schema.path("type").enumValues;
  if (!dreamTypes.includes(req.body.type)) {
    return res.status(400).send({ error: "That type value is not available" });
  }

  const newDream = {
    title: req.body.title,
    description: req.body.description,
    date: new Date(),
    type: req.body.type,
  };

  const dream = new Dream(newDream);
  const saveDream = await dream.save();
  res.status(201).send({ msg: "Dream is saved", newDream: saveDream });
};

const updateDream = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;

  // Check to see if type is included in enum in model or not
  if (req.body.type) {
    const dreamTypes = Dream.schema.path("type").enumValues;
    if (!dreamTypes.includes(req.body.type)) {
      return res
        .status(400)
        .send({ error: "That type value is not available" });
    }
  }

  const dream = await Dream.findByIdAndUpdate(id, update);
  await dream.save();
  res.status(201).send({ msg: "Dream is updated" });
};

const deleteDream = async (req, res, next) => {
  const { id } = req.params;
  await Dream.findByIdAndDelete(id);
  res.status(200).send({ msg: `Dream with the id of ${id} is deleted` });
};

const deleteAllDreams = async (req, res, next) => {
  await Dream.deleteMany();
  res.status(200).send({ msg: "All dreams deleted" });
};

module.exports = {
  getAllDreamTypes,
  getAllDreams,
  getDreamById,
  createNewDream,
  updateDream,
  deleteDream,
  deleteAllDreams,
};
