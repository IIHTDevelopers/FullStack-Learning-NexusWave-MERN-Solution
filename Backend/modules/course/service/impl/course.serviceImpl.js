const Course = require('../../dao/models/course.model');
const CourseService = require('../course.service');

class CourseServiceImpl extends CourseService {
    async getAllCourses() {
        try {
            const course = await Course.find();
            return course;

        } catch (error) {
            throw new Error('Failed to get list of course.');
        }
    }

    async getCoursesByCategory(category) {
        try {
            const course = await Course.find({ category: { $regex: category, $options: 'i' } });
            if (!course && course.length == 0) {
                throw new Error('Failed to retrieve course by category.');
            }
            return course;
        } catch (error) {
            throw new Error('Failed to retrieve course by category.');
        }
    }

    async getCoursesByRating(minRating) {
        try {
            const course = await Course.find({ ratings: { $gte: minRating } });
            if (!course && course.length == 0) {
                throw new Error('Failed to get list of course by rating.');
            }
            return course;
        } catch (error) {
            throw new Error('Failed to get list of course by rating.');
        }
    }

    async createCourse(courseData) {
        try {
            const course = await Course.create(courseData);
            return course;
        } catch (error) {
            throw new Error('Failed to create course.');
        }
    }

    async getCourse(courseId) {
        try {
            const course = await Course.findById(courseId);
            if (!course) {
                throw new Error('Course not found.');
            }
            return course;
        } catch (error) {
            throw new Error('Failed to get course.');
        }
    }

    async getContent(courseId) {
        try {
            const course = await Course.findById(courseId);
            if (!course) {
                throw new Error('Course not found.');
            }
            return course.content;
        } catch (error) {
            throw new Error('Failed to get course.');
        }
    }

    async updateCourse(courseId, updatedCourse) {
        try {
            const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });
            if (!course) {
                throw new Error('Course not found.');
            }
            return course;
        } catch (error) {
            throw new Error('Failed to update course.');
        }
    }

    async deleteCourse(courseId) {
        try {
            const course = await Course.findByIdAndDelete(courseId);
            if (!course) {
                throw new Error('Course not found.');
            }
            return course;
        } catch (error) {
            throw new Error('Failed to delete course.');
        }
    }

    async searchCourse(title, description) {
        try {
            const query = {};

            if (title) {
                query.title = { $regex: title, $options: 'i' };
            }

            if (description) {
                query.description = { $regex: description, $options: 'i' };
            }

            const courses = await Course.find(query);
            if (!courses && courses.length == 0) {
                throw new Error('Failed to search for course by title and description.');
            }
            return courses;
        } catch (error) {
            throw new Error('Failed to search for course by title and description.');
        }
    }
}

module.exports = CourseServiceImpl;