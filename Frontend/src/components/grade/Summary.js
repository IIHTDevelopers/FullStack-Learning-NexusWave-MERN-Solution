import React, { useState, useEffect } from 'react';
import studentService from '../../services/student.service';
import gradeService from '../../services/grade.service';
import courseService from '../../services/course.service';

const Summary = () => {
    const [studentGrades, setStudentGrades] = useState([]);
    const [courseGrades, setCourseGrades] = useState([]);

    useEffect(() => {
        studentService.getAllStudents(localStorage.getItem('id')).then((students) => {
            const studentGradesPromises = students.map((student) => {
                return gradeService.getAllGradesForAStudent(student._id).then((grades) => ({
                    studentName: student.name,
                    grades,
                }));
            });

            Promise.all(studentGradesPromises).then((grades) => {
                setStudentGrades(grades);
            });
        });

        courseService.getAllCourses().then((courses) => {
            const courseGradesPromises = courses.map((course) => {
                return gradeService.getGradesForStudentsInCourse(course._id).then((grades) => ({
                    courseName: course.title,
                    grades,
                }));
            });

            Promise.all(courseGradesPromises).then((grades) => {
                setCourseGrades(grades);
            });
        });
    }, []);

    return (
        <div>
            <h1>Summary</h1>
            <div>
                <h2>Student Grades for All Courses</h2>
                <ul>
                    {studentGrades.map((student) => (
                        <li key={student.studentName}>
                            <p>{student.studentName}</p>
                            <p>Grades: {student.grades[0]?.grade}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Course Grades for All Students</h2>
                <ul>
                    {courseGrades.map((course) => (
                        <li key={course.courseName}>
                            <p>{course.courseName}</p>
                            <p>Grades: {course.grades[0]?.grade}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Summary;
