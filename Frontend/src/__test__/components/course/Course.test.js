import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Course from '../../../components/course/Course';

describe('CourseComponent', () => {
    describe('boundary', () => {
        test('CourseComponent boundary should render the Course component with the title', () => {
            render(
                <Router>
                    <Course />
                </Router>
            );
            expect(screen.getByText('Course')).toBeTruthy();
        });

        test('CourseComponent boundary should render the "All courses" link with the correct URL', () => {
            render(
                <Router>
                    <Course />
                </Router>
            );
            const allCoursesLink = screen.getByText('All courses');
            expect(allCoursesLink).toBeTruthy();
            const hrefAttribute = allCoursesLink.getAttribute('href');
            expect(hrefAttribute).toBe('/courses/all');
        });

        test('CourseComponent boundary should render the "Popular courses" link with the correct URL', () => {
            render(
                <Router>
                    <Course />
                </Router>
            );
            const popularCoursesLink = screen.getByText('Popular courses');
            expect(popularCoursesLink).toBeTruthy();
            const hrefAttribute = popularCoursesLink.getAttribute('href');
            expect(hrefAttribute).toBe('/courses/popular');
        });

        test('CourseComponent boundary should render the "Add course" link with the correct URL when the user is not a student', () => {
            localStorage.setItem('isStudent', 'false');
            render(
                <Router>
                    <Course />
                </Router>
            );
            const addCourseLink = screen.getByText('Add course');
            expect(addCourseLink).toBeTruthy();
            const hrefAttribute = addCourseLink.getAttribute('href');
            expect(hrefAttribute).toBe('/courses/add-update');
        });

        test('CourseComponent boundary should not render the "Add course" link when the user is a student', () => {
            localStorage.setItem('isStudent', 'true');
            render(
                <Router>
                    <Course />
                </Router>
            );
            const addCourseLink = screen.queryByText('Add course');
            expect(addCourseLink).toBeNull();
        });
    });
});
