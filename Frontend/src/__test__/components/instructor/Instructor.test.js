import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import Instructor from '../../../components/instructor/Instructor';
import { fireEvent } from '@testing-library/react';

describe('InstructorComponent', () => {
    describe('boundary', () => {
        test('InstructorComponent boundary renders the Instructor component', () => {
            render(
                <MemoryRouter>
                    <Instructor />
                </MemoryRouter>
            );

            const instructorTitle = screen.getByText('Instructor');
            const myAccountLink = screen.getByText('My Account');
            const myCoursesLink = screen.getByText('My Courses');

            expect(instructorTitle).toBeTruthy();
            expect(myAccountLink).toBeTruthy();
            expect(myCoursesLink).toBeTruthy();
        });
    });
});
