import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import instructorService from '../../services/instructor.service';
import studentService from '../../services/student.service';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');

    const history = useHistory();

    const handleLogin = () => {
        if (userType === 'instructor') {
            instructorService.loginInstructor({ email, password }).then(res => {
                history.push('/');
            });
        } else {
            studentService.loginStudent({ email, password }).then(res => {
                history.push('/');
            });
        }
    };

    return (
        <div className="login-page">
            <h2>Login Page</h2>
            <div className="user-type-toggle">
                <span className={userType === 'instructor' ? 'active' : ''}>Instructor</span>
                <label htmlFor="switch" className="switch">
                    <input id="switch" name="switch" type="checkbox" onClick={() => setUserType(userType === 'student' ? 'instructor' : 'student')} />
                    <span className="slider round"></span>
                </label>
                <span className={userType === 'student' ? 'active' : ''}>Student</span>
            </div>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
