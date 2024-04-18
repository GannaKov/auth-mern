const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const imageSchema = new Schema({
  name: {
    type: String,
    required: [true, "Required"],
  },
  path: {
    type: String,
    required: [true, "Required"],
  },
});

const Image = model("Image", imageSchema);

module.exports = Image;
