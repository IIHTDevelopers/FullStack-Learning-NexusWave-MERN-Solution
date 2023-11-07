const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  grade: { type: Number },
  gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
  gradeDate: { type: Date },
  comments: { type: String },
});

module.exports = GradeSchema;