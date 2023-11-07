import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081/api/course';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthorizationHeader = (token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const courseService = {
    getAllCourses: async () => {
        try {
            const response = await axiosInstance.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCoursesByCategory: async (category) => {
        try {
            const response = await axiosInstance.get(`/category/${category}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCoursesByRating: async (minRating) => {
        try {
            const response = await axiosInstance.get(`/ratings/${minRating}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createCourse: async (courseData) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.post('/', courseData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCourse: async (id) => {
        try {
            const response = await axiosInstance.get(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateCourse: async (id, courseData) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.put(`/${id}`, courseData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteCourse: async (id) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.delete(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchCourse: async (title) => {
        try {
            const response = await axiosInstance.get('/search?title=' + title);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default courseService;
