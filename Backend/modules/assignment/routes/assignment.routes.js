const express = require('express');
const router = express.Router();

const AssignmentController = require('../controller/assignment.controller');
const authMiddleware = require('../../middleware/authUserMiddleware');
const authStudent = require('../../middleware/authStudent');
const authInstructorStudent = require('../../middleware/authInstructorStudent');
const assignmentController = new AssignmentController();

router.get('/', authMiddleware, authInstructorStudent, assignmentController.getAllAssignmentsForInstructorOrStudent);
router.post('/', authMiddleware, authInstructorStudent, assignmentController.createAssignment);
router.get('/submitted', authMiddleware, authInstructorStudent, assignmentController.submittedAssignmentByInstructorOrStudent); // submitted assignment
router.get('/unsubmitted', authMiddleware, authInstructorStudent, assignmentController.unsubmittedAssignmentByInstructorOrStudent);
router.post('/submit', authMiddleware, authStudent, assignmentController.submitAssignment);
router.get('/stutus/:id', authMiddleware, authStudent, assignmentController.getSubmissionStatus);
router.get('/search', authMiddleware, assignmentController.searchAssignment);

module.exports = router;