class AssignmentService {
    async getAllAssignmentsForInstructorOrStudent(id) { }
    async createAssignment(assignmentData) { }
    async getAssignment(assignmentId) { }
    async updateAssignment(assignmentId, updatedAssignment) { }
    async deleteAssignment(assignmentId) { }
    async submitAssignment(submissionData) { }
    async getAllSubmittedAssignmentsForInstructorOrStudent(id) { }
    async getSubmission(assignmentId) { }
    async getStudentSubmission(studentId) { }
    async deleteSubmission(deleteSubmission) { }
    async getSubmissionStatus(submissionId) { }
    async searchAssignment(title) { }
    async submittedAssignmentByInstructorOrStudent(id) { }
    async unsubmittedAssignmentByInstructorOrStudent(id) { }
}

module.exports = AssignmentService;