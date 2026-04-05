import axios from "axios";

// Debug (temporary): verify env is loaded
// eslint-disable-next-line no-console
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

export default api;

