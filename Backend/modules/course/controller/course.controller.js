const CourseServiceImpl = require('../service/impl/course.serviceImpl');

const courseService = new CourseServiceImpl();

class CourseController {
    async getAllCourses(req, res) {
        try {
            const courses = await courseService.getAllCourses();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of Course.' });
        }
    };

    async getCoursesByCategory(req, res) {
        try {
            const { category } = req.params;
            const courses = await courseService.getCoursesByCategory(category);
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of Course.' });
        }
    };

    async getCoursesByRating(req, res) {
        try {
            const { minRating } = req.params;
            const courses = await courseService.getCoursesByRating(minRating);
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of Course.' });
        }
    };

    async createCourse(req, res) {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ error: 'Title and description are required.' });
            } else {
                const newCourse = await courseService.createCourse(req.body);
                res.status(201).json(newCourse);
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to create course.' });
        }
    };

    async getCourse(req, res) {
        try {
            const course = await courseService.getCourse(req.params.id);
            res.json(course);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };

    async getContent(req, res) {
        try {
            const content = await courseService.getContent(req.params.id);
            res.json(content);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };

    async updateCourse(req, res) {
        try {
            const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
            res.json(updatedCourse);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };

    async deleteCourse(req, res) {
        try {
            const deletedCourse = await courseService.deleteCourse(req.params.id);
            res.json(deletedCourse);
        } catch (error) {
            res.status(404).json({ error: 'Course not found.' });
        }
    };

    async searchCourse(req, res) {
        try {
            const { title, description = '' } = req.query;
            const foundCourse = await courseService.searchCourse(title, description);
            res.json(foundCourse);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search Course.' });
        }
    };
}

module.exports = CourseController;