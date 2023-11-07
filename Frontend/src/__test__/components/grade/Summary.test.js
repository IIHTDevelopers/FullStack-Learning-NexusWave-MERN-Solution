import React from 'react';
import { render, act, screen } from '@testing-library/react';
import Summary from '../../../components/grade/Summary';
import studentService from '../../../services/student.service';
import gradeService from '../../../services/grade.service';
import courseService from '../../../services/course.service';

jest.mock('../../../services/student.service');
jest.mock('../../../services/grade.service');
jest.mock('../../../services/course.service');

describe('SummaryComponent', () => {
    describe('boundary', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('SummaryComponent boundary Summary Component should display course grades for all students', async () => {
            const mockStudents = [
                { _id: 'student1', name: 'Student 1' },
                { _id: 'student2', name: 'Student 2' },
            ];

            const mockGrades = [
                { studentName: 'Student 1', grades: [{ course: 'Course 1', grade: 95 }, { course: 'Course 2', grade: 87 }] },
                { studentName: 'Student 2', grades: [{ course: 'Course 1', grade: 75 }, { course: 'Course 2', grade: 91 }] },
            ];

            const mockCourses = [
                { _id: 'course1', title: 'Course 1' },
                { _id: 'course2', title: 'Course 2' },
            ];

            studentService.getAllStudents.mockResolvedValue(mockStudents);
            gradeService.getAllGradesForAStudent.mockImplementation((studentId) => {
                const student = mockStudents.find((s) => s._id === studentId);
                return Promise.resolve(mockGrades.find((g) => g.studentName === student.name).grades);
            });

            courseService.getAllCourses.mockResolvedValue(mockCourses);
            gradeService.getGradesForStudentsInCourse.mockImplementation((courseId) => {
                const course = mockCourses.find((c) => c._id === courseId);
                return Promise.resolve(mockGrades.filter((g) => g.grades.some((grade) => grade.course === course.title)));
            });

            let container;

            await act(async () => {
                const renderResult = render(<Summary />);
                container = renderResult.container;
            });

            expect(container).toBeTruthy();
            expect(screen.getByText('Course Grades for All Students')).toBeTruthy();
            expect(screen.getByText('Course 1')).toBeTruthy();
            expect(screen.getByText('Course 2')).toBeTruthy();
        });
    });
});
