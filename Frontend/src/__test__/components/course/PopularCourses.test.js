import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PopularCourses from '../../../components/course/PopularCourses';
import studentService from '../../../services/student.service';

jest.mock('../../../services/student.service');

describe('PopularCoursesComponent', () => {
    describe('boundary', () => {
        const mockPopularCourses = [
            {
                id: 'course1',
                title: 'Popular Course 1',
                description: 'Description for Popular Course 1',
                category: 'Category 1',
                instructorId: 'instructor1',
                ratings: 4.5,
            },
            {
                id: 'course2',
                title: 'Popular Course 2',
                description: 'Description for Popular Course 2',
                category: 'Category 2',
                instructorId: 'instructor2',
                ratings: 4.0,
            },
        ];

        beforeEach(() => {
            studentService.getAllPopularCourses.mockResolvedValue(mockPopularCourses);
        });

        test('PopularCoursesComponent boundary PopularCourses should display popular course information', async () => {
            render(<PopularCourses />);
            await waitFor(() => {
                mockPopularCourses.forEach((course) => {
                    const courseTitle = screen.getByText(course.title);
                    const courseDescription = screen.getByText(course.description);
                    const courseCategory = screen.getByText(course.category);
                    const courseInstructor = screen.getByText(course.instructorId);
                    const courseRatings = screen.getByText(course.ratings.toString());
                    expect(courseTitle).toBeTruthy();
                    expect(courseDescription).toBeTruthy();
                    expect(courseCategory).toBeTruthy();
                    expect(courseInstructor).toBeTruthy();
                    expect(courseRatings).toBeTruthy();
                });
            });
        });
    });
});
