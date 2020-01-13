const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'user id is required'] },
  _lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  _grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
