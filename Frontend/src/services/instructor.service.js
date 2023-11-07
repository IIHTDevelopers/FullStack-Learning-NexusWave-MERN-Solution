import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081/api/instructor';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthorizationHeader = (token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const instructorService = {
    loginInstructor: async (loginData) => {
        try {
            const response = await axiosInstance.post('/login', loginData);
            const { token, id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            localStorage.setItem('isStudent', false);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logOoutInstructor: async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('isStudent');
        } catch (error) {
            throw error;
        }
    },

    getAllInstructors: async () => {
        try {
            const response = await axiosInstance.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createInstructor: async (instructorData) => {
        try {
            const response = await axiosInstance.post('/', instructorData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getInstructor: async (id) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.get(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateInstructor: async (id, instructorData) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.put(`/${id}`, instructorData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteInstructor: async (id) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.delete(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllCourses: async (instructorId) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.get(`/courses/${instructorId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCourseInsights: async (instructorId) => {
        try {
            const response = await axiosInstance.get(`/courses/${instructorId}/insights`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAverageGrade: async (instructorId) => {
        try {
            const response = await axiosInstance.get(`/courses/${instructorId}/students/grades`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCourse: async (courseId, instructorId) => {
        setAuthorizationHeader(localStorage.getItem('token'));
        try {
            const response = await axiosInstance.get(`/courses/${courseId}/${instructorId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateCourse: async (courseId, instructorId, courseData) => {
        setAuthorizationHeader(localStorage.getItem('token'));
        try {
            const response = await axiosInstance.put(`/courses/${courseId}/${instructorId}`, courseData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteCourse: async (courseId, instructorId) => {
        setAuthorizationHeader(localStorage.getItem('token'));
        try {
            const response = await axiosInstance.delete(`/courses/${courseId}/${instructorId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default instructorService;
