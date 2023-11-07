class Instructor {
    constructor({
        name,
        email,
        password,
        dateOfBirth,
        gender,
        coursesTaught,
    }) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.coursesTaught = coursesTaught || [];
    }
}

export default Instructor;
