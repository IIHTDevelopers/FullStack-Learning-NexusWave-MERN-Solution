const request = require('supertest');
const express = require('express');
const router = require('../../modules/instructor/routes/instructor.routes');

const InstructorController = require('../../modules/instructor/controller/instructor.controller');
const InstructorServiceImpl = require('../../modules/instructor/service/impl/instructor.serviceImpl');

const authMiddleware = require('../../modules/middleware/authUserMiddleware');

const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use(router);

jest.mock('../../modules/instructor/service/impl/instructor.serviceImpl');

let instructorControllerBoundaryTest = `InstructorController boundary test`;

describe('Instructor Controller', () => {
    describe('boundary', () => {
        

        it(`${instructorControllerBoundaryTest} should return 401 Unauthorized when trying to access put /:id protected routes without a token`, async () => {
            const response = await request(app).put('/1234');
            expect(response.status).toBe(401);
        });

        it(`${instructorControllerBoundaryTest} should return 401 Unauthorized when trying to access delete /:id protected routes without a token`, async () => {
            const response = await request(app).delete('/1234');
            expect(response.status).toBe(401);
        });

        
        it(`${instructorControllerBoundaryTest} should retrieve all instructors`, async () => {

          const mockInstructorResult = [{
            name: "John Doe",
            email: "johndoe@example.com",
            password: 'testpassword',
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
          }];

          const mReq = {
          };
          const mRes = {
              json: jest.fn(),
          };
          const mNext = jest.fn();

          InstructorServiceImpl.prototype.getAllInstructors.mockResolvedValueOnce(mockInstructorResult);

          await new InstructorController().getAllInstructors(mReq, mRes, mNext);

          expect(InstructorServiceImpl.prototype.getAllInstructors).toHaveBeenCalledWith();
          expect(mRes.json).toHaveBeenCalledWith(mockInstructorResult);
          expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should create a new instructor`, async () => {
            const mReq = {
              name: "John Doe",
              email: "johndoe@example.com",
              password: 'testpassword',
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
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockInstructor = {
                _id: 'mockInstructorId',
                ...mReq.body,
            };

            InstructorServiceImpl.prototype.createInstructor.mockResolvedValueOnce(mockInstructor);

            await new InstructorController().createInstructor(mReq, mRes, mNext);

            expect(InstructorServiceImpl.prototype.createInstructor).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockInstructor);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should retrieve a instructor by ID`, async () => {
            const instructorId = 'mockInstructorId';
            const mockInstructor = {
              _id: 'mockInstructorId',
                name: "John Doe",
                email: "johndoe@example.com",
                password: 'testpassword',
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

            const mReq = {
                params: { id: instructorId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            InstructorServiceImpl.prototype.getInstructor.mockResolvedValueOnce(mockInstructor);

            await new InstructorController().getInstructor(mReq, mRes, mNext);

            expect(InstructorServiceImpl.prototype.getInstructor).toHaveBeenCalledWith(instructorId);
            expect(mRes.json).toHaveBeenCalledWith(mockInstructor);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should update a instructor by ID`, async () => {
            const instructorId = 'mockInstructorId';
            const updatedInstructorData = {
              name: "John Doe",
              email: "johndoe@example.com",
              password: 'testpassword',
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
            const updatedInstructor = {
                _id: instructorId,
                ...updatedInstructorData,
            };

            const mReq = {
                params: { id: instructorId },
                body: updatedInstructorData,
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            InstructorServiceImpl.prototype.updateInstructor.mockResolvedValueOnce(updatedInstructor);

            await new InstructorController().updateInstructor(mReq, mRes, mNext);

            expect(InstructorServiceImpl.prototype.updateInstructor).toHaveBeenCalledWith(instructorId, updatedInstructorData);
            expect(mRes.json).toHaveBeenCalledWith(updatedInstructor);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should delete a instructor by ID`, async () => {
            const instructorId = 'mockInstructorId';
            const deletedInstructor = {
              _id : instructorId,
                name: "John Doe",
                email: "johndoe@example.com",
                password: 'testpassword',
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

            const mReq = {
                params: { id: instructorId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            InstructorServiceImpl.prototype.deleteInstructor.mockResolvedValueOnce(deletedInstructor);

            await new InstructorController().deleteInstructor(mReq, mRes, mNext);

            expect(InstructorServiceImpl.prototype.deleteInstructor).toHaveBeenCalledWith(instructorId);
            expect(mRes.json).toHaveBeenCalledWith(deletedInstructor);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should retrieve a course by ID and instructorId`, async () => {
          const courseId = 'mockCourseId';
          const instructorId = 'mockInstructorId';
          const mockCourse = {
              _id: courseId,
              title: 'Sample Course',
              description: 'Sample Description',
              instructorId: instructorId,
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
              ],
          };

          const mReq = {
              params: { courseId: courseId ,instructorId:instructorId},
          };
          const mRes = {
              json: jest.fn(),
          };
          const mNext = jest.fn();

          InstructorServiceImpl.prototype.getCourse.mockResolvedValueOnce(mockCourse);

          await new InstructorController().getCourse(mReq, mRes, mNext);

          expect(InstructorServiceImpl.prototype.getCourse).toHaveBeenCalledWith(courseId,instructorId);
          expect(mRes.json).toHaveBeenCalledWith(mockCourse);
          expect(mNext).not.toHaveBeenCalled();
      });

      
        



        it(`${instructorControllerBoundaryTest} should return a 404 error when getting a instructor with invalid ID`, async () => {
            const instructorId = 'invalidInstructorId';

            const mReq = {
                params: { id: instructorId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            InstructorServiceImpl.prototype.getInstructor.mockRejectedValueOnce(new Error('Instructor not found.'));

            await new InstructorController().getInstructor(mReq, mRes, mNext);

            expect(InstructorServiceImpl.prototype.getInstructor).toHaveBeenCalledWith(instructorId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Instructor not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should return a 404 error when updating a instructor with invalid ID`, async () => {
            const instructorId = 'invalidInstructorId';
            const updatedInstructorData = {
              name: "John Doe",
              email: "johndoe@example.com",
              password: 'testpassword',
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

            const mReq = {
                params: { id: instructorId },
                body: updatedInstructorData,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            InstructorServiceImpl.prototype.updateInstructor.mockRejectedValueOnce(new Error('Instructor not found.'));

            await new InstructorController().updateInstructor(mReq, mRes, mNext);

            expect(InstructorServiceImpl.prototype.updateInstructor).toHaveBeenCalledWith(instructorId, updatedInstructorData);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Instructor not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should return a 404 error when deleting a instructor with invalid ID`, async () => {
            const instructorId = 'invalidInstructorId';

            const mReq = {
                params: { id: instructorId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            InstructorServiceImpl.prototype.deleteInstructor.mockRejectedValueOnce(new Error('Instructor not found.'));

            await new InstructorController().deleteInstructor(mReq, mRes, mNext);

            expect(InstructorServiceImpl.prototype.deleteInstructor).toHaveBeenCalledWith(instructorId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Instructor not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should return a 500 error when creating a instructor fails`, async () => {
            const mReq = {
                body: {
                  name: "John Doe",
                  email: "johndoe@example.com",
                  password: 'testpassword',
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
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Failed to create instructor.');
            InstructorServiceImpl.prototype.createInstructor.mockRejectedValueOnce(error);

            await new InstructorController().createInstructor(mReq, mRes, mNext);

            expect(InstructorServiceImpl.prototype.createInstructor).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create instructor.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${instructorControllerBoundaryTest} should return a 404 error when getting a course by INVALID ID and INVALID instructorId`, async () => {
          const courseId = 'invalidCourseId';
          const instructorId = 'invalidInstructorId';
          const mReq = {
              params: { courseId: courseId ,instructorId:instructorId },
          };
          const mRes = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
          };
          const mNext = jest.fn();

          InstructorServiceImpl.prototype.getCourse.mockRejectedValueOnce(new Error('Course not found.'));

          await new InstructorController().getCourse(mReq, mRes, mNext);

          expect(InstructorServiceImpl.prototype.getCourse).toHaveBeenCalledWith(courseId,instructorId);
          // expect(mRes.status).toHaveBeenCalledWith(404);
          expect(mRes.json).toHaveBeenCalledWith({ error: 'Course not found.' });
          expect(mNext).not.toHaveBeenCalled();
      });
             
    
        
    });
});
