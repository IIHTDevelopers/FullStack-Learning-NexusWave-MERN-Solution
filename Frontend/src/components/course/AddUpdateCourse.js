import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import courseService from '../../services/course.service';
import Course from '../../models/course.model';

const AddUpdateCourse = () => {
    const { id } = useParams();
    const history = useHistory();
    const [course, setCourse] = useState(new Course({
        title: '',
        description: '',
        category: '',
        instructorId: '',
        ratings: [],
        reviews: [],
        content: [],
    }));

    useEffect(() => {
        if (id) {
            courseService.getCourse(id).then((data) => {
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
        }
    }, [id]);

    const handleSave = () => {
        if (id) {
            courseService.updateCourse(id, course).then((data) => {
                history.push('/courses/all');
            });
        } else {
            courseService.createCourse(course).then((data) => {
                history.push('/courses/all');
            });
        }
    };

    return (
        <div className="create-update-course">
            <h2>{id ? 'Update Course' : 'Create New Course'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={course.title}
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
            />
            <input
                type="text"
                placeholder="Category"
                value={course.category}
                onChange={(e) => setCourse({ ...course, category: e.target.value })}
            />
            <input
                type="text"
                placeholder="Instructor ID"
                value={course.instructorId}
                onChange={(e) => setCourse({ ...course, instructorId: e.target.value })}
            />
            <button onClick={handleSave}>{id ? 'Update' : 'Create'}</button>
        </div>
    );
}

export default AddUpdateCourse;