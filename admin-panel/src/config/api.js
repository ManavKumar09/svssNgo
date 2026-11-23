// Central API base URL configuration
// In production or when VITE_API_BASE_URL is set, uses the Render backend.
// In local development, falls back to http://localhost:5000 if not specified.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.PROD ? 'https://svssngo.onrender.com' : 'http://localhost:5000');

export default API_BASE_URL;
