import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Homepage = () => {
    const history = useHistory();
    const isLoggedIn = localStorage.getItem('token');
    const isStudent = localStorage.getItem('isStudent');

    const handleLogout = () => {
        history.push('/');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('isStudent');
    };

    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Homepage</Link>
                </li>
                <li>
                    <Link to="/courses">Courses</Link>
                </li>
                {isLoggedIn ? (
                    <div>
                        <li>
                            <Link to="/assignment">Assignment</Link>
                        </li>
                        <li>
                            <Link to="/students">Students</Link>
                        </li>
                        <div>
                            {isStudent === 'true' ? (<div></div>) : (
                                <li>
                                    <Link to="/instructor">Instructor</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/grade">Grade</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li>
                        </div>
                    </div>
                ) : (
                    <div>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/create-account">Create Account</Link>
                        </li>
                    </div>
                )}
            </ul>
        </div >
    );
};

export default Homepage;
