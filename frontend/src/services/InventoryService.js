import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8081/api/inventory';

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

// Function to get the inventory for the logged-in user
export const getUserInventory = () => axios.get(`${BASE_REST_API_URL}/user`);
