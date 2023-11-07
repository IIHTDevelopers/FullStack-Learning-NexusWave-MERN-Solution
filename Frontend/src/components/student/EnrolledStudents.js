import React, { useState, useEffect } from 'react';
import studentService from '../../services/student.service';

const EnrolledStudents = () => {
    const [students, setStudents] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchEnrolledStudents = () => {
        studentService.getAllStudents(localStorage.getItem('id'))
            .then((data) => {
                setStudents(data);
            })
            .catch((error) => {
                console.error('Error fetching enrolled students:', error);
            });
    };

    const handleSearch = () => {
        if (searchText) {
            studentService.searchStudent(searchText)
                .then((data) => {
                    setStudents(data);
                })
                .catch((error) => {
                    console.error('Error searching students:', error);
                });
        } else {
            fetchEnrolledStudents();
        }
    };

    useEffect(() => {
        fetchEnrolledStudents();
    }, []);

    return (
        <div className="enrolled-students">
            <h2>Enrolled Students</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search students"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>
                        <h3>{student.name}</h3>
                        <p>{student.email}</p>
                        <p>{student.dateOfBirth}</p>
                        <p>{student.gender}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EnrolledStudents;
