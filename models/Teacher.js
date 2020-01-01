const mongoose = require("mongoose");
const { Schema } = mongoose;

const teacherSchema = Schema({
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson" }
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
