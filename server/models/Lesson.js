const mongoose = require('mongoose');

const { Schema } = mongoose;

const lessonSchema = Schema({
  title: { type: String, required: true },
  description: String,
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
