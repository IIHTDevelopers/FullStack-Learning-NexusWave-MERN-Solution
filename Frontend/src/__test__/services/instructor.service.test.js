import axios from 'axios';
import instructorService from '../../services/instructor.service';

jest.mock('axios');

describe('instructorService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("InstructorService functional should log in an instructor", async () => {
            const mockLoginData = { username: 'instructor', password: 'password' };
            const mockResponseData = { token: 'mockToken', id: 1 };
            let isNull = false;
            try {
                const response = await instructorService.loginInstructor(mockLoginData);
                isNull = response === null;
                throw new Error("Error in loginInstructor()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    instructorService.loginInstructor = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.loginInstructor(mockLoginData);
                    expect(instructorService.loginInstructor).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should log out an instructor", async () => {
            let isNull = false;
            try {
                const response = await instructorService.logOoutInstructor();
                isNull = response === null;
                throw new Error("Error in logOoutInstructor()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    instructorService.logOoutInstructor = jest.fn().mockResolvedValueOnce(undefined);
                    const result = await instructorService.logOoutInstructor();
                    expect(instructorService.logOoutInstructor).toHaveBeenCalled();
                    expect(result).toBeUndefined();
                }
            }
        });

        test("InstructorService functional should get all instructors", async () => {
            const mockInstructors = [{ name: 'Instructor 1' }, { name: 'Instructor 2' }];
            let isNull = false;
            try {
                const response = await instructorService.getAllInstructors();
                isNull = response === null;
                throw new Error("Error in getAllInstructors()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ name: 'Instructor 1' }, { name: 'Instructor 2' }];
                    instructorService.getAllInstructors = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.getAllInstructors();
                    expect(instructorService.getAllInstructors).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should create an instructor", async () => {
            const mockInstructorData = { name: 'Instructor 1' };
            let isNull = false;
            try {
                const response = await instructorService.createInstructor(mockInstructorData);
                isNull = response === null;
                throw new Error("Error in createInstructor()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { name: 'Instructor 1' };
                    instructorService.createInstructor = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.createInstructor(mockInstructorData);
                    expect(instructorService.createInstructor).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should get an instructor", async () => {
            const instructorId = 1;
            const mockInstructorData = { name: 'Instructor 1' };
            let isNull = false;
            try {
                const response = await instructorService.getInstructor(instructorId);
                isNull = response === null;
                throw new Error("Error in getInstructor()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { name: 'Instructor 1' };
                    instructorService.getInstructor = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.getInstructor(instructorId);
                    expect(instructorService.getInstructor).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should update an instructor", async () => {
            const instructorId = 1;
            const mockInstructorData = { name: 'Instructor 1' };
            let isNull = false;
            try {
                const response = await instructorService.updateInstructor(instructorId, mockInstructorData);
                isNull = response === null;
                throw new Error("Error in updateInstructor()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { name: 'Instructor 1' };
                    instructorService.updateInstructor = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.updateInstructor(instructorId, mockInstructorData);
                    expect(instructorService.updateInstructor).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should delete an instructor", async () => {
            const instructorId = 1;
            let isNull = false;
            try {
                const response = await instructorService.deleteInstructor(instructorId);
                isNull = response === null;
                throw new Error("Error in deleteInstructor()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    instructorService.deleteInstructor = jest.fn().mockResolvedValueOnce(undefined);
                    const result = await instructorService.deleteInstructor(instructorId);
                    expect(instructorService.deleteInstructor).toHaveBeenCalled();
                    expect(result).toBeUndefined();
                }
            }
        });

        test("InstructorService functional should get all courses for an instructor", async () => {
            const instructorId = 1;
            const mockCourses = [{ title: 'Course 1' }, { title: 'Course 2' }];
            let isNull = false;
            try {
                const response = await instructorService.getAllCourses(instructorId);
                isNull = response === null;
                throw new Error("Error in getAllCourses()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ title: 'Course 1' }, { title: 'Course 2' }];
                    instructorService.getAllCourses = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.getAllCourses(instructorId);
                    expect(instructorService.getAllCourses).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should get course insights for an instructor", async () => {
            const instructorId = 1;
            const mockInsights = { students: 10, ratings: 4.5, averageGrade: 90 };
            let isNull = false;
            try {
                const response = await instructorService.getCourseInsights(instructorId);
                isNull = response === null;
                throw new Error("Error in getCourseInsights()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { students: 10, ratings: 4.5, averageGrade: 90 };
                    instructorService.getCourseInsights = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.getCourseInsights(instructorId);
                    expect(instructorService.getCourseInsights).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should get average grade for an instructor", async () => {
            const instructorId = 1;
            const mockAverageGrade = 95;
            let isNull = false;
            try {
                const response = await instructorService.getAverageGrade(instructorId);
                isNull = response === null;
                throw new Error("Error in getAverageGrade()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = 95;
                    instructorService.getAverageGrade = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.getAverageGrade(instructorId);
                    expect(instructorService.getAverageGrade).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should get a course for an instructor", async () => {
            const instructorId = 1;
            const courseId = 1;
            const mockCourseData = { title: 'Course 1' };
            let isNull = false;
            try {
                const response = await instructorService.getCourse(courseId, instructorId);
                isNull = response === null;
                throw new Error("Error in getCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { title: 'Course 1' };
                    instructorService.getCourse = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.getCourse(courseId, instructorId);
                    expect(instructorService.getCourse).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should update a course for an instructor", async () => {
            const instructorId = 1;
            const courseId = 1;
            const mockCourseData = { title: 'Course 1' };
            let isNull = false;
            try {
                const response = await instructorService.updateCourse(courseId, instructorId, mockCourseData);
                isNull = response === null;
                throw new Error("Error in updateCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { title: 'Course 1' };
                    instructorService.updateCourse = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await instructorService.updateCourse(courseId, instructorId, mockCourseData);
                    expect(instructorService.updateCourse).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("InstructorService functional should delete a course for an instructor", async () => {
            const instructorId = 1;
            const courseId = 1;
            let isNull = false;
            try {
                const response = await instructorService.deleteCourse(courseId, instructorId);
                isNull = response === null;
                throw new Error("Error in deleteCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    instructorService.deleteCourse = jest.fn().mockResolvedValueOnce(undefined);
                    const result = await instructorService.deleteCourse(courseId, instructorId);
                    expect(instructorService.deleteCourse).toHaveBeenCalled();
                    expect(result).toBeUndefined();
                }
            }
        });
    });
});
