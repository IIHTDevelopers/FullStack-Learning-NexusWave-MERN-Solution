import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor } from '@testing-library/react';
import assignmentService from '../../../services/assignment.service';
import Assignment from 'src/components/assignment/Assignment';

jest.mock('../../../services/assignment.service');

const mockAssignments = [
    {
        _id: 'assignment1',
        title: 'Assignment One',
        description: 'Description One',
        dueDate: '2023-09-15',
        maxPoints: 100,
        submissionCount: 0,
    },
    {
        _id: 'assignment2',
        title: 'Assignment Two',
        description: 'Description Two',
        dueDate: '2023-09-20',
        maxPoints: 50,
        submissionCount: 3,
    },
];

describe('AssignmentComponent', () => {
    beforeEach(() => {
        assignmentService.getAllAssignments.mockResolvedValue(mockAssignments);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('boundary', () => {
        test('AssignmentComponent boundary should render assignments', async () => {
            const { getByText, getByLabelText } = render(<Assignment />);
            await waitFor(() => {
                expect(getByText('Assignment One')).toBeTruthy();
                expect(getByText('Assignment Two')).toBeTruthy();
                expect(getByText('Description One')).toBeTruthy();
                expect(getByText('Description Two')).toBeTruthy();
                expect(getByText('Due Date: 2023-09-15')).toBeTruthy();
                expect(getByText('Due Date: 2023-09-20')).toBeTruthy();
                expect(getByText('Max Points: 100')).toBeTruthy();
                expect(getByText('Max Points: 50')).toBeTruthy();
                expect(getByText('Submission Count: 0')).toBeTruthy();
                expect(getByText('Submission Count: 3')).toBeTruthy();
            });
        });

        // test('AssignmentComponent boundary should handle assignment submission', async () => {
        //     const submitAssignmentMock = jest.fn();
        //     assignmentService.submitAssignment.mockImplementation(submitAssignmentMock);
        //     const { getByText } = render(<Assignment />);
        //     act(() => {
        //         const submitButton = getByText('Submit Assignment');
        //         fireEvent.click(submitButton);
        //     });
        //     expect(submitAssignmentMock).toHaveBeenCalledTimes(1);
        // });

        test('AssignmentComponent boundary should handle assignment search', async () => {
            assignmentService.searchAssignment.mockResolvedValue([mockAssignments[0]]);
            const { getByText, getByPlaceholderText } = render(<Assignment />);
            const searchInput = getByPlaceholderText('Search by Title or Description');
            const searchButton = getByText('Search');
            fireEvent.change(searchInput, { target: { value: 'Assignment One' } });
            fireEvent.click(searchButton);

            await waitFor(() => {
                expect(assignmentService.searchAssignment).toHaveBeenCalledTimes(1);
                expect(assignmentService.searchAssignment).toHaveBeenCalledWith('Assignment One');
                expect(getByText('Assignment One')).toBeTruthy();
            });
        });
    });
});
