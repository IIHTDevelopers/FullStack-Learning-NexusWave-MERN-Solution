const InstructorServiceImpl = require('../service/impl/instructor.serviceImpl');

const instructorService = new InstructorServiceImpl();

class InstructorController {
    async loginInstructor(req, res) {
        const { email, password } = req.body;
        try {
            const result = await instructorService.loginInstructor(email, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ message: 'Login failed.' });
        }
    };

    async getAllInstructors(req, res) {
        try {
            const instructors = await instructorService.getAllInstructors();
            res.json(instructors);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of instructors.' });
        }
    };

    async createInstructor(req, res) {
        try {
            const newInstructor = await instructorService.createInstructor(req.body);
            res.status(201).json(newInstructor);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create instructor.' });
        }
    };

    async getInstructor(req, res) {
        try {
            const instructor = await instructorService.getInstructor(req.params.id);
            res.json(instructor);
        } catch (error) {
            res.status(404).json({ error: 'Instructor not found.' });
        }
    };

    async updateInstructor(req, res) {
        try {
            const updatedInstructor = await instructorService.updateInstructor(req.params.id, req.body);
            res.json(updatedInstructor);
        } catch (error) {
            res.status(404).json({ error: 'Instructor not found.' });
        }
    };

    async deleteInstructor(req, res) {
        try {
            const deletedInstructor = await instructorService.deleteInstructor(req.params.id);
            res.json(deletedInstructor);
        } catch (error) {
            res.status(404).json({ error: 'Instructor not found.' });
        }
    };

    async getAllCourses(req, res) {
        try {
            const courses = await instructorService.getAllCourses(req.params.instructorId);
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of Course by instructorId.' });
        }
    };

    async getCourse(req, res) {
        try {
            let courseId = req.params.courseId;
            let instructorId = req.params.instructorId;
            const course = await instructorService.getCourse(courseId, instructorId);
            res.json(course);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };

    async updateCourse(req, res) {
        try {
            let courseId = req.params.courseId;
            let instructorId = req.params.instructorId;
            let courseDetails = req.body;
            const course = await instructorService.updateCourse(courseId, instructorId, courseDetails);
            res.json(course);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };

    async deleteCourse(req, res) {
        try {
            let courseId = req.params.courseId;
            let instructorId = req.params.instructorId;
            const course = await instructorService.deleteCourse(courseId, instructorId);
            res.json(course);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };

    async getCourseInsights(req, res) {
        try {
            let instructorId = req.params.instructorId;
            const course = await instructorService.getCourseInsights(instructorId);
            res.json(course);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };

    async getAverageGrade(req, res) {
        try {
            let instructorId = req.params.instructorId;
            const course = await instructorService.getAverageGrade(instructorId);
            res.json(course);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };
}

module.exports = InstructorController;