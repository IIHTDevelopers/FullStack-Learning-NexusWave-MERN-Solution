import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import courseService from '../../../services/course.service';
import AddUpdateCourse from '../../../components/course/AddUpdateCourse';

jest.mock('../../../services/course.service');

describe('AddUpdateCourseComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('boundary', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('AddUpdateCourseComponent boundary Should create a new course', async () => {
            const history = createMemoryHistory(); // Create memory history
            courseService.createCourse.mockResolvedValue({ success: true });

            const { getByText, getByPlaceholderText } = render(
                <Router history={history}> {/* Use Router with history */}
                    <AddUpdateCourse />
                </Router>
            );

            const titleInput = getByPlaceholderText('Title');
            const descriptionInput = getByPlaceholderText('Description');
            const categoryInput = getByPlaceholderText('Category');
            const instructorIdInput = getByPlaceholderText('Instructor ID');
            const createButton = getByText('Create');

            fireEvent.change(titleInput, { target: { value: 'New Course Title' } });
            fireEvent.change(descriptionInput, { target: { value: 'New Course Description' } });
            fireEvent.change(categoryInput, { target: { value: 'New Course Category' } });
            fireEvent.change(instructorIdInput, { target: { value: '12345' } });

            fireEvent.click(createButton);

            await waitFor(() => {
                expect(courseService.createCourse).toHaveBeenCalledWith({
                    title: 'New Course Title',
                    description: 'New Course Description',
                    category: 'New Course Category',
                    instructorId: '12345',
                    ratings: [],
                    reviews: [],
                    content: [],
                });
                expect(history.location.pathname).toBe('/courses/all');
            });
        });

        test('AddUpdateCourseComponent boundary Should update course state when input fields change', () => {
            const { getByPlaceholderText } = render(<AddUpdateCourse />, { wrapper: MemoryRouter });
            const titleInput = getByPlaceholderText('Title');
            fireEvent.change(titleInput, { target: { value: 'Updated Course Title' } });
            expect(titleInput.value).toBe('Updated Course Title');
        });
    });
});
