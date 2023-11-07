import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import instructorService from '../../services/instructor.service';
import Course from 'src/models/course.model';

const EditCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const history = useHistory();

    useEffect(() => {
        if (id)
            instructorService.getCourse(id, localStorage.getItem('id')).then((data) => {
                setCourse(new Course({
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    instructorId: data.instructorId,
                    ratings: data.ratings || [],
                    reviews: data.reviews || [],
                    content: data.content || [],
                }));
            });
    }, [id]);

    const handleCancel = () => {
        history.push('/instructor/courses');
    };

    const handleUpdate = () => {
        instructorService.updateCourse(id, localStorage.getItem('id'), course).then((data) => {
            history.push('/instructor/courses');
        });
    };

    const handleDelete = () => {
        instructorService.deleteCourse(id, localStorage.getItem('id')).then(() => {
            history.push('/instructor/courses');
        });
    };

    return (
        <div>
            <h2>Course Details</h2>
            <label htmlFor='title'>Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
            />
            <label htmlFor='description'>Description:</label>
            <input
                type="text"
                id="description"
                name="description"
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
            />
            <label htmlFor='category'>Category:</label>
            <input
                type="text"
                id="category"
                name="category"
                value={course.category}
                onChange={(e) => setCourse({ ...course, category: e.target.value })}
            />
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default EditCourse;
