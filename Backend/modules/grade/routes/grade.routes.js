const express = require('express');
const router = express.Router();

const GradeController = require('../controller/grade.controller');
const authMiddleware = require('../../middleware/authUserMiddleware');
const authInstructor = require('../../middleware/authInstructor');
const authStudent = require('../../middleware/authStudent');

const gradeController = new GradeController();

router.get('/courseGrade/:instructorId', authMiddleware ,authInstructor , gradeController.getAllCourseAvg);
router.get('/course/:courseId', gradeController.getGradesForStudentsInCourse);
router.get('/:instructorId', authMiddleware ,authInstructor , gradeController.getAllGrades);
router.get('/:studentId', authMiddleware ,authInstructor , gradeController.getAllGradesForAStudent);
router.get('/:studentId/:courseId', authMiddleware ,authStudent , gradeController.getGradesForStudentInCourse);
router.put('/:studentId/:courseId', authMiddleware ,authInstructor ,  gradeController.updateGradesForStudentInCourse);
router.post('/:studentId/:courseId', authMiddleware ,authInstructor ,  gradeController.assignGradesForStudentInCourse);

module.exports = router;