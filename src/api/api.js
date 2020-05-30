import * as axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": '865d9a90-c17e-47a6-8a20-ea2bc0a08d8d'
    }
});

export const API = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUser: (userId) => {
        return axiosInstance.post(`follow/${userId}`)
            .then(response => response.data);
    },
    unfollowUser: (userId) => {
        return axiosInstance.delete(`follow/${userId}`)
            .then(response => response.data);
    },
    fetchProfile: (userId) => {
        return axiosInstance.get(`profile/${userId}`)
            .then(response => response.data);
    },
    fetchStatus: (userId) => {
        return axiosInstance.get(`profile/status/${userId}`)
            .then(response => response.data);
    },
    updateStatus: (status) => {
        return axiosInstance.put(`profile/status`, {status})
            .then(response => response.data);
    },
    authMe: () => {
        return axiosInstance.get(`auth/me`)
            .then(response => response.data);
    },
    login: (email, password, rememberMe = false, captcha = null) => {
        return axiosInstance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logout: () => {
        return axiosInstance.delete(`auth/login`)
            .then(response => response.data);
    },
    getCaptchaUrl: () => {
        return axiosInstance.get(`security/get-captcha-url`)
            .then(response => response.data);
    }
};

