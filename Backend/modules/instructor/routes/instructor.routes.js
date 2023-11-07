const express = require('express');
const router = express.Router();

const InstructorController = require('../controller/instructor.controller');
const authMiddleware = require('../../middleware/authUserMiddleware');
const authInstructor = require('../../middleware/authInstructor');
const instructorController = new InstructorController();

router.post('/login', instructorController.loginInstructor);
router.get('/', instructorController.getAllInstructors);
router.post('/', instructorController.createInstructor);

router.use(authMiddleware);
router.use(authInstructor);

router.get('/:id', instructorController.getInstructor);
router.put('/:id', instructorController.updateInstructor);
router.delete('/:id', instructorController.deleteInstructor);

router.get('/courses/:instructorId', instructorController.getAllCourses);
router.get('/courses/:instructorId/insights', instructorController.getCourseInsights);
router.get('/courses/:instructorId/students/grades', instructorController.getAverageGrade);
router.get('/courses/:courseId/:instructorId', instructorController.getCourse);
router.put('/courses/:courseId/:instructorId', instructorController.updateCourse);
router.delete('/courses/:courseId/:instructorId', instructorController.deleteCourse);

module.exports = router;