const mongoose = require('mongoose');
const GradeServiceImpl = require('../../modules/grade/service/impl/grade.serviceImpl');
const Grade = require('../../modules/grade/dao/models/grade.model');

jest.mock('../../modules/grade/dao/models/grade.model');

let gradeServiceBoundaryTest = `GradeService functional test`;

describe('Grade Service', () => {
  let gradeService;

  beforeEach(() => {
    gradeService = new GradeServiceImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('bussiness', () => {
    it(`${gradeServiceBoundaryTest} should get grades for the specified student`, async () => {
      const studentId = 'student_id';
      const grade = {
        studentId: studentId,
        courseId: 'course_id',
        grade: 90,
        gradedBy: 'instuctor_id',
        gradeDate: new Date(),
        comments: 'Good job!',
      };
      Grade.find.mockResolvedValue(grade);
      const result = await gradeService.getAllGradesForAStudent(studentId);
      expect(result).toEqual(grade);
    });

    it(`${gradeServiceBoundaryTest} should get grades for the specified student and course`, async () => {
      const studentId = 'student_id';
      const courseId = 'course_id';
      const grade = {
        studentId: studentId,
        courseId: courseId,
        grade: 90,
        gradedBy: 'instuctor_id',
        gradeDate: new Date(),
        comments: 'Good job!',
      };
      Grade.find.mockResolvedValue(grade);
      const result = await gradeService.getGradesForStudentInCourse(studentId, courseId);
      expect(result).toEqual(grade);
    });

    it(`${gradeServiceBoundaryTest} should get grades for the specified course`, async () => {
      const studentId = 'student_id';
      const courseId = 'course_id';
      const grade = {
        studentId: studentId,
        courseId: courseId,
        grade: 90,
        gradedBy: 'instuctor_id',
        gradeDate: new Date(),
        comments: 'Good job!',
      };
      Grade.find.mockResolvedValue(grade);
      const result = await gradeService.getGradesForStudentsInCourse(courseId);
      expect(result).toEqual(grade);
    });

    it(`${gradeServiceBoundaryTest} should update grade by studentId and courseId`, async () => {
      const studentId = 'student_id';
      const courseId = 'course_id';
      const updatedGradeData = [
        {
          grade: 90,
          gradedBy: 'instuctor_id',
          gradeDate: new Date(),
          comments: 'Good job!',
        }];
      const updatedGrade = {
        studentId: studentId,
        courseId: courseId,
        ...updatedGradeData,
      };
      Grade.findOneAndUpdate.mockResolvedValue(updatedGrade);
      const result = await gradeService.updateGradesForStudentInCourse(studentId, courseId, updatedGradeData);
      expect(result).toEqual(updatedGrade);
    });

    it(`${gradeServiceBoundaryTest} should get avg grades for all courses`, async () => {
      const instructorId = 'instuctor_id';
      const averageGrade = 90;
      const grade = {
        studentId: "studentId",
        courseId: 'course_id',
        grade: 90,
        gradedBy: 'instuctor_id',
        gradeDate: new Date(),
        comments: 'Good job!',
      };
      const avgGrade = { instructorId, averageGrade }
      Grade.find.mockResolvedValue(avgGrade);
      const result = await gradeService.getAllGradesForAStudent(instructorId);
      expect(result).toEqual(avgGrade);
    });

    it(`${gradeServiceBoundaryTest} should get avg grades for all courses`, async () => {
      const instructorId = 'instuctor_id';
      const grade = [{
        studentId: "studentId",
        courseId: 'course_id',
        grade: 90,
        gradedBy: 'instuctor_id',
        gradeDate: new Date(),
        comments: 'Good job!',
      }];
      Grade.find.mockResolvedValue(grade);
      const result = await gradeService.getAllGrades(instructorId);
      expect(result).toEqual(grade);
    });

    it(`${gradeServiceBoundaryTest} should throw an error when grade is not found for the specified student`, async () => {
      const studentId = 'non_existing_id';
      Grade.find.mockResolvedValue(null);
      await expect(gradeService.getAllGradesForAStudent(studentId)).rejects.toThrow('Failed to get grade for the specified student.');
    });

    it(`${gradeServiceBoundaryTest} should throw an error when grade is not found for the specified student and couse`, async () => {
      const studentId = 'non_existing_id';
      const courseId = 'non_existing_id';
      Grade.find.mockResolvedValue(null);
      await expect(gradeService.getGradesForStudentInCourse(studentId, courseId)).rejects.toThrow('Failed to get grade the specified student for specific course.');
    });

    it(`${gradeServiceBoundaryTest} should throw an error when grade is not found for the specified course`, async () => {
      const courseId = 'non_existing_id';
      Grade.find.mockResolvedValue(null);
      await expect(gradeService.getGradesForStudentsInCourse(courseId)).rejects.toThrow('Failed to get grade.');
    });

    it(`${gradeServiceBoundaryTest} should throw an error when student is not found for grade update`, async () => {
      const studentId = 'non_existing_id';
      const courseId = 'non_existing_id';
      const updatedGradeData = {
        grade: 90,
        gradedBy: 'instuctor_id',
        gradeDate: new Date(),
        comments: 'Good job!',
      };
      Grade.findOneAndUpdate.mockResolvedValue(null);
      await expect(gradeService.updateGradesForStudentInCourse(studentId, courseId, updatedGradeData)).rejects.toThrow('Failed to update student grade.');
    });
  });
});
