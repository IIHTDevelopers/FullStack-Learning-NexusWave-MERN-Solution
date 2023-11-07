const jwt = require('jsonwebtoken');
const Student = require('../../dao/models/student.model');
const Course = require('../../../course/dao/models/course.model');
const StudentService = require('../student.service');

class StudentServiceImpl extends StudentService {
    async loginStudent(email, password) {
        try {
            const student = await Student.findOne({ email });
            if (!student) {
                throw new Error('Student not found.');
            }
            const isMatch = await student.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid password.');
            }
            student.userType = 'Student';
            const token = jwt.sign({ user: { id: student._id, userType: 'Student' } }, 'your-secret-key', { expiresIn: '1h' });
            // student.token = token;
            const id = student._id;
            await student.save();
            return { message: 'Login successful.', token, id };
        } catch (error) {
            console.log(error);
            throw new Error('Login failed.');
        }
    }

    async getAllStudents(instructorId) {
        try {
            const courses = await Course.find({ instructorId }).exec();
            const courseIds = courses.map(course => course._id);
            const students = await Student.find({
                'enrolledCourses.courseId': { $in: courseIds }
            }).exec();
            return students;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get list of students.');
        }
    }

    async createStudent(studentData) {
        try {
            const student = await Student.create(studentData);
            return student;
        } catch (error) {
            throw new Error('Failed to create student.');
        }
    }

    async getStudent(studentId) {
        try {
            const student = await Student.findById(studentId);
            if (!student) {
                throw new Error('Student not found.');
            }
            return student;
        } catch (error) {
            throw new Error('Failed to get student.');
        }
    }

    async updateStudent(studentId, updatedStudent) {
        try {
            const student = await Student.findByIdAndUpdate(studentId, updatedStudent, { new: true });
            if (!student) {
                throw new Error('Student not found.');
            }
            return student;
        } catch (error) {
            throw new Error('Failed to update student.');
        }
    }

    async deleteStudent(studentId) {
        try {
            const student = await Student.findByIdAndDelete(studentId);
            if (!student) {
                throw new Error('Student not found.');
            }
            return student;
        } catch (error) {
            throw new Error('Failed to delete student.');
        }
    }

    async searchStudent(name, email) {
        try {
            const query = {};

            if (name) {
                query.name = { $regex: name, $options: 'i' };
            }

            if (email) {
                query.email = { $regex: email, $options: 'i' };
            }

            const student = await Student.find(query);
            return student;
        } catch (error) {
            throw new Error('Failed to search for student by name and email.');
        }
    }

    async addReview(reviewData) {
        try {
            const { studentId, comment, rating, courseId } = reviewData;
            // Check if the course exists
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            // Create a new review object
            const newReview = {
                studentId,
                comment,
                rating,
            };
            // Add the review to the course's reviews array
            course.reviews.push(newReview);
            course.ratings.push(rating);
            // Save the updated course with the new review
            await Course.findByIdAndUpdate(courseId, course);
            return course;
        } catch (error) {
            throw new Error('Failed to add raview.');
        }
    }

    async getAllPopularCourses() {
        try {
            const popularCourses = await Course.aggregate([
                {
                    $match: {
                        ratings: { $exists: true, $ne: [] }, // Filter out courses without ratings
                    },
                },
                {
                    $project: {
                        title: 1,
                        description: 1,
                        category: 1,
                        averageRating: { $avg: '$ratings' }, // Calculate the average rating
                    },
                },
                {
                    $sort: { averageRating: -1 }, // Sort by average rating in descending order
                },
            ]);
            return popularCourses;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get list of popular course.');
        }
    }
}

module.exports = StudentServiceImpl;