var mongoose = require('mongoose');

var StudentSchema = require('../schemas/student.schema');
module.exports = mongoose.model('Student', StudentSchema); 