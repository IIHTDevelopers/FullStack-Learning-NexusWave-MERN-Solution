import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Student from '../../../components/student/Student';

const getItem = jest.fn();

beforeEach(() => {
    Object.defineProperty(global, 'localStorage', {
        value: { getItem },
    });
});

describe('StudentComponent', () => {
    describe('boundary', () => {
        test('StudentComponent boundary renders My Account and Add Review links when isStudent is true', () => {
            getItem.mockReturnValue('true');
            render(
                <BrowserRouter>
                    <Student />
                </BrowserRouter>
            );
            const myAccountLink = screen.getByText('My Account');
            const addReviewLink = screen.getByText('Add Review');
            const enrolledStudentsLink = screen.queryByText('My Enrolled Students');
            expect(myAccountLink).toBeTruthy();
            expect(addReviewLink).toBeTruthy();
            expect(enrolledStudentsLink).not.toBeTruthy();
        });

        test('StudentComponent boundary renders My Enrolled Students link when isStudent is false', () => {
            getItem.mockReturnValue('false');
            render(
                <BrowserRouter>
                    <Student />
                </BrowserRouter>
            );
            const enrolledStudentsLink = screen.getByText('My Enrolled Students');
            const myAccountLink = screen.queryByText('My Account');
            const addReviewLink = screen.queryByText('Add Review');
            expect(enrolledStudentsLink).toBeTruthy();
            expect(myAccountLink).not.toBeTruthy();
            expect(addReviewLink).not.toBeTruthy();
        });
    });
});