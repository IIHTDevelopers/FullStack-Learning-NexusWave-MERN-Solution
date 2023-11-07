import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AllCourses from '../../../components/course/AllCourses';
import courseService from '../../../services/course.service';

jest.mock('../../../services/course.service');

describe('AllCoursesComponent', () => {
    describe('boundary', () => {
        const courses = [
            {
                _id: 'course1',
                title: 'Course 1',
                description: 'Description 1',
                category: 'Category 1',
                instructorId: 'Instructor 1',
                ratings: 4.5,
            },
        ];

        beforeEach(() => {
            courseService.getAllCourses.mockResolvedValue(courses);
        });

        test('AllCoursesComponent boundary AllCourses should display search options', async () => {
            render(
                <MemoryRouter>
                    <AllCourses />
                </MemoryRouter>
            );
            const titleInput = screen.getByLabelText('Search by title');
            const categoryInput = screen.getByLabelText('Search by category');
            const ratingInput = screen.getByLabelText('Search by min rating');
            expect(titleInput).toBeTruthy();
            expect(categoryInput).toBeTruthy();
            expect(ratingInput).toBeTruthy();
        });

        test('AllCoursesComponent boundary AllCourses should display course information', async () => {
            render(
                <MemoryRouter>
                    <AllCourses />
                </MemoryRouter>
            );
            await waitFor(() => {
                courses.forEach((course) => {
                    const courseTitle = screen.getByText(course.title);
                    const courseDescription = screen.getByText(course.description);
                    const courseCategory = screen.getByText(course.category);
                    const courseInstructor = screen.getByText(course.instructorId);
                    const courseRatings = screen.getByText(course.ratings.toString());
                    const editLink = screen.getByText('Edit');
                    const deleteButton = screen.getByText('Delete');
                    expect(courseTitle).toBeTruthy();
                    expect(courseDescription).toBeTruthy();
                    expect(courseCategory).toBeTruthy();
                    expect(courseInstructor).toBeTruthy();
                    expect(courseRatings).toBeTruthy();
                    expect(editLink).toBeTruthy();
                    expect(deleteButton).toBeTruthy();
                });
            });
        });
    });
});
