import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnrolledStudents from '../../../components/student/EnrolledStudents';
import studentService from '../../../services/student.service';

jest.mock('../../../services/student.service');

const mockStudents = [
    {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        dateOfBirth: '1990-01-01',
        gender: 'M',
    },
    {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        dateOfBirth: '1995-02-15',
        gender: 'F',
    },
];

describe('EnrolledStudentsComponent', () => {
    describe('boundary', () => {
        beforeEach(() => {
            studentService.getAllStudents.mockResolvedValue(mockStudents);
            studentService.searchStudent.mockResolvedValue(mockStudents);
        });

        test('EnrolledStudentsComponent boundary renders a list of enrolled students', async () => {
            render(<EnrolledStudents />);

            for (const student of mockStudents) {
                expect(await screen.findByText(student.name)).toBeTruthy();
                expect(screen.getByText(student.email)).toBeTruthy();
                expect(screen.getByText(student.dateOfBirth)).toBeTruthy();
                // expect(screen.getByText(student.gender === 'M' ? 'Male' : 'Female')).toBeTruthy();
            }
        });

        test('EnrolledStudentsComponent boundary handles searching for students', async () => {
            render(<EnrolledStudents />);

            const searchText = 'John';
            const searchButton = screen.getByText('Search');
            const searchInput = screen.getByPlaceholderText('Search students');

            fireEvent.change(searchInput, { target: { value: searchText } });
            fireEvent.click(searchButton);

            expect(await screen.findByText('John Doe')).toBeTruthy();
            expect(screen.queryByText('Jane Smith')).toBeTruthy();
        });
    });
});
