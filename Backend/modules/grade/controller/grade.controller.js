const GradeServiceImpl = require('../service/impl/grade.serviceImpl');

const gradeService = new GradeServiceImpl();

class GradeController {
  async getAllGrades(req, res) {
    try {
      const grades = await gradeService.getAllGrades(req.params.instructorId);
      res.json(grades);
    } catch (error) {
      res.status(404).json({ error: 'An error occurred while fetching grades.' });
    }
  };

  async getAllGradesForAStudent(req, res) {
    const { studentId } = req.params;
    try {
      const grades = await gradeService.getAllGradesForAStudent(studentId);
      res.json(grades);
    } catch (error) {
      res.status(404).json({ error: 'Grade not found.' });
    }
  };

  async getGradesForStudentInCourse(req, res) {
    const { studentId, courseId } = req.params;
    try {
      const grades = await gradeService.getGradesForStudentInCourse(studentId, courseId);
      res.json(grades);
    } catch (error) {
      res.status(404).json({ error: 'Grade not found.' });
    }
  };

  async getGradesForStudentsInCourse(req, res) {
    const { courseId } = req.params;
    try {
      const grades = await gradeService.getGradesForStudentsInCourse(courseId);
      res.json(grades);
    } catch (error) {
      res.status(404).json({ error: 'Grade not found.' });
    }
  };

  async assignGradesForStudentInCourse(req, res) {
    try {
      const createdGrade = await gradeService.assignGradesForStudentInCourse(req.params.studentId, req.params.courseId, req.body);
      res.json(createdGrade);
    } catch (error) {
      res.status(500).json({ error: 'Grade not created.' });
    }
  };

  async updateGradesForStudentInCourse(req, res) {
    try {
      const updatedGrade = await gradeService.updateGradesForStudentInCourse(req.params, req.body);
      res.json(updatedGrade);
    } catch (error) {
      res.status(500).json({ error: 'Grade not found.' });
    }
  };

  async getAllCourseAvg(req, res) {
    try {
      const grades = await gradeService.getAllCourseAvg(req.params.instructorId);
      res.json(grades);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Failed to get avg grades for all course." });
    }
  };
}

module.exports = GradeController;