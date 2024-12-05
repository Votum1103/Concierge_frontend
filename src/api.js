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
            originalRequest._retry = true;

            try {
                const refreshToken = sessionStorage.getItem('refresh_token');
                const response = await axios.post('http://127.0.0.1:8000/refresh', {
                    refresh_token: refreshToken,
                });
                //#TODO tutaj znowu refresh token bo jak robie ten u gory refresh to z getItem biorę stary a nie już zaktualizowany
                const newAccessToken = response.data.access_token;
                sessionStorage.setItem('access_token', newAccessToken);

                api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error('Błąd przy odświeżaniu tokenu:', refreshError);
                sessionStorage.clear();  // Wylogowanie, jeśli odświeżenie się nie powiodło
                window.location = '/';  // Przekierowanie do strony logowania
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
