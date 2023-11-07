const AssignmentServiceImpl = require('../service/impl/assignment.serviceImpl');

const assignmentService = new AssignmentServiceImpl();

class AssignmentController {
    async getAllAssignmentsForInstructorOrStudent(req, res) {
        try {
            const assignments = await assignmentService.getAllAssignmentsForInstructorOrStudent(req.user.id);
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of Assignments.' });
        }
    };

    async createAssignment(req, res) {
        try {
            const newAssignment = await assignmentService.createAssignment(req.body);
            res.status(201).json(newAssignment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create assignment.' });
        }
    };

    async getAssignment(req, res) {
        try {
            const assignment = await assignmentService.getAssignment(req.params.id);
            res.json(assignment);
        } catch (error) {
            res.status(404).json({ error: 'Assignment not found.' });
        }
    };

    async updateAssignment(req, res) {
        try {
            const updatedAssignment = await assignmentService.updateAssignment(req.params.id, req.body);
            res.json(updatedAssignment);
        } catch (error) {
            res.status(404).json({ error: 'Assignment not found.' });
        }
    };

    async deleteAssignment(req, res) {
        try {
            const deletedAssignment = await assignmentService.deleteAssignment(req.params.id);
            res.json(deletedAssignment);
        } catch (error) {
            res.status(404).json({ error: 'Assignment not found.' });
        }
    };

    async submitAssignment(req, res) {
        try {
            const newSubmission = await assignmentService.submitAssignment(req.body);
            res.status(201).json(newSubmission);
        } catch (error) {
            res.status(500).json({ error: 'Failed to submit new Assignment.' });
        }
    };
    async getAllSubmittedAssignmentsForInstructorOrStudent(req, res) {
        try {
            const submissions = await assignmentService.getAllSubmittedAssignmentsForInstructorOrStudent(req.user.id);
            res.json(submissions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of submissions.' });
        }
    };

    async getSubmission(req, res) {
        try {
            const submission = await assignmentService.getSubmission(req.params.id);
            res.json(submission);
        } catch (error) {
            res.status(404).json({ error: 'Submission not found.' });
        }
    };

    async getStudentSubmission(req, res) {
        try {
            const submission = await assignmentService.getStudentSubmission(req.params.id);
            res.json(submission);
        } catch (error) {
            res.status(404).json({ error: 'Submission not found.' });
        }
    };

    async deleteSubmission(req, res) {
        try {
            const deletedSubmission = await assignmentService.deleteSubmission(req.params.id);
            res.json(deletedSubmission);
        } catch (error) {
            res.status(404).json({ error: 'Submission not found.' });
        }
    };

    async getSubmissionStatus(req, res) {
        try {
            const submission = await assignmentService.getSubmissionStatus(req.params.id);
            res.json(submission);
        } catch (error) {
            res.status(404).json({ error: 'Submission not found.' });
        }
    };

    async searchAssignment(req, res) {
        try {
            const { title } = req.query;
            const foundAssignment = await assignmentService.searchAssignment(title);
            res.json(foundAssignment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search assignment.' });
        }
    };

    async submittedAssignmentByInstructorOrStudent(req, res) {
        try {
            const assignment = await assignmentService.submittedAssignmentByInstructorOrStudent(req.user.id);
            res.json(assignment);
        } catch (error) {
            res.status(404).json({ error: 'Assignment not found.' });
        }
    };

    async unsubmittedAssignmentByInstructorOrStudent(req, res) {
        try {
            const assignment = await assignmentService.unsubmittedAssignmentByInstructorOrStudent(req.user.id);
            res.json(assignment);
        } catch (error) {
            res.status(404).json({ error: 'Assignment not found.' });
        }
    };
}

module.exports = AssignmentController;