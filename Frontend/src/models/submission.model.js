class Submission {
    constructor({
        assignmentId,
        studentId,
        submittedAt,
        status,
        submittedFiles,
        comments,
    }) {
        this.assignmentId = assignmentId;
        this.studentId = studentId;
        this.submittedAt = submittedAt;
        this.status = status;
        this.submittedFiles = submittedFiles || [];
        this.comments = comments;
    }
}

export default Submission;
