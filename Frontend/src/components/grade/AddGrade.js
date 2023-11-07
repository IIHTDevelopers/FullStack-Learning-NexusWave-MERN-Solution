import React, { useState, useEffect } from 'react';
import studentService from '../../services/student.service';
import courseService from '../../services/course.service';
import gradeService from '../../services/grade.service';
import { useHistory } from 'react-router-dom';

const AddGrade = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [grade, setGrade] = useState(0);
    const [gradeDate, setGradeDate] = useState('');
    const [comments, setComments] = useState('');
    const history = useHistory();

    useEffect(() => {
        studentService.getAllStudents(localStorage.getItem('id')).then((data) => {
            setStudents(data);
        });
        courseService.getAllCourses().then((data) => {
            setCourses(data);
        });
    }, []);

    const handleAddGrade = () => {
        if (selectedStudent && selectedCourse) {
            const gradeData = {
                studentId: selectedStudent,
                courseId: selectedCourse,
                grade,
                gradeDate,
                comments,
            };
            gradeService.createGradesForStudentInCourse(gradeData).then(() => {
                history.push('/grade');
            });
        } else {
            alert('Please select a student and a course.');
        }
    };

    const handleCancel = () => {
        history.push('/grade');
    };

    return (
        <div className="add-grade">
            <h2>Add Grade For Student</h2>
            <label htmlFor='student'>Select Student</label>
            <select id='student' name='student' value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                <option value="">Select Student</option>
                {students.map((student) => (
                    <option key={student._id} value={student._id}>
                        {student.name}
                    </option>
                ))}
            </select>
            <label htmlFor='course'>Select Course</label>
            <select id='course' name='course' value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">Select Course</option>
                {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                        {course.title}
                    </option>
                ))}
            </select>
            <label htmlFor='grade'>Grade</label>
            <input type="number" id='grade' name='grade' value={grade} onChange={(e) => setGrade(e.target.value)} />
            <label htmlFor='date'>Date</label>
            <input type="date" id='date' name='date' value={gradeDate} onChange={(e) => setGradeDate(e.target.value)} />
            <label htmlFor='comments'>Comments</label>
            <textarea id='comments' name='comments' value={comments} onChange={(e) => setComments(e.target.value)} />
            <button onClick={handleAddGrade}>Add Grade</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default AddGrade;