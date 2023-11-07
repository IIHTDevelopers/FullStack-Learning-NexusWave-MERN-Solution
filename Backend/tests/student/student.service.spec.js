const mongoose = require('mongoose');
const StudentServiceImpl = require('../../modules/student/service/impl/student.serviceImpl');
const Student = require('../../modules/student/dao/models/student.model');
const Course = require('../../modules/course/dao/models/course.model');

jest.mock('../../modules/student/dao/models/student.model');
jest.mock('../../modules/course/dao/models/course.model');

let studentServiceBoundaryTest = `StudentService functional test`;

describe('Student Service', () => {
    let studentService;

    beforeEach(() => {
        studentService = new StudentServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('bussiness', () => {
        it(`${studentServiceBoundaryTest} should create a new student`, async () => {
            const studentData = {
              name: 'John Doe',
              email: 'johndoe@example.com',
              password: 'testpassword',
              dateOfBirth: new Date('1995-07-15'),
              gender: 'Male',
              enrolledCourses: [{
                courseId : "course_id",
                courseTitle: 'English', 
                courseDescription: 'Will complete introduction of english grammer'
              }],
            };
            Student.create.mockResolvedValue(studentData);

            const result = await studentService.createStudent(studentData);
            expect(result).toEqual(studentData);
        });

        it(`${studentServiceBoundaryTest} should get student by ID`, async () => {
            const studentId = 'student_id';
            const student = { _id: studentId, 
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'testpassword',
                dateOfBirth: new Date('1995-07-15'),
                gender: 'Male',
                enrolledCourses: [{
                  courseId : "course_id",
                  courseTitle: 'English', 
                  courseDescription: 'Will complete introduction of english grammer'
                }],
              };
            Student.findById.mockResolvedValue(student);

            const result = await studentService.getStudent(studentId);
            expect(result).toEqual(student);
        });

        it(`${studentServiceBoundaryTest} should update student by ID`, async () => {
            const studentId = 'student_id';
            const updatedStudentData ={
              name: 'John Doe',
              email: 'johndoe@example.com',
              password: 'testpassword',
              dateOfBirth: new Date('1995-07-15'),
              gender: 'Male',
              enrolledCourses: [{
                courseId : "course_id",
                courseTitle: 'English', 
                courseDescription: 'Will complete introduction of english grammer'
              }],
            };
            const updatedStudent = { _id: studentId, ...updatedStudentData };
            Student.findByIdAndUpdate.mockResolvedValue(updatedStudent);

            const result = await studentService.updateStudent(studentId, updatedStudentData);
            expect(result).toEqual(updatedStudent);
        });

        it(`${studentServiceBoundaryTest} should delete student by ID`, async () => {
            const studentId = 'student_id';
            const deletedStudent = {
              _id : studentId,
              name: 'John Doe',
              email: 'johndoe@example.com',
              password: 'testpassword',
              dateOfBirth: new Date('1995-07-15'),
              gender: 'Male',
              enrolledCourses: [{
                courseId : "course_id",
                courseTitle: 'English', 
                courseDescription: 'Will complete introduction of english grammer'
              }],
            };
            Student.findByIdAndDelete.mockResolvedValue(deletedStudent);

            const result = await studentService.deleteStudent(studentId);
            expect(result).toEqual(deletedStudent);
        });

        it(`${studentServiceBoundaryTest} should throw an error when student is not found for getStudent`, async () => {
            const studentId = 'non_existing_id';
            Student.findById.mockResolvedValue(null);
            await expect(studentService.getStudent(studentId)).rejects.toThrow('Failed to get student.');
        });

        it(`${studentServiceBoundaryTest} should throw an error when student is not found for updateStudent`, async () => {
            const studentId = 'non_existing_id';
            const updatedStudentData = {
              name: 'John Doe',
              email: 'johndoe@example.com',
              password: 'testpassword',
              dateOfBirth: new Date('1995-07-15'),
              gender: 'Male',
              enrolledCourses: [{
                courseId : "course_id",
                courseTitle: 'English', 
                courseDescription: 'Will complete introduction of english grammer'
              }],
            };
            Student.findByIdAndUpdate.mockResolvedValue(null);
            await expect(studentService.updateStudent(studentId, updatedStudentData)).rejects.toThrow('Failed to update student.');
        });

        it(`${studentServiceBoundaryTest} should throw an error when student is not found for deleteStudent`, async () => {
            const studentId = 'non_existing_id';
            Student.findByIdAndDelete.mockResolvedValue(null);
            await expect(studentService.deleteStudent(studentId)).rejects.toThrow('Failed to delete student.');
        });

        it(`${studentServiceBoundaryTest} should throw an error when failing to create a student`, async () => {
            const studentData = {
              name: 'John Doe',
              email: 'johndoe@example.com',
              password: 'testpassword',
              dateOfBirth: new Date('1995-07-15'),
              gender: 'Male',
              enrolledCourses: [{
                courseId : "course_id",
                courseTitle: 'English', 
                courseDescription: 'Will complete introduction of english grammer'
              }],
            };
            const error = new Error('Failed to create student.');
            Student.create.mockRejectedValue(error);
            await expect(studentService.createStudent(studentData)).rejects.toThrow(error);
        });

        // it(`${studentServiceBoundaryTest} should get list of all students`, async () => {
        //    let instructorId = "instructorId";
        //     const student = [
        //       {
        //         name: 'John Doe',
        //         email: 'johndoe@example.com',
        //         password: 'testpassword',
        //         dateOfBirth: new Date('1995-07-15'),
        //         gender: 'Male',
        //         enrolledCourses: [{
        //           courseId : "course_id",
        //           courseTitle: 'English', 
        //           courseDescription: 'Will complete introduction of english grammer'
        //         }],
        //       }
        //     ];
        //     Student.find.mockResolvedValue(student);

        //     const result = await studentService.getAllStudents(instructorId);
        //     expect(result).toEqual(student);
        // });
      
        


      it(`${studentServiceBoundaryTest} should search for students by name and email`, async () => {
        const studentData = [{
          name: 'John Doe',
          email: 'johndoe@example.com',
          dateOfBirth: new Date('1995-07-15'),
          gender: 'Male',
          enrolledCourses: [{
            courseId : "course_id",
            courseTitle: 'English', 
            courseDescription: 'Will complete introduction of english grammer'
          }],
        },  
      ]
        
        const name = 'John Doe';
        const email = 'johndoe@example.com';

        const query = {name :name , email :email };

        Student.find.mockResolvedValue(studentData);

        const result = await studentService.searchStudent(name,email);
        expect(result).toEqual(studentData);

      });

      it(`${studentServiceBoundaryTest} should add a new review`, async () => {

      const reviewData = {
      studentId: 'student_id_3',
      comment: 'Another great review!',
      rating: 4,
      courseId: '67890',
      };
      const mockResponseData ={
        _id: '67890',
        title: 'Sample Course',
        description: 'Sample Description',
        category: 'Sample Category',
        ratings: [4, 5],
        reviews: [
        {
          studentId: 'student_id_1',
          comment: 'Great course!',
          rating: 5,
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
        };

      // Mock the Course.findById function to return a course
      Course.findById.mockResolvedValueOnce(mockResponseData);

      const result = await studentService.addReview(reviewData);

      const mockReview ={
        _id: '67890',
        title: 'Sample Course',
        description: 'Sample Description',
        category: 'Sample Category',
        ratings: [4, 5],
        reviews: [
          {
            studentId: 'student_id_1',
            comment: 'Great course!',
            rating: 5,
          },
          {studentId: 'student_id_3',
          comment: 'Another great review!',
          rating: 4,}
          ],
        content: [
        {
          moduleTitle: 'Module 1',
          topics: ['Topic 1', 'Topic 2'],
          readings: ['Reading 1', 'Reading 2'],
          assignments: ['Assignment 1', 'Assignment 2'],
        },
        ],
        };
        
        

        
      
        
      
      // Assertions
      expect(result).toHaveProperty('_id', '67890');
      expect(result.ratings).toContain(4);

      });   

      it(`${studentServiceBoundaryTest} should get list of all popular courses`, async () => {
        const student = [
          {               
            title: 'Sample Course',
            description: 'Sample Description',
            category: 'Sample Category',
            ratings: [4, 5],
            reviews: [
              {
                studentId: 'student_id_1',
                comment: 'Great course!',
                rating: 5,
              },{
                studentId : 'student_id',
                comment : 'Explanation is great!',
                rating : 4,
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
        ];
        Course.aggregate.mockResolvedValue(student);

        const result = await studentService.getAllPopularCourses();
        expect(result).toEqual(student);
    });

    });
});
