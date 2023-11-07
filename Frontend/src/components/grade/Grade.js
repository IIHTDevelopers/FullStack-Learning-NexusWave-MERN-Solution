import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Route, Switch } from 'react-router-dom';
import AddGrade from './AddGrade';
import gradeService from '../../services/grade.service';
import courseService from '../../services/course.service';
import Summary from './Summary';

const Grade = () => {
    const [averageGrade, setAverageGrade] = useState(0);
    const [courseGrades, setCourseGrades] = useState([]);
    const isStudent = localStorage.getItem('isStudent') == 'false';

    useEffect(() => {
        if (isStudent) {
            gradeService.getAllCourseAvg(localStorage.getItem('id')).then((data) => {
                setAverageGrade(data);
            });
        } else {
            courseService.getAllCourses().then((courses) => {
                const coursesWithGradesPromises = courses.map((course) => {
                    return gradeService.getGradesForStudentsInCourse(course._id).then((grades) => ({
                        ...course,
                        grades,
                    }));
                });
                Promise.all(coursesWithGradesPromises).then((coursesWithGrades) => {
                    console.log(coursesWithGrades);
                    setCourseGrades(coursesWithGrades);
                });
            });
        }
    }, [isStudent]);

    return (
        <div>
            <h1>Grade</h1>
            {isStudent ? (
                <div>
                    <div>
                        <ul>
                            <li>
                                <Link to="/grade/add">Add Grade</Link>
                            </li>
                            <li>
                                <Link to="/grade/summary">Grade summary</Link>
                            </li>
                        </ul>
                    </div>
                    <p>Average Grade in All Courses: {averageGrade}</p>
                </div>
            ) : (
                <div>
                    <h2>All Course Assignment with Grades</h2>
                    <ul>
                        {courseGrades.map((course) => (
                            <li key={course._id}>
                                <h3>{course.title}</h3>
                                <p>Course Grade: {course.grades[0]?.grade}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Switch>
                <Route path="/grade/add" component={AddGrade} />
                <Route path="/grade/summary" component={Summary} />
            </Switch>
        </div>
    );
}

export default Grade;
