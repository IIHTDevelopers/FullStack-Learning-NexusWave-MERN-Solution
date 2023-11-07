import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Route, Switch } from 'react-router-dom';
import MyCourses from './MyCourses';
import MyAccount from './MyAccount';
import EditCourse from './EditCourse';

const Instructor = () => {
    return (
        <div>
            <h1>Instructor</h1>
            <div>
                <ul>
                    <li>
                        <Link to="/instructor/account">My Account</Link>
                    </li>
                    <li>
                        <Link to="/instructor/courses">My Courses</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/instructor/account" component={MyAccount} />
                    <Route path="/instructor/courses" component={MyCourses} />
                    <Route path="/instructor/course_edit/:id" component={EditCourse} />
                </Switch>
            </div>
        </div>
    );
}

export default Instructor;
