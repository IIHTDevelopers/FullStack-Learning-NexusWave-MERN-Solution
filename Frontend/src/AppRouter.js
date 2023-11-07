import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import Student from './components/student/Student';
import Course from './components/course/Course';
import Instructor from './components/instructor/Instructor';
import Grade from './components/grade/Grade';
import CreateAccount from './components/createAccount/CreateAccount';
import Login from './components/login/Login';
import AddUpdateCourse from './components/course/AddUpdateCourse';
import AllCourses from './components/course/AllCourses';
import MyAccount from './components/instructor/MyAccount';
import MyStudentAccount from './components/student/MyAccount';
import MyCourses from './components/instructor/MyCourses';
import EditCourse from './components/instructor/EditCourse';
import Assignment from './components/assignment/Assignment';
import EnrolledStudents from './components/student/EnrolledStudents';
import PopularCourses from './components/course/PopularCourses';

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/assignment" component={Assignment} />
                <Route path="/courses" component={Course} />
                <Route path="/courses/add-update" component={AddUpdateCourse} />
                <Route path="/courses/add-update/:id?" component={AddUpdateCourse} />
                <Route path="/courses/all" component={AllCourses} />
                <Route path="/courses/popular" component={PopularCourses} />
                <Route path="/instructor" component={Instructor} />
                <Route path="/instructor/account" component={MyAccount} />
                <Route path="/instructor/courses" component={MyCourses} />
                <Route path="/instructor/courses/all" component={AllCourses} />
                <Route path="/instructor/course_edit" component={EditCourse} />
                <Route path="/grade" component={Grade} />
                <Route path="/students" component={Student} />
                <Route path="/students/me" component={MyStudentAccount} />
                <Route path="/students/enrolled" component={EnrolledStudents} />
                <Route path="/login" exact component={Login} />
                <Route path="/create-account" exact component={CreateAccount} />
                <Route path="/" exact component={Homepage} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default AppRouter;
