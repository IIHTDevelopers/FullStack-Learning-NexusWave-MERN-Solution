const jwt = require('jsonwebtoken');
const Instructor = require('../../dao/models/instructor.model');
const Course = require('../../../course/dao/models/course.model');
const InstructorService = require('../instructor.service');
const Grade = require('../../../course/dao/models/course.model');
const Student = require('../../../student/dao/models/student.model');

class InstructorServiceImpl extends InstructorService {
    async loginInstructor(email, password) {
        try {
            const instructor = await Instructor.findOne({ email });
            if (!instructor) {
                throw new Error('Instructor not found.');
            }
            const isMatch = await instructor.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid password.');
            }
            instructor.userType = 'Instructor';
            const token = jwt.sign({ user: { id: instructor._id, userType: 'Instructor' } }, 'your-secret-key', { expiresIn: '1h' });
            // instructor.token = token;
            const id = instructor._id;
            await instructor.save();
            return { message: 'Login successful.', token, id };
        } catch (error) {
            throw new Error('Login failed.');
        }
    }

    async getAllInstructors() {
        try {
            const instructor = await Instructor.find();
            return instructor;
        } catch (error) {
            throw new Error('Failed to get list of instructors.');
        }
    }

    async createInstructor(instructorData) {
        try {
            const instructor = await Instructor.create(instructorData);
            return instructor;
        } catch (error) {
            throw new Error('Failed to create instructor.');
        }
    }

    async getInstructor(instructorId) {
        try {
            const instructor = await Instructor.findById(instructorId);
            if (!instructor) {
                throw new Error('Instructor not found.');
            }
            return instructor;
        } catch (error) {
            throw new Error('Failed to get instructor.');
        }
    }

    async updateInstructor(instructorId, updatedInstructor) {
        try {
            const instructor = await Instructor.findByIdAndUpdate(instructorId, updatedInstructor, { new: true });
            if (!instructor) {
                throw new Error('Instructor not found.');
            }
            return instructor;
        } catch (error) {
            throw new Error('Failed to update instructor.');
        }
    }

    async deleteInstructor(instructorId) {
        try {
            const instructor = await Instructor.findByIdAndDelete(instructorId);
            if (!instructor) {
                throw new Error('Instructor not found.');
            }
            return instructor;
        } catch (error) {
            throw new Error('Failed to delete instructor.');
        }
    }

    async getAllCourses(instructorId) {
        try {
            const courses = await Course.find({ instructorId });
            console.log(courses);
            if (!courses && courses.length == 0) {
                throw new Error('Failed to get list of Course by instructorId.');
            }
            return courses;
        } catch (error) {
            throw new Error('Failed to get list of Course by instructorId.');
        }
    }

    async getCourse(courseId, instructorId) {
        try {
            const course = await Course.findOne({ instructorId, _id: courseId });
            if (!course) {
                throw new Error('Course not found.');
            }
            return course;
        } catch (error) {
            throw new Error('Failed to get course.');
        }
    }

    async updateCourse(courseId, instructorId, courseDetails) {
        try {
            const course = await Course.findOne({ instructorId, _id: courseId });
            if (!course) {
                throw new Error('Course not found.');
            }
            course.title = courseDetails.title;
            course.description = courseDetails.description;
            await course.save();
            return course;
        } catch (error) {
            throw new Error('Failed to get course.');
        }
    }

    async deleteCourse(courseId, instructorId) {
        try {
            const course = await Course.findOne({ instructorId, _id: courseId });
            if (!course) {
                throw new Error('Course not found.');
            }
            await course.remove();
            return 'Course deleted successfully';
        } catch (error) {
            throw new Error('Failed to delete course.');
        }
    }

    async getCourseInsights(instructorId) {
        try {
            const instructor = await Instructor.findById(instructorId);
            if (!instructor) {
                throw new Error('Instructor not found.');
            }
            const courses = await Course.find({ instructorId: instructor._id });
            const courseInsights = [];
            for (const course of courses) {
                const courseId = course._id;
                const enrolledStudents = await Student.find({ enrolledCourses: { $elemMatch: { courseId } } });
                const numStudentsEnrolled = enrolledStudents.length;
                const ratings = course.ratings;
                const averageRating = ratings.length > 0 ? ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length : 0;
                courseInsights.push({
                    courseTitle: course.title,
                    numStudentsEnrolled,
                    averageRating,
                });
            }
            return courseInsights;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get course insights.');
        }
    }

    async getAverageGrade(instructorId) {
        try {
            const instructor = await Instructor.findById(instructorId);
            if (!instructor) {
                throw new Error('Instructor not found.');
            }
            const courses = await Course.find({ instructorId: instructor._id });
            const courseInsights = [];
            for (const course of courses) {
                const courseId = course._id;
                const grades = await Grade.find({ courseId });
                const totalGrades = grades.reduce((acc, grade) => acc + grade.grade, 0);
                const averageGrade = grades.length > 0 ? totalGrades / grades.length : 0;
                courseInsights.push({
                    courseTitle: course.title,
                    averageGrade,
                });
            }
            return courseInsights;
        } catch (error) {
            throw new Error('Failed to get course insights.');
        }
    }
}

module.exports = InstructorServiceImpl;