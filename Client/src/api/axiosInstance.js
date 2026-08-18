import axios from "axios";

// Falls back to localhost:5000 for local development if no env var is set.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
