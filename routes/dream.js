const express = require("express");
const router = express.Router();

const {
  addDreamSchema,
  updateDreamSchema,
} = require("../middlewares/schemas/dream");

const { validation } = require("../middlewares/validation");

const dreamControlers = require("../controllers/dream");
const {
  getAllDreamTypes,
  getAllDreams,
  getDreamById,
  createNewDream,
  updateDream,
  deleteDream,
  deleteAllDreams,
} = dreamControlers;

router.route("/dreamtypes").get(getAllDreamTypes);

router
  .route("/")
  .get(getAllDreams)
  .post(validation(addDreamSchema), createNewDream)
  .delete(deleteAllDreams);

router
  .route("/:id")
  .get(getDreamById)
  .patch(validation(updateDreamSchema), updateDream)
  .delete(deleteDream);

module.exports = router;
