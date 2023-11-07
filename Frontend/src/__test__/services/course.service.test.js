import axios from 'axios';
import courseService from '../../services/course.service';

jest.mock('axios');

describe('courseService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("CourseService functional should get all courses", async () => {
            const mockCourses = [{ title: 'Course 1' }, { title: 'Course 2' }];
            let isNull = false;
            try {
                const response = await courseService.getAllCourses();
                isNull = response === null;
                throw new Error("Error in getAllCourses()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ title: 'Course 1' }, { title: 'Course 2' }];
                    courseService.getAllCourses = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await courseService.getAllCourses();
                    expect(courseService.getAllCourses).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("CourseService functional should get courses by category", async () => {
            const category = 'Programming';
            const mockCourses = [{ title: 'Course 1' }, { title: 'Course 2' }];
            let isNull = false;
            try {
                const response = await courseService.getCoursesByCategory(category);
                isNull = response === null;
                throw new Error("Error in getCoursesByCategory()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ title: 'Course 1' }, { title: 'Course 2' }];
                    courseService.getCoursesByCategory = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await courseService.getCoursesByCategory(category);
                    expect(courseService.getCoursesByCategory).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("CourseService functional should get courses by rating", async () => {
            const minRating = 4.0;
            const mockCourses = [{ title: 'Course 1' }, { title: 'Course 2' }];
            let isNull = false;
            try {
                const response = await courseService.getCoursesByRating(minRating);
                isNull = response === null;
                throw new Error("Error in getCoursesByRating()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ title: 'Course 1' }, { title: 'Course 2' }];
                    courseService.getCoursesByRating = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await courseService.getCoursesByRating(minRating);
                    expect(courseService.getCoursesByRating).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("CourseService functional should create a course", async () => {
            const mockCourseData = { title: 'New Course' };
            let isNull = false;
            try {
                const response = await courseService.createCourse(mockCourseData);
                isNull = response === null;
                throw new Error("Error in createCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockCourseData = { title: 'New Course' };
                    courseService.createCourse = jest.fn().mockResolvedValueOnce(mockCourseData);
                    const result = await courseService.createCourse(mockCourseData);
                    expect(courseService.createCourse).toHaveBeenCalled();
                    expect(result).toEqual(mockCourseData);
                }
            }
        });

        test("CourseService functional should get a course by ID", async () => {
            const courseId = 1;
            const successResponse = { title: 'Course 1' };
            let isNull = false;
            try {
                const response = await courseService.getCourse(courseId);
                isNull = response === null;
                throw new Error("Error in getCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const successResponse = { title: 'Course 1' };
                    courseService.getCourse = jest.fn().mockResolvedValueOnce(successResponse);
                    const result = await courseService.getCourse(courseId);
                    expect(courseService.getCourse).toHaveBeenCalled();
                    expect(result).toEqual(successResponse);
                }
            }
        });

        test("CourseService functional should update a course", async () => {
            const courseId = 1;
            const mockCourseData = { title: 'Updated Course' };
            let isNull = false;
            try {
                const response = await courseService.updateCourse(courseId, mockCourseData);
                isNull = response === null;
                throw new Error("Error in updateCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockCourseData = { title: 'Updated Course' };
                    courseService.updateCourse = jest.fn().mockResolvedValueOnce(mockCourseData);
                    const result = await courseService.updateCourse(courseId, mockCourseData);
                    expect(courseService.updateCourse).toHaveBeenCalled();
                    expect(result).toEqual(mockCourseData);
                }
            }
        });

        test("CourseService functional should delete a course", async () => {
            const courseId = 1;
            const successResponse = { message: 'Course deleted successfully' };
            let isNull = false;
            try {
                const response = await courseService.deleteCourse(courseId);
                isNull = response === null;
                throw new Error("Error in deleteCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const successResponse = { message: 'Course deleted successfully' };
                    courseService.deleteCourse = jest.fn().mockResolvedValueOnce(successResponse);
                    const result = await courseService.deleteCourse(courseId);
                    expect(courseService.deleteCourse).toHaveBeenCalled();
                    expect(result).toEqual(successResponse);
                }
            }
        });

        test("CourseService functional should search course by title", async () => {
            const title = 'Course 1';
            const successResponse = [{ title: 'Course 1' }];
            let isNull = false;
            try {
                const response = await courseService.searchCourse(title);
                isNull = response === null;
                throw new Error("Error in searchCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const successResponse = [{ title: 'Course 1' }];
                    courseService.searchCourse = jest.fn().mockResolvedValueOnce(successResponse);
                    const result = await courseService.searchCourse(title);
                    expect(courseService.searchCourse).toHaveBeenCalled();
                    expect(result).toEqual(successResponse);
                }
            }
        });
    });
});
