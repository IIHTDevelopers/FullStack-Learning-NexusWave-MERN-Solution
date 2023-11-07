var mongoose = require('mongoose');

var CourseSchema = require('../schemas/course.schema');
module.exports = mongoose.model('Course', CourseSchema); 