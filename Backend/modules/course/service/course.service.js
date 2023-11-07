class CourseService {
    async getAllCourses() { }
    async getCoursesByCategory(category) { }
    async getCoursesByRating(minRating) { }
    async createCourse(courseData) { }
    async getCourse(courseId) { }
    async updateCourse(courseId, updatedCourse) { }
    async deleteCourse(courseId) { }
    async searchCourse(courseId) { }
    async getContent(title, description) { }
}

module.exports = CourseService;