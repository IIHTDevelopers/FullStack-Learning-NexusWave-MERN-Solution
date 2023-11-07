const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String },
  coursesTaught: [{
    courseId: String,
    courseTitle: String,
    courseDescription: String
  }],
});

InstructorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

InstructorSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const trimmedCandidatePassword = candidatePassword.trim();
    const isMatch = await bcrypt.compare(trimmedCandidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

module.exports = InstructorSchema;