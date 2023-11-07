const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
  ratings: [Number],
  reviews: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    comment: String,
    rating: Number,
  }],
  content: [{
    moduleTitle: String,
    topics: [String],
    readings: [String],
    assignments: [String],
  }]
});

module.exports = CourseSchema;