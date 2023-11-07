class Grade {
    constructor({
        studentId,
        courseId,
        grade,
        gradedBy,
        gradeDate,
        comments,
    }) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.grade = grade;
        this.gradedBy = gradedBy;
        this.gradeDate = gradeDate;
        this.comments = comments;
    }
}

export default Grade;
