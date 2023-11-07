import React, { useState, useEffect } from 'react';
import instructorService from '../../services/instructor.service';
import { useParams, useHistory } from 'react-router-dom';
import Instructor from '../../models/instructor.model';

const MyAccount = () => {
    const history = useHistory();
    const [instructor, setInstructor] = useState(new Instructor({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        coursesTaught: [],
    }));
    const [isEditable, setIsEditable] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    useEffect(() => {
        instructorService.getInstructor(localStorage.getItem('id')).then((data) => {
            setInstructor(new Instructor({
                name: data.name,
                email: data.email,
                password: data.password,
                dateOfBirth: formatDate(data.dateOfBirth),
                gender: data.gender,
                coursesTaught: data.coursesTaught,
            }));
        });
    }, []);

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleSave = () => {
        instructorService.updateInstructor(localStorage.getItem('id'), instructor).then(() => {
            history.push('/instructor');
        });
    };

    const handleDelete = () => {
        instructorService.deleteInstructor(localStorage.getItem('id')).then(() => {
            history.push('/instructor');
        });
    };

    return (
        <div className="my-account">
            <h2>My Account</h2>
            <form>
                <label htmlFor='name'>Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={instructor.name}
                    readOnly={!isEditable}
                    onChange={(e) => setInstructor({ ...instructor, name: e.target.value })}
                />
                <label htmlFor='email'>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={instructor.email}
                    readOnly={!isEditable}
                    onChange={(e) => setInstructor({ ...instructor, email: e.target.value })}
                />
                <label htmlFor='password'>Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={instructor.password}
                    readOnly={!isEditable}
                    onChange={(e) => setInstructor({ ...instructor, password: e.target.value })}
                />
                <label htmlFor='dob'>Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={instructor.dateOfBirth}
                    readOnly={!isEditable}
                    onChange={(e) => setInstructor({ ...instructor, dateOfBirth: e.target.value })}
                />
                <label htmlFor='gender'>Gender:</label>
                <select
                    id='gender'
                    name='gender'
                    value={instructor.gender}
                    readOnly={!isEditable}
                    onChange={(e) => setInstructor({ ...instructor, gender: e.target.value })}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </form>
            {isEditable ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
            <button onClick={handleDelete}>Delete my account</button>
        </div>
    );
}

export default MyAccount;
