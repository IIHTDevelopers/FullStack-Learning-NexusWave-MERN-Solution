import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AddReview from '../../../components/student/AddReview';
import studentService from '../../../services/student.service';
import courseService from '../../../services/course.service';

jest.mock('../../../services/student.service');
jest.mock('../../../services/course.service');

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
};

Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

const mockCourses = [
    { _id: '1', title: 'Course 1' },
    { _id: '2', title: 'Course 2' },
];

describe('AddReviewComponent', () => {
    beforeEach(() => {
        courseService.getAllCourses.mockResolvedValue(mockCourses);
        studentService.addReview.mockImplementation(() => {
            return Promise.resolve({});
        });
    });

    test('AddReviewComponent boundary should render the course selection field', () => {
        act(() => {
            render(<AddReview />);
        });
        const courseSelect = screen.getByLabelText('Select a Course:');
        expect(courseSelect).toBeTruthy();
    });

    test('AddReviewComponent boundary should render the comment input field', () => {
        act(() => {
            render(<AddReview />);
        });
        const commentTextarea = screen.getByLabelText('Comment:');
        expect(commentTextarea).toBeTruthy();
    });

    test('AddReviewComponent boundary should render the rating input field', () => {
        act(() => {
            render(<AddReview />);
        });
        const ratingInput = screen.getByLabelText('Rating:');
        expect(ratingInput).toBeTruthy();
    });
});
