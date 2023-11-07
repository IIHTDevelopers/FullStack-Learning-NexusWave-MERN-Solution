const request = require('supertest');
const express = require('express');
const router = require('../../modules/assignment/routes/assignment.routes');

const AssignmentController = require('../../modules/assignment/controller/assignment.controller');
const AssignmentServiceImpl = require('../../modules/assignment/service/impl/assignment.serviceImpl');

const authMiddleware = require('../../modules/middleware/authUserMiddleware');

const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use(router);

jest.mock('../../modules/assignment/service/impl/assignment.serviceImpl');

let assignmentControllerBoundaryTest = `AssignmentController boundary test`;

describe('Assignment Controller', () => {
    describe('boundary', () => {
        // it(`${assignmentControllerBoundaryTest} should retrieve all enrolled assignments`, async () => {
        //     const mockAssignmentResult = [{
        //         title: "Sample Assignment",
        //         courseId: "course_id",
        //         description: "This is a sample assignment for testing purposes.",
        //         dueDate: new Date(),
        //         maxPoints: 100,
        //         submissionCount: 0,
        //     }];
        //     const mReq = {
        //     };
        //     const mRes = {
        //         json: jest.fn(),
        //     };
        //     const mNext = jest.fn();
        //     AssignmentServiceImpl.prototype.getAllAssignmentsForInstructorOrStudent.mockResolvedValueOnce(mockAssignmentResult);
        //     await new AssignmentController().getAllAssignmentsForInstructorOrStudent(mReq, mRes, mNext);
        //     expect(AssignmentServiceImpl.prototype.getAllAssignmentsForInstructorOrStudent).toHaveBeenCalledWith();
        //     expect(mRes.json).toHaveBeenCalledWith(mockAssignmentResult);
        //     expect(mNext).not.toHaveBeenCalled();
        // });

        it(`${assignmentControllerBoundaryTest} should retrieve all assignments for instructor`, async () => {
            const instructorId = 'instructor_id'; // Replace with a valid instructor ID
            const mockAssignmentResult = [
                {
                    title: "Sample Assignment",
                    courseId: "course_id",
                    description: "This is a sample assignment for testing purposes.",
                    dueDate: new Date(),
                    maxPoints: 100,
                    submissionCount: 0,
                },
            ];
            const mReq = {
                params: { id: instructorId },
                user: {
                    id: instructorId,
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getAllAssignmentsForInstructorOrStudent.mockResolvedValueOnce(
                mockAssignmentResult
            );

            await new AssignmentController().getAllAssignmentsForInstructorOrStudent(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getAllAssignmentsForInstructorOrStudent).toHaveBeenCalledWith(instructorId);
            expect(mRes.json).toHaveBeenCalledWith(mockAssignmentResult);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should retrieve all assignments for student`, async () => {
            const studentId = 'student_id'; // Replace with a valid student ID
            const mockAssignmentResult = [
                {
                    title: "Sample Assignment",
                    courseId: "course_id",
                    description: "This is a sample assignment for testing purposes.",
                    dueDate: new Date(),
                    maxPoints: 100,
                    submissionCount: 0,
                },
            ];
            const mReq = {
                params: { id: studentId },
                user: {
                    id: studentId,
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getAllAssignmentsForInstructorOrStudent.mockResolvedValueOnce(
                mockAssignmentResult
            );

            await new AssignmentController().getAllAssignmentsForInstructorOrStudent(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getAllAssignmentsForInstructorOrStudent).toHaveBeenCalledWith(
                studentId
            );
            expect(mRes.json).toHaveBeenCalledWith(mockAssignmentResult);
            expect(mNext).not.toHaveBeenCalled();
        });

        // it(`${assignmentControllerBoundaryTest} should handle error for invalid instructor/student`, async () => {
        //     const invalidId = 'invalid_id'; // Replace with an invalid ID
        //     const mReq = {
        //         params: { id: invalidId },
        //         user: {
        //             id: invalidId,
        //         },
        //     };
        //     const mRes = {
        //         json: jest.fn(),
        //         status: jest.fn().mockReturnThis(),
        //     };
        //     const mNext = jest.fn();

        //     AssignmentServiceImpl.prototype.getAllAssignmentsForInstructorOrStudent.mockRejectedValueOnce(
        //         new Error('Instructor/Student not found')
        //     );

        //     await new AssignmentController().getAllAssignmentsForInstructorOrStudent(mReq, mRes, mNext);

        //     expect(AssignmentServiceImpl.prototype.getAllAssignmentsForInstructorOrStudent).toHaveBeenCalledWith(
        //         invalidId
        //     );
        //     expect(mRes.json).not.toHaveBeenCalled();
        //     expect(mNext).toHaveBeenCalledWith(new Error('Instructor/Student not found'));
        // });

        it(`${assignmentControllerBoundaryTest} should create a new assignment`, async () => {
            const mReq = {
                title: "Sample Assignment",
                courseId: "course_id",
                description: "This is a sample assignment for testing purposes.",
                dueDate: new Date(),
                maxPoints: 100,
                submissionCount: 0,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockAssignment = {
                _id: 'mockAssignmentId',
                ...mReq.body,
            };

            AssignmentServiceImpl.prototype.createAssignment.mockResolvedValueOnce(mockAssignment);

            await new AssignmentController().createAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.createAssignment).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should retrieve a assignment by ID`, async () => {
            const assignmentId = 'mockAssignmentId';
            const mockAssignment = {
                _id: 'mockAssignmentId',
                title: "Sample Assignment",
                courseId: "course_id",
                description: "This is a sample assignment for testing purposes.",
                dueDate: new Date(),
                maxPoints: 100,
                submissionCount: 0,
            };

            const mReq = {
                params: { id: assignmentId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getAssignment.mockResolvedValueOnce(mockAssignment);

            await new AssignmentController().getAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getAssignment).toHaveBeenCalledWith(assignmentId);
            expect(mRes.json).toHaveBeenCalledWith(mockAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should update a assignment by ID`, async () => {
            const assignmentId = 'mockAssignmentId';
            const updatedAssignmentData = {
                title: "Sample Assignment",
                courseId: "course_id",
                description: "This is a sample assignment for testing purposes.",
                dueDate: new Date(),
                maxPoints: 100,
                submissionCount: 0,
            };
            const updatedAssignment = {
                _id: assignmentId,
                ...updatedAssignmentData,
            };

            const mReq = {
                params: { id: assignmentId },
                body: updatedAssignmentData,
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.updateAssignment.mockResolvedValueOnce(updatedAssignment);

            await new AssignmentController().updateAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.updateAssignment).toHaveBeenCalledWith(assignmentId, updatedAssignmentData);
            expect(mRes.json).toHaveBeenCalledWith(updatedAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should delete a assignment by ID`, async () => {
            const assignmentId = 'mockAssignmentId';
            const deletedAssignment = {
                _id: assignmentId,
                title: "Sample Assignment",
                courseId: "course_id",
                description: "This is a sample assignment for testing purposes.",
                dueDate: new Date(),
                maxPoints: 100,
                submissionCount: 0,
            };

            const mReq = {
                params: { id: assignmentId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.deleteAssignment.mockResolvedValueOnce(deletedAssignment);

            await new AssignmentController().deleteAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.deleteAssignment).toHaveBeenCalledWith(assignmentId);
            expect(mRes.json).toHaveBeenCalledWith(deletedAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should add a new assignment submission`, async () => {
            const mReq = {
                assignmentId: "assignment_id", // Replace with a valid Assignment ObjectId
                studentId: "student_id", // Replace with a valid Student ObjectId
                submittedAt: new Date(), // Submission timestamp in ISO format
                status: "Submitted",
                submittedFiles: [
                    {
                        filename: "file1.txt",
                        filePath: "/uploads/file1.txt",
                    }
                ],
                comments: "This is a sample submission.",
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockAssignment = {
                _id: 'mockSubmissionId',
                ...mReq.body,
            };

            AssignmentServiceImpl.prototype.createAssignment.mockResolvedValueOnce(mockAssignment);

            await new AssignmentController().createAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.createAssignment).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        // it(`${assignmentControllerBoundaryTest} should retrieve all submission assignments`, async () => {

        //     const mockAssignmentResult = [{
        //         assignmentId: "assignment_id", // Replace with a valid Assignment ObjectId
        //         studentId: "student_id", // Replace with a valid Student ObjectId
        //         submittedAt: new Date(), // Submission timestamp in ISO format
        //         status: "Submitted",
        //         submittedFiles: [
        //             {
        //                 filename: "file1.txt",
        //                 filePath: "/uploads/file1.txt",
        //             }
        //         ],
        //         comments: "This is a sample submission.",
        //     }];
        //     const mReq = {
        //         user: {
        //             id: "student_id",
        //         },
        //     };
        //     const mRes = {
        //         json: jest.fn(),
        //     };
        //     const mNext = jest.fn();

        //     AssignmentServiceImpl.prototype.getAllSubmissions.mockResolvedValueOnce(mockAssignmentResult);

        //     await new AssignmentController().getAllSubmissions(mReq, mRes, mNext);

        //     expect(AssignmentServiceImpl.prototype.getAllSubmissions).toHaveBeenCalledWith();
        //     expect(mRes.json).toHaveBeenCalledWith(mockAssignmentResult);
        //     expect(mNext).not.toHaveBeenCalled();
        // });

        it(`${assignmentControllerBoundaryTest} should retrieve a submission by assignmentId`, async () => {
            const assignmentId = 'mockAssignmentId';
            const mockAssignment = {
                assignmentId: "mockAssignmentId", // Replace with a valid Assignment ObjectId
                studentId: "student_id", // Replace with a valid Student ObjectId
                submittedAt: new Date(), // Submission timestamp in ISO format
                status: "Submitted",
                submittedFiles: [
                    {
                        filename: "file1.txt",
                        filePath: "/uploads/file1.txt",
                    }
                ],
                comments: "This is a sample submission.",
            };

            const mReq = {
                params: { id: assignmentId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getSubmission.mockResolvedValueOnce(mockAssignment);

            await new AssignmentController().getSubmission(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getSubmission).toHaveBeenCalledWith(assignmentId);
            expect(mRes.json).toHaveBeenCalledWith(mockAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should retrieve a submission by studentId`, async () => {
            const studentId = 'student_id';
            const mockAssignment = {
                assignmentId: "assignmentId", // Replace with a valid Assignment ObjectId
                studentId: studentId, // Replace with a valid Student ObjectId
                submittedAt: new Date(), // Submission timestamp in ISO format
                status: "Submitted",
                submittedFiles: [
                    {
                        filename: "file1.txt",
                        filePath: "/uploads/file1.txt",
                    }
                ],
                comments: "This is a sample submission.",
            };

            const mReq = {
                params: { id: studentId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getStudentSubmission.mockResolvedValueOnce(mockAssignment);

            await new AssignmentController().getStudentSubmission(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getStudentSubmission).toHaveBeenCalledWith(studentId);
            expect(mRes.json).toHaveBeenCalledWith(mockAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should delete a submitted assignment by ID`, async () => {
            const submissionId = 'mockSubmissionId';
            const deletedSubmission = {
                _id: submissionId,
                assignmentId: "assignmentId", // Replace with a valid Assignment ObjectId
                studentId: 'student_id', // Replace with a valid Student ObjectId
                submittedAt: new Date(), // Submission timestamp in ISO format
                status: "Submitted",
                submittedFiles: [
                    {
                        filename: "file1.txt",
                        filePath: "/uploads/file1.txt",
                    }
                ],
                comments: "This is a sample submission.",
            };

            const mReq = {
                params: { id: submissionId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.deleteSubmission.mockResolvedValueOnce(deletedSubmission);

            await new AssignmentController().deleteSubmission(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.deleteSubmission).toHaveBeenCalledWith(submissionId);
            expect(mRes.json).toHaveBeenCalledWith(deletedSubmission);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should retrieve a submission status by id`, async () => {
            const submissionId = 'mockSubmissionId';
            const mockAssignment = {
                _id: submissionId,
                assignmentId: "mockAssignmentId", // Replace with a valid Assignment ObjectId
                studentId: "student_id", // Replace with a valid Student ObjectId
                submittedAt: new Date(), // Submission timestamp in ISO format
                status: "Submitted",
                submittedFiles: [
                    {
                        filename: "file1.txt",
                        filePath: "/uploads/file1.txt",
                    }
                ],
                comments: "This is a sample submission.",
            };

            const mReq = {
                params: { id: submissionId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getSubmissionStatus.mockResolvedValueOnce(mockAssignment.status);

            await new AssignmentController().getSubmissionStatus(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getSubmissionStatus).toHaveBeenCalledWith(submissionId);
            expect(mRes.json).toHaveBeenCalledWith(mockAssignment.status);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should search for a assignment  by title and courseId`, async () => {
            const title = 'Sample Assignment';
            const courseId = 'course_id';

            const mockAssignment = {
                title: title,
                courseId: courseId,
                description: "This is a sample assignment for testing purposes.",
                dueDate: new Date(),
                maxPoints: 100,
                submissionCount: 0,
            };

            const mReq = {
                query: { title: title, courseId: courseId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.searchAssignment.mockResolvedValueOnce(mockAssignment);

            await new AssignmentController().searchAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.searchAssignment).toHaveBeenCalledWith(title, courseId);
            expect(mRes.json).toHaveBeenCalledWith(mockAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        // it(`${assignmentControllerBoundaryTest} should retrieve a submittedAssignmentByInstructorOrStudent `, async () => {
        //     const mockAssignment = {
        //         _id: 'mockAssignmentId',
        //         title: "Sample Assignment",
        //         courseId: "course_id",
        //         description: "This is a sample assignment for testing purposes.",
        //         dueDate: new Date(),
        //         maxPoints: 100,
        //         submissionCount: 1,
        //     };
        //     const mReq = {
        //         user: {
        //             id: "student_id",
        //         },
        //     };
        //     const mRes = {
        //         json: jest.fn(),
        //     };
        //     const mNext = jest.fn();
        //     const assignmentServiceImplInstance = new AssignmentServiceImpl(); // Create an instance
        //     jest.spyOn(assignmentServiceImplInstance, 'submittedAssignmentByInstructorOrStudent').mockResolvedValueOnce(mockAssignment);
        //     await new AssignmentController().submittedAssignmentByInstructorOrStudent(mReq, mRes, mNext);
        //     // AssignmentServiceImpl.prototype.submittedAssignmentByInstructorOrStudent.mockResolvedValueOnce(mockAssignment);
        //     // await new AssignmentController().submittedAssignmentByInstructorOrStudent(mReq, mRes, mNext);
        //     expect(AssignmentServiceImpl.prototype.submittedAssignment).toHaveBeenCalledWith("student_id");
        //     expect(mRes.json).toHaveBeenCalledWith(mockAssignment);
        //     expect(mNext).not.toHaveBeenCalled();
        // });

        it(`${assignmentControllerBoundaryTest} should retrieve a unsubmittedAssignmentByInstructorOrStudent `, async () => {
            const mockAssignment = {
                _id: 'mockAssignmentId',
                title: "Sample Assignment",
                courseId: "course_id",
                description: "This is a sample assignment for testing purposes.",
                dueDate: new Date(),
                maxPoints: 100,
                submissionCount: 0,
            };
            const mReq = {
                user: {
                    id: "student_id",
                },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();
            AssignmentServiceImpl.prototype.unsubmittedAssignmentByInstructorOrStudent.mockResolvedValueOnce(mockAssignment);
            await new AssignmentController().unsubmittedAssignmentByInstructorOrStudent(mReq, mRes, mNext);
            expect(AssignmentServiceImpl.prototype.unsubmittedAssignmentByInstructorOrStudent).toHaveBeenCalledWith("student_id");
            expect(mRes.json).toHaveBeenCalledWith(mockAssignment);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should return a 404 error when getting a assignment with invalid ID`, async () => {
            const assignmentId = 'invalidAssignmentId';

            const mReq = {
                params: { id: assignmentId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getAssignment.mockRejectedValueOnce(new Error('Assignment not found.'));

            await new AssignmentController().getAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getAssignment).toHaveBeenCalledWith(assignmentId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Assignment not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should return a 404 error when updating a assignment with invalid ID`, async () => {
            const assignmentId = 'invalidAssignmentId';
            const updatedAssignmentData = {
                title: "Sample Assignment",
                courseId: "course_id",
                description: "This is a sample assignment for testing purposes.",
                dueDate: new Date(),
                maxPoints: 100,
                submissionCount: 0,
            };

            const mReq = {
                params: { id: assignmentId },
                body: updatedAssignmentData,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.updateAssignment.mockRejectedValueOnce(new Error('Assignment not found.'));

            await new AssignmentController().updateAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.updateAssignment).toHaveBeenCalledWith(assignmentId, updatedAssignmentData);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Assignment not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should return a 404 error when deleting a assignment with invalid ID`, async () => {
            const assignmentId = 'invalidAssignmentId';

            const mReq = {
                params: { id: assignmentId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.deleteAssignment.mockRejectedValueOnce(new Error('Assignment not found.'));

            await new AssignmentController().deleteAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.deleteAssignment).toHaveBeenCalledWith(assignmentId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Assignment not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should return a 500 error when creating a assignment fails`, async () => {
            const mReq = {
                body: {
                    title: "Sample Assignment",
                    courseId: "course_id",
                    description: "This is a sample assignment for testing purposes.",
                    dueDate: new Date(),
                    maxPoints: 100,
                    submissionCount: 0,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Failed to create assignment.');
            AssignmentServiceImpl.prototype.createAssignment.mockRejectedValueOnce(error);

            await new AssignmentController().createAssignment(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.createAssignment).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create assignment.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should return a 404 error when getting a submitted assignment with invalid ID`, async () => {
            const assignmentId = 'invalidAssignmentId';

            const mReq = {
                params: { id: assignmentId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getSubmission.mockRejectedValueOnce(new Error('Submission not found.'));

            await new AssignmentController().getSubmission(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getSubmission).toHaveBeenCalledWith(assignmentId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Submission not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should return a 404 error when getting a submitted assignment with invalid ID`, async () => {
            const studentId = 'non_student_id';

            const mReq = {
                params: { id: studentId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getStudentSubmission.mockRejectedValueOnce(new Error('Submission not found.'));

            await new AssignmentController().getStudentSubmission(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getStudentSubmission).toHaveBeenCalledWith(studentId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Submission not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should return a 404 error when deleting a submitted assignment with invalid ID`, async () => {
            const submissionId = 'invalidSubmissionId';

            const mReq = {
                params: { id: submissionId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.deleteSubmission.mockRejectedValueOnce(new Error('Submission not found.'));

            await new AssignmentController().deleteSubmission(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.deleteSubmission).toHaveBeenCalledWith(submissionId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Submission not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${assignmentControllerBoundaryTest} should return a 404 error when getting a submitted assignments status with invalid ID`, async () => {
            const submissionId = 'invalidSubmissionId';

            const mReq = {
                params: { id: submissionId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            AssignmentServiceImpl.prototype.getSubmissionStatus.mockRejectedValueOnce(new Error('Submission not found.'));

            await new AssignmentController().getSubmissionStatus(mReq, mRes, mNext);

            expect(AssignmentServiceImpl.prototype.getSubmissionStatus).toHaveBeenCalledWith(submissionId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Submission not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });




    });
});
