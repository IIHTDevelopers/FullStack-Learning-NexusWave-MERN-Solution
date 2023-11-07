const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: { type: String },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  description: { type: String },
  dueDate: { type: Date },
  maxPoints: { type: Number },
  submissionCount: { type: Number },
});

module.exports = AssignmentSchema;