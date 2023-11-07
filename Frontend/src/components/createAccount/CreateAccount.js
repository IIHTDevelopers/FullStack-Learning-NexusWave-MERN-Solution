import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import studentService from '../../services/student.service';
import instructorService from '../../services/instructor.service';

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [isInstructor, setIsInstructor] = useState(false);
    const history = useHistory();

    const handleCreateAccount = () => {
        const userType = isInstructor ? 'instructor' : 'student';
        if (userType === 'instructor') {
            instructorService.createInstructor({ name, email, password, dateOfBirth, gender }).then((_) => {
                history.push('/login');
            });
        } else {
            studentService.createStudent({ name, email, password, dateOfBirth, gender }).then((_) => {
                history.push('/login');
            });
        }
    };

    return (
        <div className="create-account-page">
            <h2>Create New Account</h2>
            Name:
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <br />
            Email:
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br />
            Password:
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br />
            Date of Birth
            <input
                type="date"
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <br />
            Gender:
            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={isInstructor}
                    onChange={() => setIsInstructor(!isInstructor)}
                />
                Are you an Instructor?
            </label>
            <br />
            <button onClick={handleCreateAccount}>Create Account</button>
        </div>
    );
}

export default CreateAccount;
