const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  lessons: [
    {
      grade: { type: Schema.Types.ObjectId, ref: 'Grade' },
      lesson: { type: Schema.Types.ObjectId, ref: 'Lesson' }
    }
  ]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
