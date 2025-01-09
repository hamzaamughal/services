// src/api.js
import axios from "axios";

const api = axios.create({
 baseURL: "http://localhost:5000/api", // Base URL for your API
 timeout: 10000,  // Timeout for requests
 headers: {
  "Content-Type": "application/json",
 },
});

export default api;
