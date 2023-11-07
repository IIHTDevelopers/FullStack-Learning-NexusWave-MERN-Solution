import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081/api/grade';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthorizationHeader = (token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const gradeService = {
    getAllGrades: async (instructorId) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.get(`/${instructorId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllGradesForAStudent: async (studentId) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.get(`/${studentId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getGradesForStudentInCourse: async (studentId, courseId) => {
        try {
            const response = await axiosInstance.get(`/${studentId}/${courseId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getGradesForStudentsInCourse: async (courseId) => {
        try {
            const response = await axiosInstance.get(`/course/${courseId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createGradesForStudentInCourse: async (studentId,
        courseId,
        grade,
        gradedBy,
        gradeDate,
        comments) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.post(`/${studentId}/${courseId}`, {
                studentId,
                courseId,
                grade,
                gradedBy,
                gradeDate,
                comments
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateGradesForStudentInCourse: async (studentId, courseId, gradeData) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.put(`/${studentId}/${courseId}`, gradeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllCourseAvg: async (instructorId) => {
        try {
            setAuthorizationHeader(localStorage.getItem('token'));
            const response = await axiosInstance.get(`/courseGrade/${instructorId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default gradeService;
