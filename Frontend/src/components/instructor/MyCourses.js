import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import instructorService from '../../services/instructor.service';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        instructorService.getAllCourses(localStorage.getItem('id')).then((data) => {
            instructorService.getCourseInsights(localStorage.getItem('id')).then((insights) => {
                const updatedCourses = data.map((course) => {
                    const matchingInsight = insights.find((insight) => insight.courseTitle === course.title);
                    if (matchingInsight) {
                        return { ...course, averageRating: matchingInsight.averageRating, numStudentsEnrolled: matchingInsight.numStudentsEnrolled };
                    }
                    return course;
                });
            });
            setCourses(data);
        });
    }, []);

    return (
        <div>
            <h2>My Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>{course.category}</p>
                        <p>{course.instructorId}</p>
                        <p>{course.ratings}</p>
                        <p>Average Rating: {course.averageRating}</p>
                        <p>Students Enrolled: {course.numStudentsEnrolled}</p>
                        <Link to={`/instructor/course_edit/${course._id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyCourses;