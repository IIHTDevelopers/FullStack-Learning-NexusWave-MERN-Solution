const StudentServiceImpl = require('../service/impl/student.serviceImpl');

const studentService = new StudentServiceImpl();

class StudentController {
    async loginStudent(req, res) {
        const { email, password } = req.body;
        try {
            const result = await studentService.loginStudent(email, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ message: 'Login failed.' });
        }
    };

    async getAllStudents(req, res) {
        try {
            const instructorId = req.params.instructorId;
            const students = await studentService.getAllStudents(instructorId);
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of students.' });
        }
    };

    async createStudent(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'name, email and password are required.' });
            } else {
                const newStudent = await studentService.createStudent(req.body);
                res.status(201).json(newStudent);
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to create student.' });
        }
    };

    async getStudent(req, res) {
        try {
            const student = await studentService.getStudent(req.params.id);
            res.json(student);
        } catch (error) {
            res.status(404).json({ error: 'Student not found.' });
        }
    };

    async updateStudent(req, res) {
        try {
            const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
            res.json(updatedStudent);
        } catch (error) {
            res.status(404).json({ error: 'Student not found.' });
        }
    };

    async deleteStudent(req, res) {
        try {
            const deletedStudent = await studentService.deleteStudent(req.params.id);
            res.json(deletedStudent);
        } catch (error) {
            res.status(404).json({ error: 'Student not found.' });
        }
    };

    async searchStudent(req, res) {
        try {
            const { name, email } = req.query;
            const foundStudent = await studentService.searchStudent(name, email);
            res.json(foundStudent);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search students.' });
        }
    };

    async addReview(req, res) {
        try {
            const review = await studentService.addReview(req.body);
            res.status(201).json(review);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add review.' });
        }
    };

    async getAllPopularCourses(req, res) {
        try {
            const course = await studentService.getAllPopularCourses();
            res.json(course);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of popular course.' });
        }
    };

    async getAllEnrolledStudents(req, res) {
        try {
            const instructorId = req.params.instructorId;
            const students = await studentService.getAllEnrolledStudents(instructorId);
            res.json(students);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of students.' });
        }
    };
}

module.exports = StudentController;