const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'teacher id is required'] },
  _lesson: { type: Schema.Types.ObjectId, ref: 'Lesson' },
  _grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
