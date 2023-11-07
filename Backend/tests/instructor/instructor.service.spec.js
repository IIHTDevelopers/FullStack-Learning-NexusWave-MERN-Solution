const mongoose = require('mongoose');
const InstructorServiceImpl = require('../../modules/instructor/service/impl/instructor.serviceImpl');
const Instructor = require('../../modules/instructor/dao/models/instructor.model');
const Course = require('../../modules/course/dao/models/course.model');

jest.mock('../../modules/instructor/dao/models/instructor.model');
jest.mock('../../modules/course/dao/models/course.model');

let instructorServiceBoundaryTest = `InstructorService functional test`;

describe('Instructor Service', () => {
    let instructorService;

    beforeEach(() => {
        instructorService = new InstructorServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('bussiness', () => {
        it(`${instructorServiceBoundaryTest} should create a new instructor`, async () => {
            const instructorData = {
              name: "John Doe",
              email: "johndoe@example.com",
              dateOfBirth: new Date("1990-01-15"),
              gender: "Male",
              coursesTaught: [
                {
                  courseId: "101",
                  courseTitle: "Introduction to Programming",
                  courseDescription: "An introductory course on programming."
                },
                {
                  courseId: "202",
                  courseTitle: "Web Development Fundamentals",
                  courseDescription: "A course covering the basics of web development."
                }
              ]
            };
            Instructor.create.mockResolvedValue(instructorData);

            const result = await instructorService.createInstructor(instructorData);
            expect(result).toEqual(instructorData);
        });

        it(`${instructorServiceBoundaryTest} should get instructor by ID`, async () => {
            const instructorId = 'instructor_id';
            const instructor = { _id: instructorId, 
              name: "John Doe",
              email: "johndoe@example.com",
              dateOfBirth: new Date("1990-01-15"),
              gender: "Male",
              coursesTaught: [
                {
                  courseId: "101",
                  courseTitle: "Introduction to Programming",
                  courseDescription: "An introductory course on programming."
                },
                {
                  courseId: "202",
                  courseTitle: "Web Development Fundamentals",
                  courseDescription: "A course covering the basics of web development."
                }
              ]
            };
            Instructor.findById.mockResolvedValue(instructor);

            const result = await instructorService.getInstructor(instructorId);
            expect(result).toEqual(instructor);
        });

        it(`${instructorServiceBoundaryTest} should update instructor by ID`, async () => {
            const instructorId = 'instructor_id';
            const updatedInstructorData ={
              name: "John Doe",
              email: "johndoe@example.com",
              dateOfBirth: new Date("1990-01-15"),
              gender: "Male",
              coursesTaught: [
                {
                  courseId: "101",
                  courseTitle: "Introduction to Programming",
                  courseDescription: "An introductory course on programming."
                },
                {
                  courseId: "202",
                  courseTitle: "Web Development Fundamentals",
                  courseDescription: "A course covering the basics of web development."
                }
              ]
            };
            const updatedInstructor = { _id: instructorId, ...updatedInstructorData };
            Instructor.findByIdAndUpdate.mockResolvedValue(updatedInstructor);

            const result = await instructorService.updateInstructor(instructorId, updatedInstructorData);
            expect(result).toEqual(updatedInstructor);
        });

        it(`${instructorServiceBoundaryTest} should delete instructor by ID`, async () => {
            const instructorId = 'instructor_id';
            const deletedInstructor = {
              _id : instructorId,
              name: "John Doe",
              email: "johndoe@example.com",
              dateOfBirth: new Date("1990-01-15"),
              gender: "Male",
              coursesTaught: [
                {
                  courseId: "101",
                  courseTitle: "Introduction to Programming",
                  courseDescription: "An introductory course on programming."
                },
                {
                  courseId: "202",
                  courseTitle: "Web Development Fundamentals",
                  courseDescription: "A course covering the basics of web development."
                }
              ]
            };
            Instructor.findByIdAndDelete.mockResolvedValue(deletedInstructor);

            const result = await instructorService.deleteInstructor(instructorId);
            expect(result).toEqual(deletedInstructor);
        });

        it(`${instructorServiceBoundaryTest} should get course by courseID and instructorId`, async () => {
          const courseId = 'course_id';
          const instructorId = 'instructor_id';
          const course = { _id: courseId, 
              title: 'Sample Course',
              description: 'Sample Description',
              instructorId : instructorId,
              category: 'Sample Category',
              ratings: [4, 5],
              reviews: [
                {
                  studentId: 2,
                  comment: 'Great course!',
                  rating: 5,
                },
              ],
              content: [
                {
                  moduleTitle: 'Module 1',
                  topics: ['Topic 1', 'Topic 2'],
                  readings: ['Reading 1', 'Reading 2'],
                  assignments: ['Assignment 1', 'Assignment 2'],
                },
              ], };
          Course.findOne.mockResolvedValue(course);

          const result = await instructorService.getCourse(courseId,instructorId);
          expect(result).toEqual(course);
      });



        it(`${instructorServiceBoundaryTest} should throw an error when instructor is not found for getInstructor`, async () => {
            const instructorId = 'non_existing_id';
            Instructor.findById.mockResolvedValue(null);
            await expect(instructorService.getInstructor(instructorId)).rejects.toThrow('Failed to get instructor.');
        });

        it(`${instructorServiceBoundaryTest} should throw an error when instructor is not found for updateInstructor`, async () => {
            const instructorId = 'non_existing_id';
            const updatedInstructorData = {
              name: "John Doe",
              email: "johndoe@example.com",
              dateOfBirth: new Date("1990-01-15"),
              gender: "Male",
              coursesTaught: [
                {
                  courseId: "101",
                  courseTitle: "Introduction to Programming",
                  courseDescription: "An introductory course on programming."
                },
                {
                  courseId: "202",
                  courseTitle: "Web Development Fundamentals",
                  courseDescription: "A course covering the basics of web development."
                }
              ]
            };
            Instructor.findByIdAndUpdate.mockResolvedValue(null);
            await expect(instructorService.updateInstructor(instructorId, updatedInstructorData)).rejects.toThrow('Failed to update instructor.');
        });

        it(`${instructorServiceBoundaryTest} should throw an error when instructor is not found for deleteInstructor`, async () => {
            const instructorId = 'non_existing_id';
            Instructor.findByIdAndDelete.mockResolvedValue(null);
            await expect(instructorService.deleteInstructor(instructorId)).rejects.toThrow('Failed to delete instructor.');
        });

        it(`${instructorServiceBoundaryTest} should throw an error when failing to create a instructor`, async () => {
            const instructorData = {
              name: "John Doe",
              email: "johndoe@example.com",
              dateOfBirth: new Date("1990-01-15"),
              gender: "Male",
              coursesTaught: [
                {
                  courseId: "101",
                  courseTitle: "Introduction to Programming",
                  courseDescription: "An introductory course on programming."
                },
                {
                  courseId: "202",
                  courseTitle: "Web Development Fundamentals",
                  courseDescription: "A course covering the basics of web development."
                }
              ]
            };
            const error = new Error('Failed to create instructor.');
            Instructor.create.mockRejectedValue(error);
            await expect(instructorService.createInstructor(instructorData)).rejects.toThrow(error);
        });

        it(`${instructorServiceBoundaryTest} should get list of all instructors`, async () => {
            const instructor = [
              {
                name: "John Doe",
              email: "johndoe@example.com",
              dateOfBirth: new Date("1990-01-15"),
              gender: "Male",
              coursesTaught: [
                {
                  courseId: "101",
                  courseTitle: "Introduction to Programming",
                  courseDescription: "An introductory course on programming."
                },
                {
                  courseId: "202",
                  courseTitle: "Web Development Fundamentals",
                  courseDescription: "A course covering the basics of web development."
                }
              ]
              }
            ];
            Instructor.find.mockResolvedValue(instructor);

            const result = await instructorService.getAllInstructors();
            expect(result).toEqual(instructor);
        });
      
        it(`${instructorServiceBoundaryTest} should throw an error when course is not found for courseId and instrutorId`, async () => {
          const courseId = 'non_existing_id';
          const instrutorId = 'non_existing_id';
          Course.findOne.mockResolvedValue(null);
          await expect(instructorService.getCourse(courseId)).rejects.toThrow('Failed to get course.');
       });
          
        


      

    });
});
