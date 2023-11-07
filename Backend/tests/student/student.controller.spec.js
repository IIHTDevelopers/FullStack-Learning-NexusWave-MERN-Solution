const request = require('supertest');
const express = require('express');
const router = require('../../modules/student/routes/student.routes');

const Student = require('../../modules/student/dao/models/student.model');
const StudentController = require('../../modules/student/controller/student.controller');
const StudentService = require('../../modules/student/service/student.service');
const StudentServiceImpl = require('../../modules/student/service/impl/student.serviceImpl');

const authMiddleware = require('../../modules/middleware/authUserMiddleware');

const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use(router);

jest.mock('../../modules/student/service/impl/student.serviceImpl');

let studentControllerBoundaryTest = `StudentController boundary test`;

// jest.mock('../../modules/student/dao/models/student.model', () => {
//   return {
//     create: jest.fn().mockResolvedValue({ _id: 'studentId' }),
//   };
// });

// StudentService.createStudent = jest.fn().mockResolvedValue({ _id: 'studentId' });

describe('Student Controller', () => {
  describe('boundary', () => {
    it(`${studentControllerBoundaryTest} should return 401 Unauthorized when trying to access post /student protected routes without a token`, async () => {
      const response = await request(app).post('/student');
      expect(response.status).toBe(401);
    });

    it(`${studentControllerBoundaryTest} should return 401 Unauthorized when trying to access put /:id protected routes without a token`, async () => {
      const response = await request(app).put('/1234');
      expect(response.status).toBe(401);
    });

    it(`${studentControllerBoundaryTest} should return 401 Unauthorized when trying to access delete /:id protected routes without a token`, async () => {
      const response = await request(app).delete('/1234');
      expect(response.status).toBe(401);
    });

    it(`${studentControllerBoundaryTest} should retrieve all enrolled students`, async () => {
      let instructorId = "mockIntructorId";
      const mockStudentResult = [{
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'testpassword',
        dateOfBirth: new Date('1995-07-15'),
        gender: 'Male',
        enrolledCourses: [{
          courseId: "courseId",
          courseTitle: 'English',
          courseDescription: 'Will complete introduction of english grammer'
        }],
      }];

      const mReq = {
        params: { instructorId: instructorId },
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.getAllStudents.mockResolvedValueOnce(mockStudentResult);

      await new StudentController().getAllStudents(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.getAllStudents).toHaveBeenCalledWith(instructorId);
      expect(mRes.json).toHaveBeenCalledWith(mockStudentResult);
      expect(mNext).not.toHaveBeenCalled();
    });

    // it(`${studentControllerBoundaryTest} should create a new student`, async () => {
    //     const mReq = {
    //       name: 'John Doe',
    //       email: 'johndoe@example.com',
    //       password: 'testpassword',
    //       dateOfBirth: new Date('1995-07-15'),
    //       gender: 'Male',
    //       enrolledCourses: [{
    //         courseId : "course_id",
    //         courseTitle: 'English', 
    //         courseDescription: 'Will complete introduction of english grammer'
    //       }],
    //     };
    //     const mRes = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //     };
    //     const mNext = jest.fn();

    //     const mockStudent = {
    //         _id: 'mockStudentId',
    //         ...mReq.body,
    //     };

    //     StudentServiceImpl.prototype.createStudent.mockResolvedValueOnce(mockStudent);

    //     await new StudentController().createStudent(mReq, mRes, mNext);

    //     expect(StudentServiceImpl.prototype.createStudent).toHaveBeenCalledWith(mReq.body);
    //     expect(mRes.status).toHaveBeenCalledWith(201);
    //     expect(mRes.json).toHaveBeenCalledWith(mockStudent);
    //     expect(mNext).not.toHaveBeenCalled();
    // });

    // it(`${studentControllerBoundaryTest} should create a new student`, async () => {
    //   // Mock the Student model's create method to return a student object
    //   const studentData = {
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     password: 'password123',
    //   };
    //   const createdStudent = { _id: 'studentId', ...studentData };
    //   Student.create = jest.fn().mockResolvedValue(createdStudent);

    //   // Call the createStudent function
    //   const result = await StudentService.createStudent(studentData);

    //   // Expectations
    //   expect(Student.create).toHaveBeenCalledWith(studentData);
    //   expect(result).toEqual(createdStudent);
    // });

    it(`${studentControllerBoundaryTest} should retrieve a student by ID`, async () => {
      const studentId = 'mockStudentId';
      const mockStudent = {
        _id: 'mockStudentId',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'testpassword',
        dateOfBirth: new Date('1995-07-15'),
        gender: 'Male',
        enrolledCourses: [{
          courseId: "course_id",
          courseTitle: 'English',
          courseDescription: 'Will complete introduction of english grammer'
        }],
      };

      const mReq = {
        params: { id: studentId },
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.getStudent.mockResolvedValueOnce(mockStudent);

      await new StudentController().getStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.getStudent).toHaveBeenCalledWith(studentId);
      expect(mRes.json).toHaveBeenCalledWith(mockStudent);
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${studentControllerBoundaryTest} should update a student by ID`, async () => {
      const studentId = 'mockStudentId';
      const updatedStudentData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'testpassword',
        dateOfBirth: new Date('1995-07-15'),
        gender: 'Male',
        enrolledCourses: [{
          courseId: "course_id",
          courseTitle: 'English',
          courseDescription: 'Will complete introduction of english grammer'
        }],
      };
      const updatedStudent = {
        _id: studentId,
        ...updatedStudentData,
      };

      const mReq = {
        params: { id: studentId },
        body: updatedStudentData,
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.updateStudent.mockResolvedValueOnce(updatedStudent);

      await new StudentController().updateStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.updateStudent).toHaveBeenCalledWith(studentId, updatedStudentData);
      expect(mRes.json).toHaveBeenCalledWith(updatedStudent);
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${studentControllerBoundaryTest} should delete a student by ID`, async () => {
      const studentId = 'mockStudentId';
      const deletedStudent = {
        _id: studentId,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'testpassword',
        dateOfBirth: new Date('1995-07-15'),
        gender: 'Male',
        enrolledCourses: [{
          courseId: "course_id",
          courseTitle: 'English',
          courseDescription: 'Will complete introduction of english grammer'
        }],
      };

      const mReq = {
        params: { id: studentId },
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.deleteStudent.mockResolvedValueOnce(deletedStudent);

      await new StudentController().deleteStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.deleteStudent).toHaveBeenCalledWith(studentId);
      expect(mRes.json).toHaveBeenCalledWith(deletedStudent);
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${studentControllerBoundaryTest} should search for students by name and email`, async () => {
      // Define query parameters for the search.
      const queryParameters = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      // Mock the behavior of the StudentServiceImpl to return search results.
      const mockSearchResult = [
        {
          _id: 'student1',
          name: 'John Doe',
          email: 'johndoe@example.com',
          // Other student properties...
        },
        {
          _id: 'student2',
          name: 'John Doe',
          email: 'johndoe@example.com',
          // Other student properties...
        },
      ];

      const mReq = {
        query: queryParameters, // Simulate query parameters in the request.
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.searchStudent.mockResolvedValueOnce(mockSearchResult);

      await new StudentController().searchStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.searchStudent).toHaveBeenCalledWith(queryParameters.name, queryParameters.email);
      expect(mRes.json).toHaveBeenCalledWith(mockSearchResult);
      expect(mNext).not.toHaveBeenCalled();
    });
    it(`${studentControllerBoundaryTest} should add a new review`, async () => {


      const mReq = {
        courseId: 'course_id',
        comment: 'Explanation is great!',
        rating: 4,
        studentId: 'student_id',
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCourseData = {
        title: 'Sample Course',
        description: 'Sample Description',
        category: 'Sample Category',
        ratings: [4, 5],
        reviews: [
          {
            studentId: 'student_id_1',
            comment: 'Great course!',
            rating: 5,
          }, {
            studentId: 'student_id',
            comment: 'Explanation is great!',
            rating: 4,
          }
        ],
        content: [
          {
            moduleTitle: 'Module 1',
            topics: ['Topic 1', 'Topic 2'],
            readings: ['Reading 1', 'Reading 2'],
            assignments: ['Assignment 1', 'Assignment 2'],
          },
        ],
      }

      const mNext = jest.fn();

      const mockCourse = {
        _id: 'course_id',
        ...mockCourseData,
      };

      StudentServiceImpl.prototype.addReview.mockResolvedValueOnce(mockCourse);

      await new StudentController().addReview(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.addReview).toHaveBeenCalledWith(mReq.body);
      expect(mRes.status).toHaveBeenCalledWith(201);
      expect(mRes.json).toHaveBeenCalledWith(mockCourse);
      expect(mNext).not.toHaveBeenCalled();
    });
    it(`${studentControllerBoundaryTest} should retrieve all popular courses`, async () => {

      const mockStudentResult = [{
        title: 'Sample Course',
        description: 'Sample Description',
        category: 'Sample Category',
        ratings: [4, 5],
        reviews: [
          {
            studentId: 'student_id_1',
            comment: 'Great course!',
            rating: 5,
          }, {
            studentId: 'student_id',
            comment: 'Explanation is great!',
            rating: 4,
          }
        ],
        content: [
          {
            moduleTitle: 'Module 1',
            topics: ['Topic 1', 'Topic 2'],
            readings: ['Reading 1', 'Reading 2'],
            assignments: ['Assignment 1', 'Assignment 2'],
          },
        ],
      }];

      const mReq = {
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.getAllPopularCourses.mockResolvedValueOnce(mockStudentResult);

      await new StudentController().getAllPopularCourses(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.getAllPopularCourses).toHaveBeenCalledWith();
      expect(mRes.json).toHaveBeenCalledWith(mockStudentResult);
      expect(mNext).not.toHaveBeenCalled();
    });




    it(`${studentControllerBoundaryTest} should return a 404 error when getting a student with invalid ID`, async () => {
      const studentId = 'invalidStudentId';

      const mReq = {
        params: { id: studentId },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.getStudent.mockRejectedValueOnce(new Error('Student not found.'));

      await new StudentController().getStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.getStudent).toHaveBeenCalledWith(studentId);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Student not found.' });
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${studentControllerBoundaryTest} should return a 404 error when updating a student with invalid ID`, async () => {
      const studentId = 'invalidStudentId';
      const updatedStudentData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'testpassword',
        dateOfBirth: new Date('1995-07-15'),
        gender: 'Male',
        enrolledCourses: [{
          courseId: "course_id",
          courseTitle: 'English',
          courseDescription: 'Will complete introduction of english grammer'
        }],
      };

      const mReq = {
        params: { id: studentId },
        body: updatedStudentData,
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.updateStudent.mockRejectedValueOnce(new Error('Student not found.'));

      await new StudentController().updateStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.updateStudent).toHaveBeenCalledWith(studentId, updatedStudentData);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Student not found.' });
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${studentControllerBoundaryTest} should return a 404 error when deleting a student with invalid ID`, async () => {
      const studentId = 'invalidStudentId';

      const mReq = {
        params: { id: studentId },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.deleteStudent.mockRejectedValueOnce(new Error('Student not found.'));

      await new StudentController().deleteStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.deleteStudent).toHaveBeenCalledWith(studentId);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Student not found.' });
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${studentControllerBoundaryTest} should return a 500 error when creating a student fails`, async () => {
      const mReq = {
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'testpassword',
          dateOfBirth: new Date('1995-07-15'),
          gender: 'Male',
          enrolledCourses: [{
            courseId: "course_id",
            courseTitle: 'English',
            courseDescription: 'Will complete introduction of english grammer'
          }],
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      const error = new Error('Failed to create student.');
      StudentServiceImpl.prototype.createStudent.mockRejectedValueOnce(error);

      await new StudentController().createStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.createStudent).toHaveBeenCalledWith(mReq.body);
      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create student.' });
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${studentControllerBoundaryTest} should return a 404 error when no data with students by name and email`, async () => {
      // Define query parameters for the search.
      const queryParameters = {
        name: 'Non Existing',
        email: 'nonexisting@example.com',
      };

      // Mock the behavior of the StudentServiceImpl to return search results.
      const mockSearchResult = [
      ];

      const mReq = {
        query: queryParameters, // Simulate query parameters in the request.
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      StudentServiceImpl.prototype.searchStudent.mockResolvedValueOnce(mockSearchResult);

      await new StudentController().searchStudent(mReq, mRes, mNext);

      expect(StudentServiceImpl.prototype.searchStudent).toHaveBeenCalledWith(queryParameters.name, queryParameters.email);
      expect(mRes.json).toHaveBeenCalledWith(mockSearchResult);
      expect(mNext).not.toHaveBeenCalled();
    });









  });
});
