import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8081/api/auth";

// Function to make a login API call
export const loginAPICall = (username, password) => 
  axios.post(AUTH_REST_API_BASE_URL + '/login', { username, password });

// Function to store the JWT token in local storage
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// Function to retrieve the JWT token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Function to save the logged-in user's information in session storage
export const saveLoggedInUser = (username, role) => {
  sessionStorage.setItem("authenticatedUser", username);
  sessionStorage.setItem("role", role);
};

// Function to check if a user is logged in
export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username != null;
};

// Function to get the logged-in user's information
export const getLoggedInUser = () => {
  return sessionStorage.getItem("authenticatedUser");
};

// Function to log out the user by clearing local and session storage
export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

// Function to check if the logged-in user is an admin
export const isAdminUser = () => {
  let role = sessionStorage.getItem("role");
  return role === 'ROLE_ADMIN';
};

// Function to check if the logged-in user is an admin supervisor
export const isAdminSup = () => {
  let role = sessionStorage.getItem("role");
  return role === 'ROLE_ADMIN_SUPERVISOR';
};

// Function to check if the logged-in user is a supervisor
export const isSup = () => {
  let role = sessionStorage.getItem("role");
  return role === 'ROLE_SUPERVISOR';
};
