class Assignment {
    constructor({
        title,
        courseId,
        description,
        dueDate,
        maxPoints,
        submissionCount,
    }) {
        this.title = title;
        this.courseId = courseId;
        this.description = description;
        this.dueDate = dueDate;
        this.maxPoints = maxPoints;
        this.submissionCount = submissionCount;
    }
}

export default Assignment;
