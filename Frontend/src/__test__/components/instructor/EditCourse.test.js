import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import instructorService from '../../../services/instructor.service';
import EditCourse from '../../../components/instructor/EditCourse';

jest.mock('../../../services/instructor.service');

describe('EditCourseComponent', () => {
    describe('boundary', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('EditCourseComponent boundary EditCourse should handle cancel', async () => {
            const courseData = {
                _id: 'course1',
                title: 'Course 1',
                description: 'Description 1',
                category: 'Category 1',
                instructorId: 'instructor1',
                ratings: [4, 5, 4],
                reviews: [],
                content: [],
            };

            instructorService.getCourse.mockResolvedValue(courseData);

            render(
                <MemoryRouter initialEntries={['/instructor/edit-course/course1']}>
                    <Route path="/instructor/edit-course/:id">
                        <EditCourse />
                    </Route>
                </MemoryRouter>
            );

            await waitFor(() => {
                const cancelButton = screen.getByText('Cancel');
                act(() => {
                    fireEvent.click(cancelButton);
                });

                expect(instructorService.updateCourse).not.toHaveBeenCalled();
            });
        });

        test('EditCourseComponent boundary EditCourse should render course details and handle update', async () => {
            const courseData = {
                _id: 'course1',
                title: 'Course 1',
                description: 'Description 1',
                category: 'Category 1',
                instructorId: 'instructor1',
                ratings: [4, 5, 4],
                reviews: [],
                content: [],
            };

            instructorService.getCourse.mockResolvedValue(courseData);
            instructorService.updateCourse.mockResolvedValue(courseData);

            render(
                <MemoryRouter initialEntries={['/instructor/edit-course/course1']}>
                    <Route path="/instructor/edit-course/:id">
                        <EditCourse />
                    </Route>
                </MemoryRouter>
            );

            await waitFor(() => {
                expect(screen.getByText('Course Details')).toBeTruthy();
                expect(screen.getByLabelText('Title:')).toBeTruthy();
                expect(screen.getByLabelText('Description:')).toBeTruthy();
                expect(screen.getByLabelText('Category:')).toBeTruthy();

                const titleInput = screen.getByLabelText('Title:');
                const descriptionInput = screen.getByLabelText('Description:');
                const categoryInput = screen.getByLabelText('Category:');

                expect(titleInput.getAttribute('value')).toBe(courseData.title);
                expect(descriptionInput.getAttribute('value')).toBe(courseData.description);
                expect(categoryInput.getAttribute('value')).toBe(courseData.category);

                const updatedTitle = 'Updated Title';
                const updatedDescription = 'Updated Description';
                const updatedCategory = 'Updated Category';

                act(() => {
                    fireEvent.change(titleInput, { target: { value: updatedTitle } });
                    fireEvent.change(descriptionInput, { target: { value: updatedDescription } });
                    fireEvent.change(categoryInput, { target: { value: updatedCategory } });

                    const updateButton = screen.getByText('Update');
                    fireEvent.click(updateButton);
                });
            });

            await waitFor(() => {
                expect(instructorService.updateCourse).toHaveBeenCalled();
            });
        });
    });
});
