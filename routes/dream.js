const express = require("express");
const router = express.Router();

const dreamControlers = require("../controllers/dream");
const { getAllDreamTypes } = dreamControlers;

router.route("/dreamtypes").get(getAllDreamTypes);

module.exports = router;
