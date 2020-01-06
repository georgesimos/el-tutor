const mongoose = require('mongoose');

const { Schema } = mongoose;

const lessonSchema = Schema({
  title: { type: String, required: true },
  description: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
