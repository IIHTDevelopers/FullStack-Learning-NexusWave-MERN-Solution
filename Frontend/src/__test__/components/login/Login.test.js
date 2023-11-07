import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import Login from '../../../components/login/Login';
import instructorService from '../../../services/instructor.service';
import studentService from '../../../services/student.service';

jest.mock('../../../services/instructor.service');
jest.mock('../../../services/student.service');

const mockHistoryPush = jest.fn();

describe('LoginComponent', () => {
    describe('boundary', () => {
        beforeEach(() => {
            instructorService.loginInstructor.mockResolvedValue({});
            studentService.loginStudent.mockResolvedValue({});
        });

        test('LoginComponent boundary renders the login form', () => {
            render(
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            );

            const emailInput = screen.getByLabelText('Email');
            const passwordInput = screen.getByLabelText('Password');
            const loginButton = screen.getByText('Login');

            expect(emailInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
            expect(loginButton).toBeTruthy();
        });

        test('LoginComponent boundary logs in as a student', async () => {
            render(
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            );

            const emailInput = screen.getByLabelText('Email');
            const passwordInput = screen.getByLabelText('Password');
            const loginButton = screen.getByText('Login');

            fireEvent.change(emailInput, { target: { value: 'student@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password' } });

            fireEvent.click(loginButton);

            // Check if the loginStudent function is called
            expect(studentService.loginStudent).toHaveBeenCalled();
        });

        test('LoginComponent boundary toggles user type between instructor and student', () => {
            render(
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            );
            const switchToggle = screen.getByRole('checkbox');
            fireEvent.click(switchToggle);
            expect(screen.getByText('Instructor').outerHTML).toContain('class="active"');
            expect(screen.getByText('Student').outerHTML).not.toContain('class="active"');
            fireEvent.click(switchToggle);
            expect(screen.getByText('Instructor').outerHTML).not.toContain('class="active"');
            expect(screen.getByText('Student').outerHTML).toContain('class="active"');
        });
    });
});
