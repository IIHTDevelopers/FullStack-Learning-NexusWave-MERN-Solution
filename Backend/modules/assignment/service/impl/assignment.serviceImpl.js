const Assignment = require('../../dao/models/assignment.model');
const Submission = require('../../dao/models/submission.model');
const Instructor = require('../../../instructor/dao/models/instructor.model');
const Student = require('../../../student/dao/models/student.model');
const Course = require('../../../course/dao/models/course.model');
const AssignmentService = require('../assignment.service');

class AssignmentServiceImpl extends AssignmentService {
    async getAllAssignmentsForInstructorOrStudent(id) {
        // try {
        //     const assignment = await Assignment.find();
        //     return assignment;
        // } catch (error) {
        //     throw new Error('Failed to get list of assignments.');
        // }
        // throw new Error('Instructor not found');
        try {
            const instructor = await Instructor.findById(id);
            const student = await Student.findById(id);
            if (instructor) {
                const courseIds = instructor.coursesTaught.map(course => course.courseId);
                const assignments = await Assignment.find({ courseId: { $in: courseIds } });
                return assignments;
            } else if (student) {
                const courseIds = student.enrolledCourses.map(course => course.courseId);
                const assignments = await Assignment.find({ courseId: { $in: courseIds } });
                return assignments;
            } else {
                throw new Error('Instructor/Student not found');
            }
        } catch (error) {
            throw error;
        }
    }

    async createAssignment(assignmentData) {
        try {
            const assignment = await Assignment.create(assignmentData);
            return assignment;
        } catch (error) {
            throw new Error('Failed to create assignment.');
        }
    }

    async getAssignment(assignmentId) {
        try {
            const assignment = await Assignment.findById(assignmentId);
            if (!assignment) {
                throw new Error('Assignment not found.');
            }
            return assignment;
        } catch (error) {
            throw new Error('Failed to get assignment.');
        }
    }

    async updateAssignment(assignmentId, updatedAssignment) {
        try {
            const assignment = await Assignment.findByIdAndUpdate(assignmentId, updatedAssignment, { new: true });
            if (!assignment) {
                throw new Error('Assignment not found.');
            }
            return assignment;
        } catch (error) {
            throw new Error('Failed to update assignment.');
        }
    }

    async deleteAssignment(assignmentId) {
        try {
            const assignment = await Assignment.findByIdAndDelete(assignmentId);
            if (!assignment) {
                throw new Error('Assignment not found.');
            }
            return assignment;
        } catch (error) {
            throw new Error('Failed to delete assignment.');
        }
    }

    async submitAssignment(submissionData) {
        try {
            const assignmentId = submissionData.assignmentId;
            const assignment = await Assignment.findById(assignmentId);
            const updatedAssignment = {
                title: assignment.title,
                courseId: assignment.courseId,
                description: assignment.description,
                dueDate: assignment.dueDate,
                maxPoints: assignment.maxPoints,
                submissionCount: assignment.submissionCount + 1,
            };
            const updateAssignment = await Assignment.findByIdAndUpdate(assignmentId, updatedAssignment, { new: true });
            const submission = await Submission.create(submissionData);
            return submission;
        } catch (error) {
            throw new Error('Failed to submit assignment.');
        }
    }

    async getAllSubmittedAssignmentsForInstructorOrStudent(id) {
        // try {
        //     const submission = await Submission.find();
        //     return submission;
        // } catch (error) {
        //     throw new Error('Failed to get list of submissions.');
        // }
        try {
            const instructor = await Instructor.findById(id);
            if (!instructor) {
                throw new Error('Instructor not found');
            }
            const courseIds = instructor.coursesTaught.map(course => course.courseId);
            const assignments = await Assignment.find({ courseId: { $in: courseIds } });
            const assignmentIds = assignments.map(assignment => assignment._id);
            const submittedAssignments = await Submission.find({
                assignmentId: { $in: assignmentIds },
                status: 'submitted',
            });
            return submittedAssignments;
        } catch (error) {
            throw error;
        }
    }

    async getSubmission(assignmentId) {
        try {
            const submission = await Submission.find(assignmentId);
            if (!submission) {
                throw new Error('Submission not found.');
            }
            return submission;
        } catch (error) {
            throw new Error('Failed to get submission.');
        }
    }

    async getStudentSubmission(studentId) {
        try {
            const submission = await Submission.find(studentId);
            if (!submission) {
                throw new Error('Submission not found.');
            }
            return submission;
        } catch (error) {
            throw new Error('Failed to get submission.');
        }
    }

    async deleteSubmission(submissionId) {
        try {
            const submission = await Submission.findByIdAndDelete(submissionId);
            if (!submission) {
                throw new Error('Submission not found.');
            }
            return submission;
        } catch (error) {
            throw new Error('Failed to delete submission.');
        }
    }

    async getSubmissionStatus(submissionId) {
        try {
            const submission = await Submission.findById(submissionId);
            if (!submission) {
                throw new Error('Submission not found.');
            }
            return submission.status;
        } catch (error) {
            throw new Error('Failed to get submission.');
        }
    }

    async searchAssignment(title) {
        try {
            const query = {};
            if (title) {
                query.title = { $regex: title, $options: 'i' };
            }
            const assignment = await Assignment.find(query);
            if (!assignment && assignment.length == 0) {
                throw new Error('Failed to search for assignment by title and courseId.');
            }
            return assignment;
        } catch (error) {
            throw new Error('Failed to search for assignment by title and courseId.');
        }
    }

    async submittedAssignmentByInstructorOrStudent(id) {
        // try {
        //     const query = { submissionCount: { $gt: 0 } };
        //     const assignment = await Assignment.find(query);
        //     if (!assignment) {
        //         throw new Error('Assignment not found.');
        //     }
        //     return assignment;
        // } catch (error) {
        //     throw new Error('Failed to get assignment.');
        // }
        try {
            const instructor = await Instructor.findById(id);
            const student = await Student.findById(id);
            if (instructor) {
                const courseIds = instructor.coursesTaught.map(course => course.courseId);
                const assignments = await Assignment.find({ courseId: { $in: courseIds } });
                const assignmentIds = assignments.map(assignment => assignment._id);
                const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } });
                const submittedAssignmentIds = [...new Set(submissions.map(submission => submission.assignmentId))];
                return submittedAssignmentIds;
                // const courseIds = instructor.coursesTaught.map(course => course.courseId);
                // const assignments = await Assignment.find({ courseId: { $in: courseIds } });
                // const assignmentIds = assignments.map(assignment => assignment._id);
                // const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } });
                // const submittedAssignmentIds = [...new Set(submissions.map(submission => submission.assignmentId))];
                // const submittedCourses = await Course.find({ _id: { $in: submittedAssignmentIds } });
                // return submittedCourses;
            } else if (student) {
                const submissions = await Submission.find({ id });
                const assignmentIds = submissions.map(submission => submission.assignmentId);
                const submittedAssignments = await Assignment.find({ _id: { $in: assignmentIds } });
                return submittedAssignments;
            } else {
                throw new Error('Instructor/Student not found');
            }
        } catch (error) {
            throw error;
        }
    }

    async unsubmittedAssignmentByInstructorOrStudent(id) {
        // try {
        //     const query = { submissionCount: 0 };
        //     const assignment = await Assignment.find(query);
        //     if (!assignment) {
        //         throw new Error('Assignment not found.');
        //     }
        //     return assignment;
        // } catch (error) {
        //     throw new Error('Failed to get assignment.');
        // }
        try {
            const instructor = await Instructor.findById(id);
            const student = await Student.findById(id);
            if (student) {
                const allAssignments = await Assignment.find({});
                const studentSubmissions = await Submission.find({ id });
                const submittedAssignmentIds = studentSubmissions.map(submission => submission.assignmentId);
                const unsubmittedAssignments = allAssignments.filter(assignment => !submittedAssignmentIds.includes(assignment._id));
                return unsubmittedAssignments;
            } else if (instructor) {
                const courseIds = instructor.coursesTaught.map(course => course.courseId);
                const assignments = await Assignment.find({ courseId: { $in: courseIds } });
                const assignmentIds = assignments.map(assignment => assignment._id);
                const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } });
                const submittedAssignmentIds = submissions.map(submission => submission.assignmentId);
                const nonSubmittedAssignments = assignments.filter(assignment => !submittedAssignmentIds.includes(assignment._id));
                return nonSubmittedAssignments;
            } else {
                throw new Error('Student/Instructor not found');
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AssignmentServiceImpl;