import axios from 'axios';
import { getToken } from './AuthService';

const EMPLOYEE_REST_API_BASE_URL = "http://localhost:8081/api/users";
const SUPERVISOR_API_BASE_URL = "http://localhost:8081/api/supervisors";

// Add JWT token in requests
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch employees by service
export const fetchEmployeesByService = async (serviceId) => {
  try {
    const response = await axios.get(`${EMPLOYEE_REST_API_BASE_URL}/service/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Fetch supervisors by service
export const fetchSupervisorsByService = async (serviceId) => {
  try {
    const response = await axios.get(`${SUPERVISOR_API_BASE_URL}/service/${serviceId}/supervisors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supervisors:', error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${EMPLOYEE_REST_API_BASE_URL}/${userId}/role`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// Add supervisor to a service
export const addSupervisorToService = async (serviceId, userId) => {
  try {
    const response = await axios.post(`${SUPERVISOR_API_BASE_URL}/service/${serviceId}/add-supervisor/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding supervisor:', error);
    throw error;
  }
};

// Update supervisor in a service
export const updateSupervisorInService = async (serviceId, supervisorId, userId) => {
  try {
    const response = await axios.put(`${SUPERVISOR_API_BASE_URL}/service/${serviceId}/update-supervisor/${supervisorId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error updating supervisor:', error);
    throw error;
  }
};

// Delete supervisor from a service
export const deleteSupervisorFromService = async (serviceId, supervisorId) => {
  try {
    const response = await axios.delete(`${SUPERVISOR_API_BASE_URL}/service/${serviceId}/delete-supervisor/${supervisorId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting supervisor:', error);
    throw error;
  }
};
