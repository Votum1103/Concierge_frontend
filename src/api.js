import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Bazowy URL dla API
});

// Interceptor żądań, aby dodać nagłówek Authorization do każdego żądania
api.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Interceptor odpowiedzi, aby obsłużyć przypadek wygaśnięcia tokenu
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // Sprawdzenie, czy błąd dotyczy wygaśnięcia tokenu
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = sessionStorage.getItem('refresh_token');
                const response = await axios.post('http://127.0.0.1:8000/refresh', {
                    refresh_token: refreshToken,
                });

                const newAccessToken = response.data.access_token;
                sessionStorage.setItem('access_token', newAccessToken);

                // Aktualizowanie nagłówka dla oryginalnego żądania i ponowne wykonanie
                api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error('Błąd przy odświeżaniu tokenu:', refreshError);
                sessionStorage.clear();  // Wylogowanie, jeśli odświeżenie się nie powiodło
                window.location = '/login';  // Przekierowanie do strony logowania
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
