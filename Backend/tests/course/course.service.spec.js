const mongoose = require('mongoose');
const CourseServiceImpl = require('../../modules/course/service/impl/course.serviceImpl');
const Course = require('../../modules/course/dao/models/course.model');

jest.mock('../../modules/course/dao/models/course.model');

let courseServiceBoundaryTest = `CourseService functional test`;

describe('Course Service', () => {
    let courseService;

    beforeEach(() => {
        courseService = new CourseServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('bussiness', () => {
        it(`${courseServiceBoundaryTest} should create a new course`, async () => {
            const courseData = {
                title: 'Sample Course',
                description: 'Sample Description',
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
            Course.create.mockResolvedValue(courseData);

            const result = await courseService.createCourse(courseData);
            expect(result).toEqual(courseData);
        });

        it(`${courseServiceBoundaryTest} should get course by ID`, async () => {
            const courseId = 'course_id';
            const course = { _id: courseId, 
                title: 'Sample Course',
                description: 'Sample Description',
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
            Course.findById.mockResolvedValue(course);

            const result = await courseService.getCourse(courseId);
            expect(result).toEqual(course);
        });

        it(`${courseServiceBoundaryTest} should update course by ID`, async () => {
            const courseId = 'course_id';
            const updatedCourseData = {
                title: 'Sample Course',
                description: 'Sample Description',
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
            const updatedCourse = { _id: courseId, ...updatedCourseData };
            Course.findByIdAndUpdate.mockResolvedValue(updatedCourse);

            const result = await courseService.updateCourse(courseId, updatedCourseData);
            expect(result).toEqual(updatedCourse);
        });

        it(`${courseServiceBoundaryTest} should delete course by ID`, async () => {
            const courseId = 'course_id';
            const deletedCourse = {
                _id: courseId,
                title: 'Sample Course',
                description: 'Sample Description',
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
            Course.findByIdAndDelete.mockResolvedValue(deletedCourse);

            const result = await courseService.deleteCourse(courseId);
            expect(result).toEqual(deletedCourse);
        });

        it(`${courseServiceBoundaryTest} should search course by title and description`, async () => {
            const courseData = {
                title: 'Sample Course',
                description: 'Sample Description',
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
            const title = 'Course'
            const description = 'Description'

            const query = {title :title , description :description };

            Course.find.mockResolvedValue(courseData);

            const result = await courseService.searchCourse(query);
            expect(result).toEqual(courseData);

        });

         it(`${courseServiceBoundaryTest} should get courses by category`, async () => {
            const category ='Sample Category';
            const courses = [
                {
                    _id: 'course_id_1',
                    title: 'Course 1',
                    description: 'Description 1',
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
                {
                    _id: 'course_id_2',
                    title: 'Course 2',
                    description: 'Description 2',
                    instructorId: 'instructorId',
                    category: 'Sample Category',
                    ratings: [3, 4],
                    reviews: [
                        {
                            studentId: 2,
                            comment: 'Good course!',
                            rating: 4,
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
            ];
        
            Course.find.mockResolvedValue(courses);
        
            const result = await courseService.getCoursesByCategory(category);
            expect(result).toEqual(courses);
        });

        it(`${courseServiceBoundaryTest} should get courses by minRating`, async () => {
          const minRating = 4;
          const courses = [
              {
                  _id: 'course_id_1',
                  title: 'Course 1',
                  description: 'Description 1',
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
              {
                  _id: 'course_id_2',
                  title: 'Course 2',
                  description: 'Description 2',
                  instructorId: 'instructorId',
                  category: 'Sample Category',
                  ratings: [3, 4],
                  reviews: [
                      {
                          studentId: 2,
                          comment: 'Good course!',
                          rating: 4,
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
          ];
      
          Course.find.mockResolvedValue(courses);
      
          const result = await courseService.getCoursesByRating(minRating);
          expect(result).toEqual(courses);
       });

       

        it(`${courseServiceBoundaryTest} should get course content by ID`, async () => {
            const courseId = 'course_id';
            const course = {
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
            Course.findById.mockResolvedValue(course);
        
            const result = await courseService.getContent(courseId);
            expect(result).toEqual(course.content);
        });
        
        
        

        it(`${courseServiceBoundaryTest} should throw an error when course is not found for getCourse`, async () => {
            const courseId = 'non_existing_id';
            Course.findById.mockResolvedValue(null);
            await expect(courseService.getCourse(courseId)).rejects.toThrow('Failed to get course.');
        });

        it(`${courseServiceBoundaryTest} should throw an error when course is not found for updateCourse`, async () => {
            const courseId = 'non_existing_id';
            const updatedCourseData = {
                title: 'Sample ',
                description: 'Sample ',
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
                ], };
            Course.findByIdAndUpdate.mockResolvedValue(null);
            await expect(courseService.updateCourse(courseId, updatedCourseData)).rejects.toThrow('Failed to update course.');
        });

        it(`${courseServiceBoundaryTest} should throw an error when course is not found for deleteCourse`, async () => {
            const courseId = 'non_existing_id';
            Course.findByIdAndDelete.mockResolvedValue(null);
            await expect(courseService.deleteCourse(courseId)).rejects.toThrow('Failed to delete course.');
        });

        it(`${courseServiceBoundaryTest} should throw an error when content is not found for courseId`, async () => {
            const courseId = 'non_existing_id';
            Course.findById.mockResolvedValue(null);
            await expect(courseService.getContent(courseId)).rejects.toThrow('Failed to get course.');
        });

        it(`${courseServiceBoundaryTest} should throw an error when failing to create a course`, async () => {
            const courseData = {
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
            const error = new Error('Failed to create course.');
            Course.create.mockRejectedValue(error);
            await expect(courseService.createCourse(courseData)).rejects.toThrow(error);
        });

        it(`${courseServiceBoundaryTest} should throw an error when failing to update a course by ID`, async () => {
            const courseId = 'non_existing_id';
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
                ], };
            const error = new Error('Failed to update course.');
            Course.findByIdAndUpdate.mockRejectedValue(error);
            await expect(courseService.updateCourse(courseId, updatedCourseData)).rejects.toThrow(error);
        });

        it(`${courseServiceBoundaryTest} should throw an error when failing to delete a course by ID`, async () => {
            const courseId = 'non_existing_id';
            const error = new Error('Failed to delete course.');
            Course.findByIdAndDelete.mockRejectedValue(error);
            await expect(courseService.deleteCourse(courseId)).rejects.toThrow(error);
        });

        it(`${courseServiceBoundaryTest} should throw an error when course is not found for category`, async () => {
          const category = 'non_existing_category';
          Course.find.mockResolvedValue(null);
          await expect(courseService.getCoursesByCategory(category)).rejects.toThrow('Failed to retrieve course by category.');
         });

        it(`${courseServiceBoundaryTest} should throw an error when course is not found for minRating`, async () => {
          const minRating = 10;
          Course.find.mockResolvedValue(null);
          await expect(courseService.getCoursesByRating(minRating)).rejects.toThrow('Failed to get list of course by rating.');
      });

        it(`${courseServiceBoundaryTest} should throw an error when failed to search course by title and description`, async () => {
          const query = {};
               query.title = { $regex: 'Not a title', $options: 'i' };
               query.description = { $regex: 'Not a description', $options: 'i' };
        
          Course.find.mockResolvedValue(null);
          await expect(courseService.searchCourse(query)).rejects.toThrow('Failed to search for course by title and description.');
      });

        it(`${courseServiceBoundaryTest} should get list of all courses`, async () => {
            const course = [
                { _id: 'course_id_1', title: 'Sample Course',
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
                ], }
            ];
            Course.find.mockResolvedValue(course);

            const result = await courseService.getAllCourses();
            expect(result).toEqual(course);
        });
      

               
    });
});
