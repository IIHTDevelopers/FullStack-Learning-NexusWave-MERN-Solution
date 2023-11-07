import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import instructorService from '../../../services/instructor.service';
import MyCourses from '../../../components/instructor/MyCourses';

jest.mock('../../../services/instructor.service');

describe('MyCourseComponent', () => {
    describe('boundary', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('MyCourseComponent boundary MyCourses should render a list of courses with details', async () => {
            const coursesData = [
                {
                    _id: 'course1',
                    title: 'Course 1',
                    description: 'Description 1',
                    category: 'Category 1',
                    instructorId: 'instructor1',
                    ratings: [4, 5, 4],
                },
                {
                    _id: 'course2',
                    title: 'Course 2',
                    description: 'Description 2',
                    category: 'Category 2',
                    instructorId: 'instructor1',
                    ratings: [5, 4, 5],
                },
            ];

            const insightsData = [
                {
                    courseTitle: 'Course 1',
                    averageRating: 4.33,
                    numStudentsEnrolled: 20,
                },
                {
                    courseTitle: 'Course 2',
                    averageRating: 4.67,
                    numStudentsEnrolled: 15,
                },
            ];

            instructorService.getAllCourses.mockResolvedValue(coursesData);
            instructorService.getCourseInsights.mockResolvedValue(insightsData);

            render(
                <MemoryRouter>
                    <MyCourses />
                </MemoryRouter>
            );

            await waitFor(() => {
                coursesData.forEach((course) => {
                    expect(screen.getByText(course.title)).toBeTruthy();
                    expect(screen.getByText(course.description)).toBeTruthy();
                    expect(screen.getByText(course.category)).toBeTruthy();
                });
            });
        });
    });
});
