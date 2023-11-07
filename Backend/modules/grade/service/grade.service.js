class GradeService {
    async getAllGrades(instructorId) { }
    async getAllGradesForAStudent(studentId) { }
    async getGradesForStudentInCourse(studentId, courseId) { }
    async getGradesForStudentsInCourse(courseId) { }
    async assignGradesForStudentInCourse(studentId, courseId, body) { }
    async updateGradesForStudentInCourse(body) { }
    async getAllCourseAvg(instructorId) { }
}

module.exports = GradeService;