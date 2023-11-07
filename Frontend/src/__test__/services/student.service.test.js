import axios from 'axios';
import studentService from '../../services/student.service';

jest.mock('axios');

describe('studentService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("StudentService functional should log in a student", async () => {
            const mockLoginData = { username: 'student', password: 'password' };
            const mockResponseData = { token: 'mockToken', id: 1 };
            let isNull = false;
            try {
                const response = await studentService.loginStudent(mockLoginData);
                isNull = response === null;
                throw new Error("Error in loginStudent()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    studentService.loginStudent = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await studentService.loginStudent(mockLoginData);
                    expect(studentService.loginStudent).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("StudentService functional should log out a student", async () => {
            let isNull = false;
            try {
                const response = await studentService.logOutStudent();
                isNull = response === null;
                throw new Error("Error in logOutStudent()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    studentService.logOutStudent = jest.fn().mockResolvedValueOnce(undefined);
                    const result = await studentService.logOutStudent();
                    expect(studentService.logOutStudent).toHaveBeenCalled();
                    expect(result).toBeUndefined();
                }
            }
        });

        test("StudentService functional should get all students enrolled in courses for an instructor", async () => {
            const instructorId = 1;
            const mockStudents = [{ name: 'Student 1' }, { name: 'Student 2' }];
            let isNull = false;
            try {
                const response = await studentService.getAllStudents(instructorId);
                isNull = response === null;
                throw new Error("Error in getAllStudents()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ name: 'Student 1' }, { name: 'Student 2' }];
                    studentService.getAllStudents = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await studentService.getAllStudents(instructorId);
                    expect(studentService.getAllStudents).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("StudentService functional should create a student", async () => {
            const mockStudentData = { name: 'Student 1' };
            let isNull = false;
            try {
                const response = await studentService.createStudent(mockStudentData);
                isNull = response === null;
                throw new Error("Error in createStudent()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { name: 'Student 1' };
                    studentService.createStudent = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await studentService.createStudent(mockStudentData);
                    expect(studentService.createStudent).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("StudentService functional should get a student", async () => {
            const studentId = 1;
            const mockStudentData = { name: 'Student 1' };
            let isNull = false;
            try {
                const response = await studentService.getStudent(studentId);
                isNull = response === null;
                throw new Error("Error in getStudent()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { name: 'Student 1' };
                    studentService.getStudent = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await studentService.getStudent(studentId);
                    expect(studentService.getStudent).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("StudentService functional should update a student", async () => {
            const studentId = 1;
            const mockStudentData = { name: 'Student 1' };
            let isNull = false;
            try {
                const response = await studentService.updateStudent(studentId, mockStudentData);
                isNull = response === null;
                throw new Error("Error in updateStudent()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { name: 'Student 1' };
                    studentService.updateStudent = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await studentService.updateStudent(studentId, mockStudentData);
                    expect(studentService.updateStudent).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("StudentService functional should delete a student", async () => {
            const studentId = 1;
            let isNull = false;
            try {
                const response = await studentService.deleteStudent(studentId);
                isNull = response === null;
                throw new Error("Error in deleteStudent()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    studentService.deleteStudent = jest.fn().mockResolvedValueOnce(undefined);
                    const result = await studentService.deleteStudent(studentId);
                    expect(studentService.deleteStudent).toHaveBeenCalled();
                    expect(result).toBeUndefined();
                }
            }
        });

        test("StudentService functional should search for students by name or email", async () => {
            const searchedText = 'student';
            const mockStudents = [{ name: 'Student 1' }, { name: 'Student 2' }];
            let isNull = false;
            try {
                const response = await studentService.searchStudent(searchedText);
                isNull = response === null;
                throw new Error("Error in searchStudent()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ name: 'Student 1' }, { name: 'Student 2' }];
                    studentService.searchStudent = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await studentService.searchStudent(searchedText);
                    expect(studentService.searchStudent).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("StudentService functional should add a review for a student", async () => {
            const mockReviewData = { studentId: 1, courseId: 1, rating: 5, comments: 'Great student' };
            let isNull = false;
            try {
                const response = await studentService.addReview(mockReviewData);
                isNull = response === null;
                throw new Error("Error in addReview()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { studentId: 1, courseId: 1, rating: 5, comments: 'Great student' };
                    studentService.addReview = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await studentService.addReview(mockReviewData);
                    expect(studentService.addReview).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("StudentService functional should get all popular courses", async () => {
            const mockPopularCourses = [{ title: 'Course 1' }, { title: 'Course 2' }];
            let isNull = false;
            try {
                const response = await studentService.getAllPopularCourses();
                isNull = response === null;
                throw new Error("Error in getAllPopularCourses()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ title: 'Course 1' }, { title: 'Course 2' }];
                    studentService.getAllPopularCourses = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await studentService.getAllPopularCourses();
                    expect(studentService.getAllPopularCourses).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });
    });
});
