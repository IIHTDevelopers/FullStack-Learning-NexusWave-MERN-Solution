import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081/api/student';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthorizationHeader = (token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const studentService = {
    loginStudent: async (loginData) => {
        try {
            const response = await axiosInstance.post('/login', loginData);
            const { token, id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            localStorage.setItem('isStudent', true);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logOutStudent: async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('isStudent');
        } catch (error) {
            throw error;
        }
    },

    getAllStudents: async (instructorId) => {
        try {
            const response = await axiosInstance.get(`/enrolled/${instructorId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createStudent: async (studentData) => {
        try {
            const response = await axiosInstance.post('/', studentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getStudent: async (id) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.get(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateStudent: async (id, studentData) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.put(`/${id}`, studentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteStudent: async (id) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.delete(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchStudent: async (searchedText) => {
        try {
            const response = await axiosInstance.get('/search?name=' + searchedText + '&email=' + searchedText);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addReview: async (reviewData) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.post('/review', reviewData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllPopularCourses: async () => {
        try {
            const response = await axiosInstance.get('/popularCourses');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default studentService;
