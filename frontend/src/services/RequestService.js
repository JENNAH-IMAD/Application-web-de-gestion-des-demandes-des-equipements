import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8081/api/requests';

// Add a request interceptor to include the token in all requests
axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Function to create a new request for the current user
export const createRequestForCurrentUser = (requestDto) => {
    return axios.post(`${BASE_REST_API_URL}/current-user`, requestDto);
};

// Function to get all requests for the current user
export const getCurrentUserRequests = () => {
    return axios.get(`${BASE_REST_API_URL}/current-user`);
};

// Function to get all requests for a specific user
export const getUserRequests = (userId) => {
    return axios.get(`${BASE_REST_API_URL}/user/${userId}`);
};

// Function to get all requests for a specific service
export const getServiceRequests = (serviceId) => {
    return axios.get(`${BASE_REST_API_URL}/service/${serviceId}`);
};
