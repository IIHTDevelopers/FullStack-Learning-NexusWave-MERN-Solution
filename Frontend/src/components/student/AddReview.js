import React, { useState, useEffect } from 'react';
import studentService from '../../services/student.service';
import courseService from '../../services/course.service';

const AddReview = () => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        courseService.getAllCourses().then((data) => {
            setCourses(data);
        });
    }, []);

    const handleAddReview = () => {
        if (!courseId) {
            return;
        }

        const reviewData = {
            studentId: localStorage.getItem('id'),
            comment,
            rating,
            courseId,
        };

        studentService.addReview(reviewData).then((data) => {
            setComment('');
            setRating(1);
            setCourseId('');
        });
    };

    return (
        <div className="add-review">
            <h2>Add Your Review</h2>
            <div>
                <label htmlFor="course-select">Select a Course:</label>
                <select
                    id="course-select"
                    name="course-select"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                >
                    <option value="">Select a Course</option>
                    {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <textarea
                    id="comment"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label htmlFor="rating">Rating:</label>
                <input
                    id="rating"
                    name="rating"
                    type="number"
                    value={rating}
                    min="1"
                    max="5"
                    onChange={(e) => setRating(parseInt(e.target.value))}
                />
            </div>
            <button onClick={handleAddReview}>Add Review</button>
        </div>
    );
}

export default AddReview;