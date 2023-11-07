var mongoose = require('mongoose');

var GradeSchema = require('../schemas/grade.schema');
module.exports = mongoose.model('Grade', GradeSchema); 