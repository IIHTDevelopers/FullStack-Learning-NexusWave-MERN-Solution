import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Route, Switch } from 'react-router-dom';
import AllCourses from './AllCourses';
import AddUpdateCourse from './AddUpdateCourse';
import PopularCourses from './PopularCourses';

const Course = () => {
    const isStudent = localStorage.getItem('isStudent');
    return (
        <div>
            <h1>Course</h1>
            <div>
                <ul>
                    <li>
                        <Link to="/courses/all">All courses</Link>
                    </li>
                    <li>
                        <Link to="/courses/popular">Popular courses</Link>
                    </li>
                    {isStudent === 'false' ? (
                        <div>
                            <li>
                                <Link to="/courses/add-update">Add course</Link>
                            </li>
                        </div>
                    ) : (<div></div>)
                    }
                </ul>
                <Switch>
                    <Route path="/courses/add-update/:id?" component={AddUpdateCourse} />
                    <Route path="/courses/add-update" component={AddUpdateCourse} />
                    <Route path="/courses/all" component={AllCourses} />
                    <Route path="/courses/popular" component={PopularCourses} />
                </Switch>
            </div>
        </div>
    );
}

export default Course;
