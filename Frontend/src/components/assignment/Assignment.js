import React, { useState, useEffect } from 'react';
import assignmentService from '../../services/assignment.service';
import Submission from 'src/models/submission.model';

const Assignment = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            let assignmentData = [];
            if (selectedFilter === 'all') {
                assignmentData = await assignmentService.getAllAssignments();
            } else if (selectedFilter === 'submitted') {
                assignmentData = await assignmentService.getSubmittedAssignments();
            } else if (selectedFilter === 'unsubmitted') {
                const temp = await assignmentService.getUnsubmittedAssignments();
                assignmentData = temp.filter((ass) => ass.submissionCount === 0);
            }
            setAssignments(assignmentData);
        };
        fetchAssignments();
    }, [selectedFilter]);

    const submitHandler = (assigId) => {
        const submitAssignmentData = new Submission({
            assignmentId: assigId,
            studentId: localStorage.getItem('id'),
            submittedAt: new Date().toISOString(),
            status: 'Submitted',
            submittedFiles: [],
            comments: 'submitting assignment ...'
        });
        assignmentService.submitAssignment(submitAssignmentData).then((data) => {
            setSelectedFilter('all');
        });
    };

    const handleSearch = async () => {
        if (searchText) {
            const searchResults = await assignmentService.searchAssignment(searchText);
            setAssignments(searchResults);
        }
    };

    return (
        <div className="assignment">
            <h2>Assignments</h2>
            <div className="filter-dropdown">
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value="all">All Assignments</option>
                    <option value="submitted">Submitted Assignments</option>
                    <option value="unsubmitted">Unsubmitted Assignments</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by Title or Description"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment._id}>
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        <p>Due Date: {assignment.dueDate}</p>
                        <p>Max Points: {assignment.maxPoints}</p>
                        <p>Submission Count: {assignment.submissionCount}</p>
                        {selectedFilter === 'unsubmitted' ? (
                            <div>
                                <button onClick={() => submitHandler(assignment._id)}>Submit Assignment</button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Assignment;
