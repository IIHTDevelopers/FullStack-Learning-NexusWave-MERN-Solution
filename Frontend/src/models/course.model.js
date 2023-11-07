class Course {
    constructor({
        title,
        description,
        category,
        instructorId,
        ratings,
        reviews,
        content,
    }) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.instructorId = instructorId;
        this.ratings = ratings || [];
        this.reviews = reviews || [];
        this.content = content || [];
    }
}

export default Course;
