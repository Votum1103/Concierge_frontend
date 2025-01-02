import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

api.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
                window.location = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
