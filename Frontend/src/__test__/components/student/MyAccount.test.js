import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import MyAccount from '../../../components/student/MyAccount';
import studentService from '../../../services/student.service';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';

jest.mock('../../../services/student.service');

const mockStudent = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    dateOfBirth: '1990-01-01',
    gender: 'M',
};

const mockUpdatedStudent = {
    ...mockStudent,
    name: 'Updated Name',
    dateOfBirth: '1995-01-01',
    gender: 'F',
};

describe('MyAccountComponent', () => {
    describe('boundary', () => {
        beforeEach(() => {
            studentService.getStudent.mockResolvedValue(mockStudent);
            studentService.updateStudent.mockResolvedValue(mockUpdatedStudent);
            studentService.deleteStudent.mockResolvedValue({});
        });

        test('MyAccountComponent boundary renders student details and edit button', async () => {
            render(
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>
            );
            expect(await screen.findByText(mockStudent.name)).toBeTruthy();
            expect(screen.getByText(mockStudent.email)).toBeTruthy();
            expect(screen.getByText(mockStudent.dateOfBirth)).toBeTruthy();
            expect(screen.getByText('Edit')).toBeTruthy();
        });

        test('MyAccountComponent boundary allows editing student information', async () => {
            render(
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>
            );
            const editButton = await screen.findByText('Edit');
            fireEvent.click(editButton);
            const nameInput = screen.getByLabelText('Name:');
            fireEvent.change(nameInput, { target: { value: mockUpdatedStudent.name } });
            const dateOfBirthInput = screen.getByLabelText('Date of Birth:');
            fireEvent.change(dateOfBirthInput, { target: { value: mockUpdatedStudent.dateOfBirth } });
            const genderSelect = screen.getByLabelText('Gender:');
            fireEvent.change(genderSelect, { target: { value: mockUpdatedStudent.gender } });
            const updateButton = screen.getByText('Update');
            fireEvent.click(updateButton);
            expect(await screen.findByText(mockUpdatedStudent.name)).toBeTruthy();
            expect(screen.getByText(mockUpdatedStudent.dateOfBirth)).toBeTruthy();
        });

        test('MyAccountComponent boundary cancels editing student information', async () => {
            render(
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>
            );
            const editButton = await screen.findByText('Edit');
            fireEvent.click(editButton);
            const nameInput = screen.getByLabelText('Name:'); // Ensure label association
            fireEvent.change(nameInput, { target: { value: mockUpdatedStudent.name } });
            const dateOfBirthInput = screen.getByLabelText('Date of Birth:'); // Ensure label association
            fireEvent.change(dateOfBirthInput, { target: { value: mockUpdatedStudent.dateOfBirth } });
            const genderSelect = screen.getByLabelText('Gender:'); // Ensure label association
            fireEvent.change(genderSelect, { target: { value: mockUpdatedStudent.gender } });
            const cancelButton = screen.getByText('Cancel');
            fireEvent.click(cancelButton);
            expect(await screen.findByText(mockStudent.name)).toBeTruthy();
            expect(screen.getByText(mockStudent.dateOfBirth)).toBeTruthy();
            expect(screen.getByText('Edit')).toBeTruthy();
        });

        test('MyAccountComponent boundary deletes student information', async () => {
            const history = createMemoryHistory();
            render(
                <Router history={history}>
                    <MyAccount />
                </Router>
            );
            studentService.deleteStudent.mockResolvedValue();
            expect(await screen.findByText('My Account')).toBeTruthy();
            expect(history.location.pathname).toBe('/');
        });

        test('MyAccountComponent boundary allows editing student information and having cancel button', async () => {
            render(
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>
            );
            const editButton = await screen.findByText('Edit');
            fireEvent.click(editButton);
            const cancelButton = screen.getByText('Cancel', { exact: false }); // Use exact: false for partial text matching
            expect(cancelButton).toBeTruthy();
            const nameInput = screen.getByLabelText('Name:');
            fireEvent.change(nameInput, { target: { value: mockUpdatedStudent.name } });
            const dateOfBirthInput = screen.getByLabelText('Date of Birth:');
            fireEvent.change(dateOfBirthInput, { target: { value: mockUpdatedStudent.dateOfBirth } });
            const genderSelect = screen.getByLabelText('Gender:');
            fireEvent.change(genderSelect, { target: { value: mockUpdatedStudent.gender } });
            fireEvent.click(cancelButton);
            expect(await screen.findByText(mockStudent.name)).toBeTruthy();
            expect(screen.getByText(mockStudent.dateOfBirth)).toBeTruthy();
            expect(screen.getByText('Edit')).toBeTruthy();
        });
    });
});
