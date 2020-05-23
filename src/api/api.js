import * as axios from "axios";
import {API_KEY} from "../config/api";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": API_KEY
    }
});

export const API = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`, {
            withCredentials: true
        }).then(response => response.data);
    },
    followUser: (userId) => {
        return axiosInstance.post(`follow/${userId}`).then(response => response.data);
    },
    unfollowUser: (userId) => {
        return axiosInstance.delete(`follow/${userId}`).then(response => response.data);
    }
};

