// src/api.js
import axios from "axios";

let baseURL = "http://localhost:5000/api";
// let baseURL = "https://services-4c4j.onrender.com/api"

// Create an axios instance
const api = axios.create({
  baseURL, // Base URL for your API
  timeout: 10000, // Timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
