class Student {
    constructor({
        name,
        email,
        password,
        dateOfBirth,
        gender,
        enrolledCourses,
    }) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.enrolledCourses = enrolledCourses || [];
    }
}

export default Student;
