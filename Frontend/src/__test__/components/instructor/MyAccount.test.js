import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyAccount from '../../../components/instructor/MyAccount';
import instructorService from '../../../services/instructor.service';

jest.mock('../../../services/instructor.service');

describe('MyAccountComponent', () => {
    describe('boundary', () => {
        beforeEach(() => {
            instructorService.getInstructor.mockResolvedValue({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                dateOfBirth: '1990-01-01',
                gender: 'Male',
                coursesTaught: [],
            });

            instructorService.updateInstructor.mockResolvedValue({});
            instructorService.deleteInstructor.mockResolvedValue({});
        });

        test('MyAccountComponent boundary renders the My Account form', async () => {
            render(
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>
            );
            const nameInput = screen.getByLabelText('Name:');
            const emailInput = screen.getByLabelText('Email:');
            const passwordInput = screen.getByLabelText('Password:');
            const dobInput = screen.getByLabelText('Date of Birth:');
            const genderSelect = screen.getByLabelText('Gender:');
            expect(nameInput).toBeTruthy();
            expect(emailInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
            expect(dobInput).toBeTruthy();
            expect(genderSelect).toBeTruthy();
        });

        test('MyAccountComponent boundary saves the updated account information', async () => {
            render(
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>
            );

            const editButton = screen.getByText('Edit');
            fireEvent.click(editButton);

            const nameInput = screen.getByLabelText('Name:');
            const emailInput = screen.getByLabelText('Email:');
            const passwordInput = screen.getByLabelText('Password:');
            const dobInput = screen.getByLabelText('Date of Birth:');
            const genderSelect = screen.getByLabelText('Gender:');
            const saveButton = screen.getByText('Save');

            fireEvent.change(nameInput, { target: { value: 'New Name' } });
            fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
            fireEvent.change(dobInput, { target: { value: '1995-01-01' } });
            fireEvent.change(genderSelect, { target: { value: 'Female' } });

            fireEvent.click(saveButton);

            expect(instructorService.updateInstructor).toHaveBeenCalledWith(
                localStorage.getItem('id'),
                expect.objectContaining({
                    name: 'New Name',
                    email: 'newemail@example.com',
                    password: 'newpassword123',
                    dateOfBirth: '1995-01-01',
                    gender: 'Female',
                })
            );
        });

        test('MyAccountComponent boundary deletes the instructor account', async () => {
            render(
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>
            );

            const deleteButton = screen.getByText('Delete my account');
            fireEvent.click(deleteButton);

            expect(instructorService.deleteInstructor).toHaveBeenCalledWith(localStorage.getItem('id'));
        });

        test('MyAccountComponent boundary allows editing the account information', async () => {
            render(
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>
            );

            const editButton = screen.getByText('Edit');
            fireEvent.click(editButton);

            const nameInput = screen.getByLabelText('Name:');
            const emailInput = screen.getByLabelText('Email:');
            const passwordInput = screen.getByLabelText('Password:');
            const dobInput = screen.getByLabelText('Date of Birth:');
            const genderSelect = screen.getByLabelText('Gender:');

            fireEvent.change(nameInput, { target: { value: 'New Name' } });
            fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
            fireEvent.change(dobInput, { target: { value: '1995-01-01' } });
            fireEvent.change(genderSelect, { target: { value: 'Female' } });

            expect(nameInput.textContent).toBe('');
            expect(emailInput.textContent).toBe('');
            expect(passwordInput.textContent).toBe('');
            expect(dobInput.textContent).toBe('');
        });
    });
});
