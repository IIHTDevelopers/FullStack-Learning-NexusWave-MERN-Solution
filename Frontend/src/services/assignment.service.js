import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081/api/assignment';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

const setAuthorizationHeader = (token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const assignmentService = {
    getAllAssignments: async () => {
        setAuthorizationHeader(localStorage.getItem('token'));
        try {
            const response = await axiosInstance.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getSubmittedAssignments: async () => {
        setAuthorizationHeader(localStorage.getItem('token'));
        try {
            const response = await axiosInstance.get('/submitted');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUnsubmittedAssignments: async () => {
        setAuthorizationHeader(localStorage.getItem('token'));
        try {
            const response = await axiosInstance.get('/unsubmitted');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    submitAssignment: async (assignmentData) => {
        try {
            const response = await axiosInstance.post('/submit', assignmentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getSubmissionStatus: async (id) => {
        try {
            const response = await axiosInstance.get(`/status/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchAssignment: async (title) => {
        try {
            const response = await axiosInstance.get('/search?title=' + title);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default assignmentService;
