const Grade = require("../../../grade/dao/models/grade.model");
const GradeService = require("../grade.service");

class GradeServiceImpl extends GradeService {
  async getAllGrades(instructorId) {
    try {
      const grade = await Grade.find({ gradedBy: instructorId });
      return grade;
    } catch (error) {
      throw new Error("Failed to get list of grades.");
    }
  }

  async getAllGradesForAStudent(studentId) {
    try {
      // console.log(studentId);
      const grades = await Grade.find({ studentId }); // Query by studentId 
      if (!grades) {
        throw new Error('Failed to get grade for the specified student.');
      }
      return grades;
    } catch (error) {
      // console.log(error);
      throw new Error("Failed to get grade for the specified student.");
    }
  }

  async getGradesForStudentInCourse(studentId, courseId) {
    try {
      const grades = await Grade.find({ studentId, courseId });
      if (!grades) {
        throw new Error('Failed to get grade for the specified student.');
      }
      return grades;
    } catch (error) {
      throw new Error(
        "Failed to get grade the specified student for specific course."
      );
    }
  }

  async getGradesForStudentsInCourse(courseId) {
    try {
      const grades = await Grade.find({ courseId }); // Query by courseId
      if (!grades) {
        throw new Error('Failed to get grade for the specified student.');
      }
      return grades;
    } catch (error) {
      // console.log(error);
      throw new Error("Failed to get grade.");
    }
  }

  async assignGradesForStudentInCourse(studentId, courseId, body) {
    try {
      const { grade, gradedBy, gradeDate, comments } = body;
      const savedGrade = await Grade.create({
        studentId,
        courseId,
        grade,
        gradedBy,
        gradeDate,
        comments,
      });
      return savedGrade;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create a new grade.');
    }
  }

  async updateGradesForStudentInCourse(param, body) {
    const { studentId, courseId } = param;
    const { grade, gradeDate, comments, gradedBy } = body;
    try {
      const updatedGrade = await Grade.findOneAndUpdate(
        { studentId, courseId },
        { grade, gradeDate, comments, gradedBy },
        { new: true }
      );
      if (!updatedGrade) {
        throw new Error(error, "Grade not found.");
      }
      return updatedGrade;
    } catch (error) {
      throw new Error("Failed to update student grade.");
    }
  }

  async getAllCourseAvg(instructorId) {
    try {
      const grades = await Grade.find({ gradedBy: instructorId });
      const totalGrades = grades.reduce((acc, grade) => acc + grade.grade, 0);
      const averageGrade = totalGrades / grades.length;
      return averageGrade;
    } catch (error) {
      throw new Error("Failed to get avg grades for all course");
    }
  }
}

module.exports = GradeServiceImpl;