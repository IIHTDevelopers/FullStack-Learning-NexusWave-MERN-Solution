const express = require('express');
const router = express.Router();

const StudentController = require('../controller/student.controller');
const authInstructor = require('../../middleware/authInstructor');
const authInstructorStudent = require('../../middleware/authInstructorStudent');
const authStudent = require('../../middleware/authStudent');
const authMiddleware = require('../../middleware/authUserMiddleware');
const studentController = new StudentController();

router.post('/login', studentController.loginStudent);
router.get('/search', studentController.searchStudent);
router.post('/review', authMiddleware, authStudent, studentController.addReview);
router.get('/popularCourses', studentController.getAllPopularCourses);

router.get('/enrolled/:instructorId', studentController.getAllStudents);

router.get('/:id',authMiddleware, authInstructorStudent, studentController.getStudent);
router.put('/:id', authMiddleware, authStudent,  studentController.updateStudent);
router.delete('/:id', authMiddleware,  authStudent,  studentController.deleteStudent);

router.post('/', studentController.createStudent);

module.exports = router;