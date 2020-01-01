const mongoose = require("mongoose");
const { Schema } = mongoose;

const lessonSchema = Schema({
  title: String,
  description: String
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
