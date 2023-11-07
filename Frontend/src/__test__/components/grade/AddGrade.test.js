import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AddGrade from '../../../components/grade/AddGrade';
import studentService from '../../../services/student.service';
import courseService from '../../../services/course.service';
import gradeService from '../../../services/grade.service';

jest.mock('../../../services/student.service');
jest.mock('../../../services/course.service');
jest.mock('../../../services/grade.service');

describe('AddGradeComponent', () => {
    describe('boundary', () => {
        const mockStudents = [
            {
                _id: 'student1',
                name: 'Student 1',
            },
            {
                _id: 'student2',
                name: 'Student 2',
            },
        ];

        const mockCourses = [
            {
                _id: 'course1',
                title: 'Course 1',
            },
            {
                _id: 'course2',
                title: 'Course 2',
            },
        ];

        beforeEach(() => {
            studentService.getAllStudents.mockResolvedValue(mockStudents);
            courseService.getAllCourses.mockResolvedValue(mockCourses);
        });

        test('AddGradeComponent boundary AddGrade should render select elements for student and course', () => {
            render(
                <MemoryRouter>
                    <AddGrade />
                </MemoryRouter>
            );

            const selectStudent = screen.getByLabelText('Select Student');
            const selectCourse = screen.getByLabelText('Select Course');

            expect(selectStudent).toBeTruthy();
            expect(selectCourse).toBeTruthy();
        });

        test('AddGradeComponent boundary AddGrade should render input elements for grade, date, and comments', () => {
            render(
                <MemoryRouter>
                    <AddGrade />
                </MemoryRouter>
            );

            const inputGrade = screen.getByLabelText('Grade');
            const inputDate = screen.getByLabelText('Date');
            const inputComments = screen.getByLabelText('Comments');

            expect(inputGrade).toBeTruthy();
            expect(inputDate).toBeTruthy();
            expect(inputComments).toBeTruthy();
        });

        test('AddGradeComponent boundary AddGrade should render Add Grade and Cancel buttons', () => {
            render(
                <MemoryRouter>
                    <AddGrade />
                </MemoryRouter>
            );

            const addButton = screen.getByText('Add Grade');
            const cancelButton = screen.getByText('Cancel');

            expect(addButton).toBeTruthy();
            expect(cancelButton).toBeTruthy();
        });

        test('AddGradeComponent boundary AddGrade should display an alert if student and course are not selected when adding a grade', () => {
            render(
                <MemoryRouter>
                    <AddGrade />
                </MemoryRouter>
            );
            const addButton = screen.getByText('Add Grade');
            window.alert = jest.fn();
            fireEvent.click(addButton);
            expect(window.alert).toHaveBeenCalledWith('Please select a student and a course.');
        });
    });
});
