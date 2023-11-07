var mongoose = require('mongoose');

var SubmissionSchema = require('../schemas/submission.schema');
module.exports = mongoose.model('Submission', SubmissionSchema); 