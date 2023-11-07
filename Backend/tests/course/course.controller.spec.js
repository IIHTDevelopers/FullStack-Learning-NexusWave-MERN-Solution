const request = require('supertest');
const express = require('express');
const router = require('../../modules/course/routes/course.routes');

const CourseController = require('../../modules/course/controller/course.controller');
const CourseServiceImpl = require('../../modules/course/service/impl/course.serviceImpl');

const authMiddleware = require('../../modules/middleware/authUserMiddleware');

const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use(router);

jest.mock('../../modules/course/service/impl/course.serviceImpl');

let courseControllerBoundaryTest = `CourseController boundary test`;

describe('Course Controller', () => {
  describe('boundary', () => {
    it(`${courseControllerBoundaryTest} should return 401 Unauthorized when trying to access post /course protected routes without a token`, async () => {
      const response = await request(app).post('/course');
      expect(response.status).toBe(401);
    });

    it(`${courseControllerBoundaryTest} should return 401 Unauthorized when trying to access put /:id protected routes without a token`, async () => {
      const response = await request(app).put('/1234');
      expect(response.status).toBe(401);
    });

    it(`${courseControllerBoundaryTest} should return 401 Unauthorized when trying to access delete /:id protected routes without a token`, async () => {
      const response = await request(app).delete('/1234');
      expect(response.status).toBe(401);
    });



    it(`${courseControllerBoundaryTest} should create a new course`, async () => {
      // const mReq = {
      //   title: 'Sample Course',
      //   description: 'Sample Description',
      //   instructorId: 'instructorId',
      //   category: 'Sample Category',
      //   ratings: [4, 5],
      //   reviews: [
      //     {
      //       studentId: 2,
      //       comment: 'Great course!',
      //       rating: 5,
      //     },
      //   ],
      //   content: [
      //     {
      //       moduleTitle: 'Module 1',
      //       topics: ['Topic 1', 'Topic 2'],
      //       readings: ['Reading 1', 'Reading 2'],
      //       assignments: ['Assignment 1', 'Assignment 2'],
      //     },
      //   ],
      // };
      // const mRes = {
      //   status: jest.fn().mockReturnThis(),
      //   json: jest.fn(),
      // };
      // const mNext = jest.fn();

      // const mockCourse = {
      //   _id: 'mockCourseId',
      //   ...mReq.body,
      // };
      const mockCourse = {
        title: 'Sample Course',
        description: 'Sample Description',
        instructorId: 'instructorId',
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
        body: mockCourse,
      };
      const mRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const mNext = jest.fn();

      jest.spyOn(CourseServiceImpl.prototype, 'createCourse').mockResolvedValueOnce(mockCourse);
      await new CourseController().createCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.createCourse).toHaveBeenCalledWith(mockCourse);
      expect(mRes.json).toHaveBeenCalledWith(mockCourse);
      expect(mNext).not.toHaveBeenCalled();
      // CourseServiceImpl.prototype.createCourse.mockResolvedValueOnce(mockCourse);

      // await new CourseController().createCourse(mReq, mRes, mNext);

      // expect(CourseServiceImpl.prototype.createCourse).toHaveBeenCalledWith(mReq.body);
      // expect(mRes.status).toHaveBeenCalledWith(201);
      // expect(mRes.json).toHaveBeenCalledWith(mockCourse);
      // expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should retrieve a course by ID`, async () => {
      const courseId = 'mockCourseId';
      const mockCourse = {
        _id: courseId,
        title: 'Sample Course',
        description: 'Sample Description',
        instructorId: 'instructorId',
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
        params: { id: courseId },
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.getCourse.mockResolvedValueOnce(mockCourse);

      await new CourseController().getCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.getCourse).toHaveBeenCalledWith(courseId);
      expect(mRes.json).toHaveBeenCalledWith(mockCourse);
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should retrieve a course content by ID`, async () => {
      const courseId = 'mockCourseId';
      const mockCourse = {
        _id: courseId,
        title: 'Sample Course',
        description: 'Sample Description',
        instructorId: 'instructorId',
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
        params: { id: courseId },
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.getContent.mockResolvedValueOnce(mockCourse);

      await new CourseController().getContent(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.getContent).toHaveBeenCalledWith(courseId);
      expect(mRes.json).toHaveBeenCalledWith(mockCourse);
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should update a course by ID`, async () => {
      const courseId = 'mockCourseId';
      const updatedCourseData = {
        title: 'Sample Course',
        description: 'Sample Description',
        instructorId: 'instructorId',
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
      const updatedCourse = {
        _id: courseId,
        ...updatedCourseData,
      };

      const mReq = {
        params: { id: courseId },
        body: updatedCourseData,
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.updateCourse.mockResolvedValueOnce(updatedCourse);

      await new CourseController().updateCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.updateCourse).toHaveBeenCalledWith(courseId, updatedCourseData);
      expect(mRes.json).toHaveBeenCalledWith(updatedCourse);
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should delete a course by ID`, async () => {
      const courseId = 'mockCourseId';
      const deletedCourse = {
        _id: courseId,
        title: 'Sample Course',
        description: 'Sample Description',
        instructorId: 'instructorId',
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
        params: { id: courseId },
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.deleteCourse.mockResolvedValueOnce(deletedCourse);

      await new CourseController().deleteCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.deleteCourse).toHaveBeenCalledWith(courseId);
      expect(mRes.json).toHaveBeenCalledWith(deletedCourse);
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should search for course by title and description`, async () => {
      const mockSearchResults = [
        {
          title: 'Sample Course',
          description: 'Sample Description',
          instructorId: 'instructorId',
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
        }
      ];

      const mReq = {
        query: { title: 'Course', description: 'Description' },
      };
      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.searchCourse.mockResolvedValueOnce(mockSearchResults);

      await new CourseController().searchCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.searchCourse).toHaveBeenCalledWith('Course', 'Description');
      expect(mRes.json).toHaveBeenCalledWith(mockSearchResults);
      expect(mNext).not.toHaveBeenCalled();
    });
    it(`${courseControllerBoundaryTest} should retrieve a course by category`, async () => {
      const category = 'Sample Category';
      const mockCourseResults = [
        {
          title: 'Sample Course',
          description: 'Sample Description',
          instructorId: 'instructorId',
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
        }
      ];

      const mReq = {
        params: { category },
      };

      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.getCoursesByCategory.mockResolvedValueOnce(mockCourseResults);

      await new CourseController().getCoursesByCategory(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.getCoursesByCategory).toHaveBeenCalledWith(category);
      expect(mRes.json).toHaveBeenCalledWith(mockCourseResults);
      expect(mNext).not.toHaveBeenCalled();
    });
    it(`${courseControllerBoundaryTest} should retrieve a course by minRating`, async () => {
      const minRating = 4;
      const mockCourseResults = [
        {
          title: 'Sample Course',
          description: 'Sample Description',
          instructorId: 'instructorId',
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
        }
      ];

      const mReq = {
        params: { minRating },
      };

      const mRes = {
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.getCoursesByRating.mockResolvedValueOnce(mockCourseResults);

      await new CourseController().getCoursesByRating(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.getCoursesByRating).toHaveBeenCalledWith(minRating);
      expect(mRes.json).toHaveBeenCalledWith(mockCourseResults);
      expect(mNext).not.toHaveBeenCalled();
    });




    it(`${courseControllerBoundaryTest} should return a 404 error when getting a course with invalid ID`, async () => {
      const courseId = 'invalidCourseId';

      const mReq = {
        params: { id: courseId },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.getCourse.mockRejectedValueOnce(new Error('Course not found.'));

      await new CourseController().getCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.getCourse).toHaveBeenCalledWith(courseId);
      // expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Course not found.' });
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should return a 404 error when getting a course content with invalid ID`, async () => {
      const courseId = 'invalidCourseId';

      const mReq = {
        params: { id: courseId },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.getContent.mockRejectedValueOnce(new Error('Course not found.'));

      await new CourseController().getContent(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.getContent).toHaveBeenCalledWith(courseId);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Course not found.' });
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should return a 404 error when updating a course with invalid ID`, async () => {
      const courseId = 'invalidCourseId';
      const updatedCourseData = {
        title: 'Sample Course',
        description: 'Sample Description',
        instructorId: 'instructorId',
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
        params: { id: courseId },
        body: updatedCourseData,
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.updateCourse.mockRejectedValueOnce(new Error('Course not found.'));

      await new CourseController().updateCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.updateCourse).toHaveBeenCalledWith(courseId, updatedCourseData);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Course not found.' });
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should return a 404 error when deleting a course with invalid ID`, async () => {
      const courseId = 'invalidCourseId';

      const mReq = {
        params: { id: courseId },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      CourseServiceImpl.prototype.deleteCourse.mockRejectedValueOnce(new Error('Course not found.'));

      await new CourseController().deleteCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.deleteCourse).toHaveBeenCalledWith(courseId);
      expect(mRes.status).toHaveBeenCalledWith(404);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Course not found.' });
      expect(mNext).not.toHaveBeenCalled();
    });

    it(`${courseControllerBoundaryTest} should return a 500 error when creating a course fails`, async () => {
      const mReq = {
        body: {
          title: 'Sample Course',
          description: 'Sample Description',
          instructorId: 'instructorId',
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
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      const error = new Error('Failed to create course.');
      CourseServiceImpl.prototype.createCourse.mockRejectedValueOnce(error);

      await new CourseController().createCourse(mReq, mRes, mNext);

      expect(CourseServiceImpl.prototype.createCourse).toHaveBeenCalledWith(mReq.body);
      expect(mRes.status).toHaveBeenCalledWith(500);
      expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create course.' });
      expect(mNext).not.toHaveBeenCalled();
    });








  });
});
