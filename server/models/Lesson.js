const mongoose = require('mongoose');

const { Schema } = mongoose;

const lessonSchema = Schema(
  {
    title: { type: String, trim: true, required: [true, 'Add a title'] },
    description: { type: String, trim: true, required: [true, 'Add a description'] },
    _teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'teacher id is required']
    },
    _students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    _grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }]
  },
  { timestamps: true }
);

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
