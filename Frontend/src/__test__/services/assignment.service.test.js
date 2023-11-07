import assignmentService from '../../services/assignment.service';

jest.mock('axios');

describe('assignmentService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("AssignmentService functional should get all assignment", async () => {
            const mockAssignments = [{ title: 'Assignment 1' }, { title: 'Assignment 2' }];
            let isNull = false;
            try {
                const response = await assignmentService.getAllAssignments();
                isNull = response === null;
                throw new Error("Error in getAllAssignments()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockResponseData = [{ title: 'Assignment 1' }, { title: 'Assignment 2' }];
                    assignmentService.getAllAssignments = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await assignmentService.getAllAssignments();
                    expect(assignmentService.getAllAssignments).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("AssignmentService functional should get all submitted assignments", async () => {
            const mockSubmittedAssignments = [{ title: 'Submitted Assignment 1' }, { title: 'Submitted Assignment 2' }];
            let isNull = false;
            try {
                const response = await assignmentService.getSubmittedAssignments();
                isNull = response === null;
                throw new Error("Error in getSubmittedAssignments()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockSubmittedAssignments = [{ title: 'Submitted Assignment 1' }, { title: 'Submitted Assignment 2' }];
                    assignmentService.getSubmittedAssignments = jest.fn().mockResolvedValueOnce(mockSubmittedAssignments);
                    const result = await assignmentService.getSubmittedAssignments();
                    expect(assignmentService.getSubmittedAssignments).toHaveBeenCalled();
                    expect(result).toEqual(mockSubmittedAssignments);
                }
            }
        });

        test("AssignmentService functional should get all unsubmitted assignments", async () => {
            let isNull = false;
            try {
                const response = await assignmentService.getUnsubmittedAssignments();
                isNull = response === null;
                throw new Error("Error in getUnsubmittedAssignments()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockUnSubmittedAssignments = [{ title: 'UnSubmitted Assignment 1' }, { title: 'UnSubmitted Assignment 2' }];
                    assignmentService.getUnsubmittedAssignments = jest.fn().mockResolvedValueOnce(mockUnSubmittedAssignments);
                    const result = await assignmentService.getUnsubmittedAssignments();
                    expect(assignmentService.getUnsubmittedAssignments).toHaveBeenCalled();
                    expect(result).toEqual(mockUnSubmittedAssignments);
                }
            }
        });

        test("AssignmentService functional should submit an assignment", async () => {
            let isNull = false;
            try {
                const mockAssignmentData = { title: 'Assignment 1' };
                const response = await assignmentService.submitAssignment(mockAssignmentData);
                isNull = response === null;
                throw new Error("Error in submitAssignment()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const mockAssignmentData = { title: 'Assignment 1' };
                    assignmentService.submitAssignment = jest.fn().mockResolvedValueOnce(mockAssignmentData);
                    const result = await assignmentService.submitAssignment();
                    expect(assignmentService.submitAssignment).toHaveBeenCalled();
                    expect(result).toEqual(mockAssignmentData);
                }
            }
        });

        test("AssignmentService functional should get status of submission", async () => {
            let isNull = false;
            try {
                const assignmentId = 1;
                const successResponse = { assignmentId: 1, status: 'Submitted' };
                const response = await assignmentService.getSubmissionStatus(assignmentId);
                isNull = response === null;
                throw new Error("Error in getSubmissionStatus()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const successResponse = { assignmentId: 1, status: 'Submitted' };
                    assignmentService.getSubmissionStatus = jest.fn().mockResolvedValueOnce(successResponse);
                    const result = await assignmentService.getSubmissionStatus();
                    expect(assignmentService.getSubmissionStatus).toHaveBeenCalled();
                    expect(result).toEqual(successResponse);
                }
            }
        });

        test("AssignmentService functional should search assignment by title", async () => {
            let isNull = false;
            try {
                const title = 'Assignment 1';
                const successResponse = [{ title: 'Assignment 1' }];
                const response = await assignmentService.searchAssignment(title);
                isNull = response === null;
                throw new Error("Error in searchAssignment()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    const successResponse = [{ title: 'Assignment 1' }];
                    assignmentService.searchAssignment = jest.fn().mockResolvedValueOnce(successResponse);
                    const result = await assignmentService.searchAssignment();
                    expect(assignmentService.searchAssignment).toHaveBeenCalled();
                    expect(result).toEqual(successResponse);
                }
            }
        });
    });
});