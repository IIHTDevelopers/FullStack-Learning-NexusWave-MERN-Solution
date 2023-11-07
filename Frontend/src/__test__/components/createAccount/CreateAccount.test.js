import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateAccount from '../../../components/createAccount/CreateAccount';

describe('CreateAccountComponent', () => {
    describe('boundary', () => {
        test('CreateAccountComponent boundary should render the CreateAccount component', () => {
            const { getByText, getByPlaceholderText, getByLabelText } = render(
                <CreateAccount />
            );
            const pageTitle = getByText('Create New Account');
            const nameInput = getByPlaceholderText('Name');
            const emailInput = getByPlaceholderText('Email');
            const passwordInput = getByPlaceholderText('Password');
            const dateOfBirthInput = getByPlaceholderText('Date of Birth');
            const instructorCheckbox = getByText('Are you an Instructor?');
            const createAccountButton = getByText('Create Account');
            expect(pageTitle).toBeTruthy();
            expect(nameInput).toBeTruthy();
            expect(emailInput).toBeTruthy();
            expect(passwordInput).toBeTruthy();
            expect(dateOfBirthInput).toBeTruthy();
            expect(instructorCheckbox).toBeTruthy();
            expect(createAccountButton).toBeTruthy();
        });

        test('CreateAccountComponent boundary should simulate form input and submission', () => {
            const { getByPlaceholderText, getByText } = render(<CreateAccount />);
            const nameInput = getByPlaceholderText('Name');
            const emailInput = getByPlaceholderText('Email');
            const passwordInput = getByPlaceholderText('Password');
            const dateOfBirthInput = getByPlaceholderText('Date of Birth');
            const instructorCheckbox = getByText('Are you an Instructor?');
            fireEvent.change(nameInput, { target: { value: 'John Doe' } });
            fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.change(dateOfBirthInput, { target: { value: '2000-01-01' } });
            fireEvent.click(instructorCheckbox);
            const createAccountButton = getByText('Create Account');
            fireEvent.click(createAccountButton);
        });
    });
});
