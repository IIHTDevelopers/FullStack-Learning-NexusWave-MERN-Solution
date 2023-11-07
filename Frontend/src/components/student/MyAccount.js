import React, { useState, useEffect } from 'react';
import studentService from '../../services/student.service';

const MyAccount = () => {
    const [student, setStudent] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [updatedStudent, setUpdatedStudent] = useState({});

    useEffect(() => {
        studentService.getStudent(localStorage.getItem('id'))
            .then((data) => {
                setStudent(data);
                setUpdatedStudent(data);
            });
    }, []);

    const handleEdit = () => {
        setIsEditable(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleUpdate = () => {
        studentService.updateStudent(localStorage.getItem('id'), updatedStudent)
            .then((data) => {
                setStudent(data);
                setIsEditable(false);
            });
    };

    const handleCancel = () => {
        setUpdatedStudent(student);
        setIsEditable(false);
    };

    const handleDelete = () => {
        studentService.deleteStudent(localStorage.getItem('id'))
            .then(() => {
                history.push('/students');
            });
    };

    return (
        <div className="my-account">
            <h2>My Account</h2>
            <div>
                <label htmlFor="name">Name:</label>
                {isEditable ? (
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedStudent.name}
                        onChange={(e) => setUpdatedStudent({ ...updatedStudent, name: e.target.value })}
                    />
                ) : (
                    <span>{student.name}</span>
                )}
            </div>
            <div>
                <label>Email:</label>
                <span>{student.email}</span>
            </div>
            <div>
                <label htmlFor="dob">Date of Birth:</label>
                {isEditable ? (
                    <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formatDate(updatedStudent.dateOfBirth)}
                        onChange={(e) => setUpdatedStudent({ ...updatedStudent, dateOfBirth: e.target.value })}
                    />
                ) : (
                    <span>{student.dateOfBirth}</span>
                )}
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                {isEditable ? (
                    <select
                        id="gender"
                        name="gender"
                        value={updatedStudent.gender}
                        onChange={(e) => setUpdatedStudent({ ...updatedStudent, gender: e.target.value })}
                    >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                ) : (
                    <span>{student.gender}</span>
                )}
            </div>
            {isEditable ? (
                <div>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default MyAccount;
