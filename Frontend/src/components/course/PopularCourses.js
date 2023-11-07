import React, { useState, useEffect } from 'react';
import studentService from '../../services/student.service';

const PopularCourses = () => {
    const [popularCourses, setPopularCourses] = useState([]);

    useEffect(() => {
        studentService.getAllPopularCourses().then((data) => {
            setPopularCourses(data);
        });
    }, []);

    return (
        <div>
            <h2>Popular Courses</h2>
            <ul>
                {popularCourses.map((course) => (
                    <li key={course.id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>{course.category}</p>
                        <p>{course.instructorId}</p>
                        <p>{course.ratings}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PopularCourses;
