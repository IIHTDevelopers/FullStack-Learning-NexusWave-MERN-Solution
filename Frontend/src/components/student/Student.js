import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Route, Switch } from 'react-router-dom';
import MyAccount from './MyAccount';
import EnrolledStudents from './EnrolledStudents';
import AddReview from './AddReview';

const Student = () => {

    const isStudent = localStorage.getItem('isStudent');

    return (
        <div>
            <h1>Student</h1>
            <div>
                <ul>
                    {isStudent === 'true' ? (<div>
                        <li>
                            <Link to="/students/me">My Account</Link>
                        </li>
                        <li>
                            <Link to="/students/add-review">Add Review</Link>
                        </li>
                    </div>) : (
                        <li>
                            <Link to="/students/enrolled">My Enrolled Students</Link>
                        </li>
                    )}
                </ul>
                <Switch>
                    <Route path="/students/me" component={MyAccount} />
                    <Route path="/students/enrolled" component={EnrolledStudents} />
                    <Route path="/students/add-review" component={AddReview} />
                </Switch>
            </div>
        </div>
    );
}

export default Student;
