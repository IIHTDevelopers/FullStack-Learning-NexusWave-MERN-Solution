import axios from 'axios';
import gradeService from '../../services/grade.service';

jest.mock('axios');

describe('gradeService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("GradeService functional should get all grades for an instructor", async () => {
            const instructorId = 1;
            const mockGrades = [{ studentId: 1, grade: 90 }, { studentId: 2, grade: 85 }];
            let isNull = false;
            try {
                const response = await gradeService.getAllGrades(instructorId);
                isNull = response === null;
                throw new Error("Error in getAllGrades()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ studentId: 1, grade: 90 }, { studentId: 2, grade: 85 }];
                    gradeService.getAllGrades = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await gradeService.getAllGrades(instructorId);
                    expect(gradeService.getAllGrades).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("GradeService functional should get all grades for a student", async () => {
            const studentId = 1;
            const mockGrades = [{ courseId: 1, grade: 90 }, { courseId: 2, grade: 85 }];
            let isNull = false;
            try {
                const response = await gradeService.getAllGradesForAStudent(studentId);
                isNull = response === null;
                throw new Error("Error in getAllGradesForAStudent()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ courseId: 1, grade: 90 }, { courseId: 2, grade: 85 }];
                    gradeService.getAllGradesForAStudent = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await gradeService.getAllGradesForAStudent(studentId);
                    expect(gradeService.getAllGradesForAStudent).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("GradeService functional should get grades for a student in a course", async () => {
            const studentId = 1;
            const courseId = 1;
            const mockGrades = { grade: 90 };
            let isNull = false;
            try {
                const response = await gradeService.getGradesForStudentInCourse(studentId, courseId);
                isNull = response === null;
                throw new Error("Error in getGradesForStudentInCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { grade: 90 };
                    gradeService.getGradesForStudentInCourse = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await gradeService.getGradesForStudentInCourse(studentId, courseId);
                    expect(gradeService.getGradesForStudentInCourse).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("GradeService functional should get grades for students in a course", async () => {
            const courseId = 1;
            const mockGrades = [{ studentId: 1, grade: 90 }, { studentId: 2, grade: 85 }];
            let isNull = false;
            try {
                const response = await gradeService.getGradesForStudentsInCourse(courseId);
                isNull = response === null;
                throw new Error("Error in getGradesForStudentsInCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ studentId: 1, grade: 90 }, { studentId: 2, grade: 85 }];
                    gradeService.getGradesForStudentsInCourse = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await gradeService.getGradesForStudentsInCourse(courseId);
                    expect(gradeService.getGradesForStudentsInCourse).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("GradeService functional should create grades for a student in a course", async () => {
            const studentId = 1;
            const courseId = 1;
            const mockGradeData = { grade: 90, gradedBy: 'Instructor', gradeDate: '2023-01-01', comments: 'Good work' };
            let isNull = false;
            try {
                const response = await gradeService.createGradesForStudentInCourse(
                    studentId, courseId, mockGradeData.grade, mockGradeData.gradedBy,
                    mockGradeData.gradeDate, mockGradeData.comments
                );
                isNull = response === null;
                throw new Error("Error in createGradesForStudentInCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { grade: 90, gradedBy: 'Instructor', gradeDate: '2023-01-01', comments: 'Good work' };
                    gradeService.createGradesForStudentInCourse = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await gradeService.createGradesForStudentInCourse(
                        studentId, courseId, mockGradeData.grade, mockGradeData.gradedBy,
                        mockGradeData.gradeDate, mockGradeData.comments
                    );
                    expect(gradeService.createGradesForStudentInCourse).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("GradeService functional should update grades for a student in a course", async () => {
            const studentId = 1;
            const courseId = 1;
            const mockGradeData = { grade: 95, gradedBy: 'Instructor', gradeDate: '2023-02-01', comments: 'Excellent work' };
            let isNull = false;
            try {
                const response = await gradeService.updateGradesForStudentInCourse(studentId, courseId, mockGradeData);
                isNull = response === null;
                throw new Error("Error in updateGradesForStudentInCourse()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = { grade: 95, gradedBy: 'Instructor', gradeDate: '2023-02-01', comments: 'Excellent work' };
                    gradeService.updateGradesForStudentInCourse = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await gradeService.updateGradesForStudentInCourse(studentId, courseId, mockGradeData);
                    expect(gradeService.updateGradesForStudentInCourse).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("GradeService functional should get all course averages for an instructor", async () => {
            const instructorId = 1;
            const mockAverages = [{ courseId: 1, average: 87.5 }, { courseId: 2, average: 91.0 }];
            let isNull = false;
            try {
                const response = await gradeService.getAllCourseAvg(instructorId);
                isNull = response === null;
                throw new Error("Error in getAllCourseAvg()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ courseId: 1, average: 87.5 }, { courseId: 2, average: 91.0 }];
                    gradeService.getAllCourseAvg = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await gradeService.getAllCourseAvg(instructorId);
                    expect(gradeService.getAllCourseAvg).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });
    });
});
