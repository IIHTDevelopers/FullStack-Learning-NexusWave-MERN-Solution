import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import courseService from '../../services/course.service';

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [searchRating, setSearchRating] = useState('');
    const history = useHistory();

    useEffect(() => {
        courseService.getAllCourses().then((data) => {
            setCourses(data);
        });
    }, []);

    useEffect(() => {
        if (searchTitle.length)
            courseService.searchCourse(searchTitle).then((data) => {
                setCourses(data);
            });
    }, [searchTitle]);

    useEffect(() => {
        if (searchCategory.length)
            courseService.getCoursesByCategory(searchCategory).then((data) => {
                setCourses(data);
            });
    }, [searchCategory]);

    useEffect(() => {
        if (searchRating.length)
            courseService.getCoursesByRating(searchRating).then((data) => {
                setCourses(data);
            });
    }, [searchRating]);

    const handleDeleteCourse = (id) => {
        courseService.deleteCourse(id).then(() => {
            history.push('/courses/all');
        });
    };

    return (
        <div className="all-courses">
            <h2>All Courses</h2>
            <div className="search-options">
                <label htmlFor='title'>Search by title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Search by Title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <label htmlFor='category'>Search by category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Search by Category"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                />
                <label htmlFor='rating'>Search by min rating</label>
                <input
                    type="text"
                    id="rating"
                    name="rating"
                    placeholder="Search by Minimum Rating"
                    value={searchRating}
                    onChange={(e) => setSearchRating(e.target.value)}
                />
            </div>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>{course.category}</p>
                        <p>{course.instructorId}</p>
                        <p>{course.ratings}</p>
                        <Link to={`/courses/add-update/${course._id}`}>
                            Edit
                        </Link>
                        <button onClick={() => handleDeleteCourse(course._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllCourses;