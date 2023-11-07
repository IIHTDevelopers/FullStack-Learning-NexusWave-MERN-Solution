const mongoose = require('mongoose');
const AssignmentServiceImpl = require('../../modules/assignment/service/impl/assignment.serviceImpl');
const Assignment = require('../../modules/assignment/dao/models/assignment.model');
const Submission = require('../../modules/assignment/dao/models/submission.model');
const Student = require('../../modules/student/dao/models/student.model');
const Instructor = require('../../modules/instructor/dao/models/instructor.model');

jest.mock('../../modules/assignment/dao/models/assignment.model');
jest.mock('../../modules/assignment/dao/models/submission.model');

let assignmentServiceBoundaryTest = `AssignmentService functional test`;

describe('Assignment Service', () => {
  let assignmentService;

  beforeEach(() => {
    assignmentService = new AssignmentServiceImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('bussiness', () => {
    it(`${assignmentServiceBoundaryTest} should create a new assignment`, async () => {
      const assignmentData = {
        title: "Sample Assignment",
        courseId: "course_id",
        description: "This is a sample assignment for testing purposes.",
        dueDate: new Date(),
        maxPoints: 100,
        submissionCount: 0,
      };
      Assignment.create.mockResolvedValue(assignmentData);

      const result = await assignmentService.createAssignment(assignmentData);
      expect(result).toEqual(assignmentData);
    });

    it(`${assignmentServiceBoundaryTest} should get assignment by ID`, async () => {
      const assignmentId = 'assignment_id';
      const assignment = {
        _id: assignmentId,
        title: "Sample Assignment",
        courseId: "course_id",
        description: "This is a sample assignment for testing purposes.",
        dueDate: new Date(),
        maxPoints: 100,
        submissionCount: 0,
      };
      Assignment.findById.mockResolvedValue(assignment);

      const result = await assignmentService.getAssignment(assignmentId);
      expect(result).toEqual(assignment);
    });

    it(`${assignmentServiceBoundaryTest} should update assignment by ID`, async () => {
      const assignmentId = 'assignment_id';
      const updatedAssignmentData = {
        title: "Sample Assignment",
        courseId: "course_id",
        description: "This is a sample assignment for testing purposes.",
        dueDate: new Date(),
        maxPoints: 100,
        submissionCount: 0,
      };
      const updatedAssignment = { _id: assignmentId, ...updatedAssignmentData };
      Assignment.findByIdAndUpdate.mockResolvedValue(updatedAssignment);

      const result = await assignmentService.updateAssignment(assignmentId, updatedAssignmentData);
      expect(result).toEqual(updatedAssignment);
    });

    it(`${assignmentServiceBoundaryTest} should delete assignment by ID`, async () => {
      const assignmentId = 'assignment_id';
      const deletedAssignment = {
        _id: assignmentId,
        title: "Sample Assignment",
        courseId: "course_id",
        description: "This is a sample assignment for testing purposes.",
        dueDate: new Date(),
        maxPoints: 100,
        submissionCount: 0,
      };
      Assignment.findByIdAndDelete.mockResolvedValue(deletedAssignment);

      const result = await assignmentService.deleteAssignment(assignmentId);
      expect(result).toEqual(deletedAssignment);
    });

    it(`${assignmentServiceBoundaryTest} should add a new assignment submission`, async () => {

      const submissionData = {
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

      Submission.create.mockResolvedValue(submissionData);

      const result = await assignmentService.submitAssignment(submissionData);
      expect(result).toEqual(submissionData);
    });

    it(`${assignmentServiceBoundaryTest} should get submitted assignment by ID`, async () => {
      const assignmentId = 'assignment_id';
      const submission = {
        _id: 'submission_id',
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
      Submission.find.mockResolvedValue(submission);

      const result = await assignmentService.getSubmission(assignmentId);
      expect(result).toEqual(submission);
    });

    it(`${assignmentServiceBoundaryTest} should get submitted assignment by studentId`, async () => {
      const studentId = 'student_id';
      const assignment = {
        _id: 'submission_id',
        assignmentId: "assignment_id", // Replace with a valid Assignment ObjectId
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
      Submission.find.mockResolvedValue(assignment);

      const result = await assignmentService.getStudentSubmission(studentId);
      expect(result).toEqual(assignment);
    });
    it(`${assignmentServiceBoundaryTest} should delete submitted assignment by ID`, async () => {
      const submissionId = 'submission_id';
      const deletedSubmission = {
        _id: submissionId,
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
      Submission.findByIdAndDelete.mockResolvedValue(deletedSubmission);

      const result = await assignmentService.deleteSubmission(submissionId);
      expect(result).toEqual(deletedSubmission);
    });

    it(`${assignmentServiceBoundaryTest} should search  assignment by title and courseId`, async () => {
      const title = 'Sample Assignment';
      const courseId = "course_id";

      const assignment = {
        title: title,
        courseId: courseId,
        description: "This is a sample assignment for testing purposes.",
        dueDate: new Date(),
        maxPoints: 100,
        submissionCount: 0,
      };
      const query = {};

      if (title) {
        query.title = { $regex: title, $options: 'i' };
      }

      if (courseId) {
        query.courseId = { $regex: courseId, $options: 'i' };
      }

      Assignment.find.mockResolvedValue(assignment);

      const result = await assignmentService.searchAssignment(query);
      expect(result).toEqual(assignment);
    });









    it(`${assignmentServiceBoundaryTest} should throw an error when assignment is not found for getAssignment`, async () => {
      const assignmentId = 'non_existing_id';
      Assignment.findById.mockResolvedValue(null);
      await expect(assignmentService.getAssignment(assignmentId)).rejects.toThrow('Failed to get assignment.');
    });

    it(`${assignmentServiceBoundaryTest} should throw an error when assignment is not found for updateAssignment`, async () => {
      const assignmentId = 'non_existing_id';
      const updatedAssignmentData = {
        title: "Sample Assignment",
        courseId: "course_id",
        description: "This is a sample assignment for testing purposes.",
        dueDate: new Date(),
        maxPoints: 100,
        submissionCount: 0,
      };
      Assignment.findByIdAndUpdate.mockResolvedValue(null);
      await expect(assignmentService.updateAssignment(assignmentId, updatedAssignmentData)).rejects.toThrow('Failed to update assignment.');
    });

    it(`${assignmentServiceBoundaryTest} should throw an error when assignment is not found for deleteAssignment`, async () => {
      const assignmentId = 'non_existing_id';
      Assignment.findByIdAndDelete.mockResolvedValue(null);
      await expect(assignmentService.deleteAssignment(assignmentId)).rejects.toThrow('Failed to delete assignment.');
    });

    it(`${assignmentServiceBoundaryTest} should throw an error when failing to create a assignment`, async () => {
      const assignmentData = {
        title: "Sample Assignment",
        courseId: "course_id",
        description: "This is a sample assignment for testing purposes.",
        dueDate: new Date(),
        maxPoints: 100,
        submissionCount: 0,
      };
      const error = new Error('Failed to create assignment.');
      Assignment.create.mockRejectedValue(error);
      await expect(assignmentService.createAssignment(assignmentData)).rejects.toThrow(error);
    });

    // it(`${assignmentServiceBoundaryTest} should get list of all assignments`, async () => {
    //     const assignment = [
    //       {
    //         title: "Sample Assignment",
    //         courseId: "course_id",
    //         description: "This is a sample assignment for testing purposes.",
    //         dueDate: new Date(), 
    //         maxPoints: 100,
    //         submissionCount: 0,
    //       }
    //     ];
    //     Assignment.find.mockResolvedValue(assignment);

    //     const result = await assignmentService.getAllAssignmentsForInstructorOrStudent();
    //     expect(result).toEqual(assignment);
    // });

    // it(`${assignmentServiceBoundaryTest} should return assignments for an instructor`, async () => {
    //   // Mock the Instructor model's findById method to return an instructor
    //   const instructorMock = {
    //     coursesTaught: [{ courseId: 'course1' }, { courseId: 'course2' }],
    //   };
    //   Instructor.findById = jest.fn().mockResolvedValue(instructorMock);

    //   // Mock the Assignment model's find method to return assignments
    //   const assignmentMock = [{ title: 'Assignment 1' }, { title: 'Assignment 2' }];
    //   Assignment.find = jest.fn().mockResolvedValue(assignmentMock);

    //   // Call the service method with an instructor ID
    //   const instructorId = 'instructorId';
    //   const result = await assignmentService.getAllAssignmentsForInstructorOrStudent(instructorId);

    //   // Expectations
    //   expect(Instructor.findById).toHaveBeenCalledWith(instructorId);
    //   expect(Assignment.find).toHaveBeenCalledWith({ courseId: { $in: ['course1', 'course2'] } });
    //   expect(result).toEqual(assignmentMock);
    // });

    // it(`${assignmentServiceBoundaryTest} should return assignments for a student`, async () => {
    //   // Mock the Student model's findById method to return a student
    //   const studentMock = {
    //     enrolledCourses: [{ courseId: 'course1' }, { courseId: 'course3' }],
    //   };
    //   Student.findById = jest.fn().mockResolvedValue(studentMock);

    //   // Mock the Assignment model's find method to return assignments
    //   const assignmentMock = [{ title: 'Assignment 1' }, { title: 'Assignment 3' }];
    //   Assignment.find = jest.fn().mockResolvedValue(assignmentMock);

    //   // Call the service method with a student ID
    //   const studentId = 'studentId';
    //   const result = await assignmentService.getAllAssignmentsForInstructorOrStudent(studentId);

    //   // Expectations
    //   expect(Student.findById).toHaveBeenCalledWith(studentId);
    //   expect(Assignment.find).toHaveBeenCalledWith({ courseId: { $in: ['course1', 'course2'] } });
    //   expect(result).toEqual(assignmentMock);
    // });

    it(`${assignmentServiceBoundaryTest} should throw an error for an unknown user`, async () => {
      // Mock both Instructor and Student models' findById methods to return null (user not found)
      Instructor.findById = jest.fn().mockResolvedValue(null);
      Student.findById = jest.fn().mockResolvedValue(null);

      // Call the service method with an unknown user ID
      const unknownUserId = 'unknownUserId';

      // Expect the service method to throw an error
      await expect(assignmentService.getAllAssignmentsForInstructorOrStudent(unknownUserId)).rejects.toThrowError('Instructor/Student not found');
    });

    it(`${assignmentServiceBoundaryTest} should throw an error when failing to submitting an assignment`, async () => {
      const submissionData = {
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
      const error = new Error('Failed to submit assignment.');
      Submission.create.mockRejectedValue(error);
      await expect(assignmentService.submitAssignment(submissionData)).rejects.toThrow(error);

      Submission.create.mockResolvedValue(submissionData);
    });

    // it(`${assignmentServiceBoundaryTest} should get list of all submissions`, async () => {
    //   const submission = [
    //     {
    //       assignmentId: "assignment_id", // Replace with a valid Assignment ObjectId
    //       studentId: "student_id", // Replace with a valid Student ObjectId
    //       submittedAt: new Date(), // Submission timestamp in ISO format
    //       status: "Submitted",
    //       submittedFiles: [
    //         {
    //           filename: "file1.txt",
    //           filePath: "/uploads/file1.txt",
    //         }
    //       ],
    //       comments: "This is a sample submission.",
    //     }
    //   ];
    //   Submission.find.mockResolvedValue(submission);

    //   const result = await assignmentService.getAllSubmittedAssignmentsForInstructorOrStudent();
    //   expect(result).toEqual(submission);
    // });

    it(`${assignmentServiceBoundaryTest} should return submitted assignments for an instructor`, async () => {
      // Mock the Instructor model's findById method to return an instructor
      const instructorId = 'instructorId';
      const instructorMock = { _id: instructorId, coursesTaught: [{ courseId: 'course1' }] };
      Instructor.findById = jest.fn().mockResolvedValue(instructorMock);

      // Mock the Assignment and Submission models to return data
      const assignments = [
        { _id: 'assignment1', courseId: 'course1' },
        { _id: 'assignment2', courseId: 'course2' },
      ];
      const assignmentIds = ['assignment1', 'assignment2'];
      const submissions = [
        { assignmentId: 'assignment1', status: 'submitted' },
        { assignmentId: 'assignment2', status: 'submitted' },
      ];

      Assignment.find = jest.fn().mockResolvedValue(assignments);
      Submission.find = jest.fn().mockResolvedValue(submissions);

      // Call the service method with an instructor ID
      const result = await assignmentService.getAllSubmittedAssignmentsForInstructorOrStudent(instructorId);

      // Expectations
      expect(Instructor.findById).toHaveBeenCalledWith(instructorId);
      expect(Assignment.find).toHaveBeenCalledWith({ courseId: { $in: ['course1'] } });
      expect(Submission.find).toHaveBeenCalledWith({ assignmentId: { $in: assignmentIds }, status: 'submitted' });
      expect(result).toEqual(submissions);
    });

    it(`${assignmentServiceBoundaryTest} should throw an error for an unknown instructor`, async () => {
      // Mock the Instructor model's findById method to return null (instructor not found)
      Instructor.findById = jest.fn().mockResolvedValue(null);

      // Call the service method with an unknown instructor ID
      const unknownInstructorId = 'unknownInstructorId';

      // Expect the service method to throw an error
      await expect(assignmentService.getAllSubmittedAssignmentsForInstructorOrStudent(unknownInstructorId)).rejects.toThrowError('Instructor not found');
    });

    it(`${assignmentServiceBoundaryTest} should throw an error when submission is not found for assignmentId`, async () => {
      const assignmentId = 'non_existing_id';
      Submission.find.mockResolvedValue(null);
      await expect(assignmentService.getSubmission(assignmentId)).rejects.toThrow('Failed to get submission.');
    });

    it(`${assignmentServiceBoundaryTest} should throw an error when submission is not found for studentId`, async () => {
      const studentId = 'non_existing_id';
      Submission.find.mockResolvedValue(null);
      await expect(assignmentService.getStudentSubmission(studentId)).rejects.toThrow('Failed to get submission.');
    });

    // it(`${assignmentServiceBoundaryTest} should get submitted assignment`, async () => {
    //   const assignmentId = 'assignment_id';
    //   const assignment = {
    //     _id: assignmentId,
    //     title: "Sample Assignment",
    //     courseId: "course_id",
    //     description: "This is a sample assignment for testing purposes.",
    //     dueDate: new Date(),
    //     maxPoints: 100,
    //     submissionCount: 1,
    //   };
    //   const query = { submissionCount: { $gt: 0 } };

    //   Assignment.find.mockResolvedValue(assignment);

    //   const result = await assignmentService.submittedAssignment(query);
    //   expect(result).toEqual(assignment);
    // });

    // it(`${assignmentServiceBoundaryTest} should return submitted assignment IDs for an instructor`, async () => {
    //   // Mock the Instructor model's findById method to return an instructor
    //   const instructorMock = { _id: 'instructorId' };
    //   Instructor.findById = jest.fn().mockResolvedValue(instructorMock);

    //   // Mock the Assignment and Submission models to return data
    //   const assignments = [
    //     { _id: 'assignment1', courseId: 'course1' },
    //     { _id: 'assignment2', courseId: 'course2' },
    //   ];
    //   const assignmentIds = ['assignment1', 'assignment2'];
    //   const submissions = [
    //     { assignmentId: 'assignment1' },
    //     { assignmentId: 'assignment2' },
    //   ];

    //   Assignment.find = jest.fn().mockResolvedValue(assignments);
    //   Submission.find = jest.fn().mockResolvedValue(submissions);

    //   // Call the service method with an instructor ID
    //   const instructorId = 'instructorId';
    //   const result = await assignmentService.submittedAssignmentByInstructorOrStudent(instructorId);

    //   // Expectations
    //   expect(Instructor.findById).toHaveBeenCalledWith(instructorId);
    //   expect(Assignment.find).toHaveBeenCalledWith({ courseId: { $in: ['course1', 'course2'] } });
    //   expect(Submission.find).toHaveBeenCalledWith({ assignmentId: { $in: assignmentIds } });
    //   expect(result).toEqual(assignmentIds);
    // });

    // it(`${assignmentServiceBoundaryTest} should return submitted assignments for a student`, async () => {
    //   // Mock the Student model's findById method to return a student
    //   const studentMock = { _id: 'studentId' };
    //   Student.findById = jest.fn().mockResolvedValue(studentMock);

    //   // Mock the Submission model to return data
    //   const submissionIds = ['assignment1', 'assignment3'];

    //   Submission.find = jest.fn().mockResolvedValue(submissionIds);

    //   // Mock the Assignment model to return assignments
    //   const assignments = [
    //     { _id: 'assignment1' },
    //     { _id: 'assignment2' },
    //     { _id: 'assignment3' },
    //   ];

    //   Assignment.find = jest.fn().mockResolvedValue(assignments);

    //   // Call the service method with a student ID
    //   const studentId = 'studentId';
    //   const result = await assignmentService.submittedAssignmentByInstructorOrStudent(studentId);

    //   // Expectations
    //   expect(Student.findById).toHaveBeenCalledWith(studentId);
    //   expect(Submission.find).toHaveBeenCalledWith({ id: studentId });
    //   expect(Assignment.find).toHaveBeenCalledWith({ _id: { $in: submissionIds } });
    //   expect(result).toEqual(assignments);
    // });

    it(`${assignmentServiceBoundaryTest} should throw an error for an unknown user`, async () => {
      // Mock both Instructor and Student models' findById methods to return null (user not found)
      Instructor.findById = jest.fn().mockResolvedValue(null);
      Student.findById = jest.fn().mockResolvedValue(null);

      // Call the service method with an unknown user ID
      const unknownUserId = 'unknownUserId';

      // Expect the service method to throw an error
      await expect(assignmentService.submittedAssignmentByInstructorOrStudent(unknownUserId)).rejects.toThrowError('Instructor/Student not found');
    });

    // it(`${assignmentServiceBoundaryTest} should get unsubmitted assignment`, async () => {
    //   const assignmentId = 'assignment_id';
    //   const assignment = {
    //     _id: assignmentId,
    //     title: "Sample Assignment",
    //     courseId: "course_id",
    //     description: "This is a sample assignment for testing purposes.",
    //     dueDate: new Date(),
    //     maxPoints: 100,
    //     submissionCount: 0,
    //   };
    //   const query = { submissionCount: 0 };

    //   Assignment.find.mockResolvedValue(assignment);

    //   const result = await assignmentService.unsubmittedAssignmentByInstructorOrStudent(query);
    //   expect(result).toEqual(assignment);
    // });

    it(`${assignmentServiceBoundaryTest} should return unsubmitted assignments for a student`, async () => {
      // Mock the Student model's findById method to return a student
      const studentMock = { _id: 'studentId' };
      Student.findById = jest.fn().mockResolvedValue(studentMock);

      // Mock the Assignment and Submission models to return data
      const allAssignments = [{ _id: 'assignment1' }, { _id: 'assignment2' }];
      const studentSubmissions = [{ assignmentId: 'assignment1' }];
      Assignment.find = jest.fn().mockResolvedValue(allAssignments);
      Submission.find = jest.fn().mockResolvedValue(studentSubmissions);

      // Call the service method with a student ID
      const studentId = 'studentId';
      const result = await assignmentService.unsubmittedAssignmentByInstructorOrStudent(studentId);

      // Expectations
      expect(Student.findById).toHaveBeenCalledWith(studentId);
      expect(Assignment.find).toHaveBeenCalledWith({});
      expect(Submission.find).toHaveBeenCalledWith({ id: studentId });
      expect(result).toEqual([allAssignments[1]]);
    });

    it(`${assignmentServiceBoundaryTest} should return unsubmitted assignments for an instructor`, async () => {
      // Mock the Instructor model's findById method to return an instructor
      const instructorMock = { _id: 'instructorId', coursesTaught: [{ courseId: 'course1' }] };
      Instructor.findById = jest.fn().mockResolvedValue(instructorMock);

      // Mock the Assignment and Submission models to return data
      const assignments = [
        { _id: 'assignment1', courseId: 'course1' },
        { _id: 'assignment2', courseId: 'course2' },
      ];
      const submissions = [{ assignmentId: 'assignment1' }];
      Assignment.find = jest.fn().mockResolvedValue(assignments);
      Submission.find = jest.fn().mockResolvedValue(submissions);

      // Call the service method with an instructor ID
      const instructorId = 'instructorId';
      const result = await assignmentService.unsubmittedAssignmentByInstructorOrStudent(instructorId);

      // Expectations
      expect(Instructor.findById).toHaveBeenCalledWith(instructorId);
      // expect(Assignment.find).toHaveBeenCalledWith({ courseId: { $in: ['course1'] } });
      // expect(Submission.find).toHaveBeenCalledWith({ assignmentId: { $in: ['assignment1'] } });
      expect(result).toEqual([assignments[1]]);
    });

    it(`${assignmentServiceBoundaryTest} should throw an error for an unknown user`, async () => {
      // Mock both Instructor and Student models' findById methods to return null (user not found)
      Instructor.findById = jest.fn().mockResolvedValue(null);
      Student.findById = jest.fn().mockResolvedValue(null);

      // Call the service method with an unknown user ID
      const unknownUserId = 'unknownUserId';

      // Expect the service method to throw an error
      await expect(assignmentService.unsubmittedAssignmentByInstructorOrStudent(unknownUserId)).rejects.toThrowError('Student/Instructor not found');
    });
  });
});
