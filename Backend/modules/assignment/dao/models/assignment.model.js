var mongoose = require('mongoose');

var AssignmentSchema = require('../schemas/assignment.schema');
module.exports = mongoose.model('Assignment', AssignmentSchema); 