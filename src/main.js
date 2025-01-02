import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

createApp(App).use(router).mount('#app');

setInterval(async () => {
    const access_token = sessionStorage.getItem('access_token');
    if (!access_token) return;

    try {
        const response = await axios.post("http://localhost:8000/refresh/", { access_token }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const newToken = response.data["access_token"];
        if (newToken) {
            sessionStorage.setItem("access_token", newToken);
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
}, 1000 * 60 * 5);
