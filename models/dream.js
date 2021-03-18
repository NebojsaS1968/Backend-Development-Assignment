const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const dream = new Schema({
  title: String,
  description: String,
  date: Date,
  type: {
    type: String,
    enum: ["happy", "sad", "exciting", "scary"],
  },
});

const Dream = mongoose.model("dream", dream);

module.exports = Dream;
