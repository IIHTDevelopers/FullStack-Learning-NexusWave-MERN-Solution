var mongoose = require('mongoose');

var InstructorSchema = require('../schemas/instructor.schema');
module.exports = mongoose.model('Instructor', InstructorSchema); 