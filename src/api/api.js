/*
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Attach token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("admintoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Capital 'A'
  }
  return config;
});

export default API;
*/

import axios from "axios";

const API = axios.create({
 baseURL: "https://optic-backend.onrender.com/api",

});

// Attach token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("admintoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Capital 'A'
  }
  return config;
});

export default API;