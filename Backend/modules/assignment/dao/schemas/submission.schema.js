const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  submittedAt: { type: Date },
  status: { type: String },
  submittedFiles: [{ filename: String, filePath: String }],
  comments: { type: String },
});

module.exports = SubmissionSchema;