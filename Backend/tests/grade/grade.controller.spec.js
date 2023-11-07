const request = require('supertest');
const express = require('express');
const router = require('../../modules/grade/routes/grade.routes');

const GradeController = require('../../modules/grade/controller/grade.controller');
const GradeServiceImpl = require('../../modules/grade/service/impl/grade.serviceImpl');

const authMiddleware = require('../../modules/middleware/authUserMiddleware');

const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use(router);

jest.mock('../../modules/grade/service/impl/grade.serviceImpl');

let gradeControllerBoundaryTest = `GradeController boundary test`;

describe('Grade Controller', () => {
    describe('boundary', () => {
        it(`${gradeControllerBoundaryTest} should return 401 Unauthorized when trying to access put /grades protected routes without a token`, async () => {
            const response = await request(app).post('/grades');
            expect(response.status).toBe(401);
        });

        
        
        it(`${gradeControllerBoundaryTest} should retrieve all grades`, async () => {
          let instructorId= "instuctor_id";
          const mockGrades = [
            {
              studentId: 'student_id',
              courseId: 'course_id',
              grade: 90,
              gradedBy: 'instuctor_id',
              gradeDate: new Date(),
              comments: 'Good job!',
            }];

          const mReq = {
            params: { instructorId : instructorId }, 
          };
          const mRes = {
              json: jest.fn(),
          };
          const mNext = jest.fn();

          GradeServiceImpl.prototype.getAllGrades.mockResolvedValueOnce(mockGrades);

          await new GradeController().getAllGrades(mReq, mRes, mNext);

          expect(GradeServiceImpl.prototype.getAllGrades).toHaveBeenCalledWith(instructorId);
          expect(mRes.json).toHaveBeenCalledWith(mockGrades);
          expect(mNext).not.toHaveBeenCalled();
        });
        it(`${gradeControllerBoundaryTest} should retrieve grades for the specified student`, async () => {
          const studentId = 'student_id';
          const mockGrades = [
            {
              studentId: studentId,
              courseId: 'course_id',
              grade: 90,
              gradedBy: 'instuctor_id',
              gradeDate: new Date(),
              comments: 'Good job!',
            }];

          const mReq = {
            params: { studentId : studentId },
          };
          const mRes = {
              json: jest.fn(),
          };
          const mNext = jest.fn();

          GradeServiceImpl.prototype.getGradesForAllStudents.mockResolvedValueOnce(mockGrades);

          await new GradeController().getGradesForAllStudents(mReq, mRes, mNext);

          expect(GradeServiceImpl.prototype.getGradesForAllStudents).toHaveBeenCalledWith(studentId);
          expect(mRes.json).toHaveBeenCalledWith(mockGrades);
          expect(mNext).not.toHaveBeenCalled();
        });
        it(`${gradeControllerBoundaryTest} should retrieve grades for the specified student and course`, async () => {
          const studentId = 'student_id';
          const courseId = 'course_id';
          const mockGrades = [
            {
              studentId: studentId,
              courseId: courseId,
              grade: 90,
              gradedBy: 'instuctor_id',
              gradeDate: new Date(),
              comments: 'Good job!',
            }];

          const mReq = {
            params: { studentId : studentId ,courseId:courseId},
          };
          const mRes = {
              json: jest.fn(),
          };
          const mNext = jest.fn();

          GradeServiceImpl.prototype.getGradesForStudentInCourse.mockResolvedValueOnce(mockGrades);

          await new GradeController().getGradesForStudentInCourse(mReq, mRes, mNext);

          expect(GradeServiceImpl.prototype.getGradesForStudentInCourse).toHaveBeenCalledWith(studentId,courseId);
          expect(mRes.json).toHaveBeenCalledWith(mockGrades);
          expect(mNext).not.toHaveBeenCalled();
        });
        it(`${gradeControllerBoundaryTest} should retrieve grades for the specified course`, async () => {
          const studentId = 'student_id';
          const courseId = 'course_id';
          const mockGrades = [
            {
              studentId: studentId,
              courseId: courseId,
              grade: 90,
              gradedBy: 'instuctor_id',
              gradeDate: new Date(),
              comments: 'Good job!',
            }];

          const mReq = {
            params: { courseId:courseId},
          };
          const mRes = {
              json: jest.fn(),
          };
          const mNext = jest.fn();

          GradeServiceImpl.prototype.getGradesForStudentsInCourse.mockResolvedValueOnce(mockGrades);

          await new GradeController().getGradesForStudentsInCourse(mReq, mRes, mNext);

          expect(GradeServiceImpl.prototype.getGradesForStudentsInCourse).toHaveBeenCalledWith(courseId);
          expect(mRes.json).toHaveBeenCalledWith(mockGrades);
          expect(mNext).not.toHaveBeenCalled();
        });


        it(`${gradeControllerBoundaryTest} should update a grade by ID`, async () => {
          const studentId = 'student_id';
          const courseId = 'course_id';
          const updatedGradeData = 
            {
              grade: 90,
              gradedBy: 'instuctor_id',
              gradeDate: new Date(),
              comments: 'Good job!',
            };

          const updatedGrade = {
              studentId: studentId,
              courseId: courseId,
              ...updatedGradeData,
          };

          const mReq = {
              params: { studentId: studentId ,courseId : courseId},
              body: updatedGradeData,
          };
          const mRes = {
              json: jest.fn(),
          };
          const mNext = jest.fn();

          GradeServiceImpl.prototype.updateGradesForStudentInCourse.mockResolvedValueOnce(updatedGrade);

          await new GradeController().updateGradesForStudentInCourse(mReq, mRes, mNext);

          expect(GradeServiceImpl.prototype.updateGradesForStudentInCourse).toHaveBeenCalledWith({ studentId, courseId },updatedGradeData);
          expect(mRes.json).toHaveBeenCalledWith(updatedGrade);
          expect(mNext).not.toHaveBeenCalled();
        });

        it(`${gradeControllerBoundaryTest} should retrieve average grades for all courses`, async () => {
          let instructorId= "instuctor_id";
          const mockGrades = [
            {
              studentId: 'student_id',
              courseId: 'course_id',
              grade: 90,
              gradedBy: 'instuctor_id',
              gradeDate: new Date(),
              comments: 'Good job!',
            }];

          const mReq = {
            params: { instructorId : instructorId }, 
          };
          const mRes = {
              json: jest.fn(),
          };
          const mNext = jest.fn();

          GradeServiceImpl.prototype.getAllCourseAvg.mockResolvedValueOnce(mockGrades);

          await new GradeController().getAllCourseAvg(mReq, mRes, mNext);

          expect(GradeServiceImpl.prototype.getAllCourseAvg).toHaveBeenCalledWith(instructorId);
          expect(mRes.json).toHaveBeenCalledWith(mockGrades);
          expect(mNext).not.toHaveBeenCalled();
        });





      it(`${gradeControllerBoundaryTest} should return a 404 error when getting grades for the specified student with invalid studentId`, async () => {
      const studentId = 'invalidStudentId';

      const mReq = {
          params: { studentId: studentId },
      };
      const mRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      };
      const mNext = jest.fn();

      GradeServiceImpl.prototype.getGradesForAllStudents.mockRejectedValueOnce(new Error('Grade not found.'));

      await new GradeController().getGradesForAllStudents(mReq, mRes, mNext);

      expect(GradeServiceImpl.prototype.getGradesForAllStudents).toHaveBeenCalledWith(studentId);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Grade not found.' });
      expect(mNext).not.toHaveBeenCalled();
      });

      it(`${gradeControllerBoundaryTest} should return a 404 error when getting grades for the specified student with invalid studentId and courseId`, async () => {
        const studentId = 'invalid_student_id';
          const courseId = 'invalid_course_id';
        const mReq = {
            params: { studentId: studentId,courseId:courseId },
        };
        const mRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mNext = jest.fn();

        GradeServiceImpl.prototype.getGradesForStudentInCourse.mockRejectedValueOnce(new Error('Grade not found.'));

        await new GradeController().getGradesForStudentInCourse(mReq, mRes, mNext);

        expect(GradeServiceImpl.prototype.getGradesForStudentInCourse).toHaveBeenCalledWith(studentId,courseId);
        expect(mRes.status).toHaveBeenCalledWith(404);
        expect(mRes.json).toHaveBeenCalledWith({ error: 'Grade not found.' });
        expect(mNext).not.toHaveBeenCalled();
      });

      it(`${gradeControllerBoundaryTest} should return a 404 error when getting grades for the specified student with invalid courseId`, async () => {
        const courseId = 'invalidStudentId';

        const mReq = {
            params: { courseId: courseId },
        };
        const mRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mNext = jest.fn();

        GradeServiceImpl.prototype.getGradesForStudentsInCourse.mockRejectedValueOnce(new Error('Grade not found.'));

        await new GradeController().getGradesForStudentsInCourse(mReq, mRes, mNext);

        expect(GradeServiceImpl.prototype.getGradesForStudentsInCourse).toHaveBeenCalledWith(courseId);
        expect(mRes.status).toHaveBeenCalledWith(404);
        expect(mRes.json).toHaveBeenCalledWith({ error: 'Grade not found.' });
        expect(mNext).not.toHaveBeenCalled();
      });

      it(`${gradeControllerBoundaryTest} should return a 404 error when updating a grade with invalid ID`, async () => {
        const courseId = 'invalidCourseId';
        const studentId = 'invalidstudent_id';
       
        const updatedGradeData = 
          {
            grade: 90,
            gradedBy: 'instuctor_id',
            gradeDate: new Date(),
            comments: 'Good job!',
          };
      

          const mReq = {
            params: { studentId: studentId ,courseId : courseId},
            body: updatedGradeData,
        };
        const mRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const mNext = jest.fn();

        GradeServiceImpl.prototype.updateGradesForStudentInCourse.mockRejectedValueOnce(new Error('Grade not found.'));

        await new GradeController().updateGradesForStudentInCourse(mReq, mRes, mNext);

        expect(GradeServiceImpl.prototype.updateGradesForStudentInCourse).toHaveBeenCalledWith({ studentId, courseId }, updatedGradeData);
        expect(mRes.status).toHaveBeenCalledWith(500);
        expect(mRes.json).toHaveBeenCalledWith({ error: 'Grade not found.' });
        expect(mNext).not.toHaveBeenCalled();
    });

    it(`${gradeControllerBoundaryTest} should return a 404 error when getting average grades for all courses`, async () => {
      const instructorId = 'invalidStudentId';

      const mReq = {
          params: { instructorId: instructorId },
      };
      const mRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      };
      const mNext = jest.fn();

      GradeServiceImpl.prototype.getAllCourseAvg.mockRejectedValueOnce(new Error('Failed to get avg grades for all course.'));

      await new GradeController().getAllCourseAvg(mReq, mRes, mNext);

      expect(GradeServiceImpl.prototype.getAllCourseAvg).toHaveBeenCalledWith(instructorId);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get avg grades for all course.' });
      expect(mNext).not.toHaveBeenCalled();
      });












        

       
       
        
        
        
    });
});
