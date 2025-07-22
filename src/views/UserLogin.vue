    <template>
        <div class="container">
            <GoogleFonts />
            <nav>
                <BackButton class="back-button" routeName="ScanUserCard" buttonText="Wróć">
                    <template #icon>
                        <svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>
                    </template>
                </BackButton>
                <WUoT_Logo />
            </nav>
            <main>
                <section class="mainContent">
                    <h1>Podaj login i hasło</h1>
                    <form @submit.prevent="login">
                        <div>
                            <input type="text" id="login" name="login" placeholder="Login" v-model="username"
                                :class="{ 'error-border': loginError }" required>
                        </div>
                        <div>
                            <input type="password" id="password" name="password" placeholder="Hasło" v-model="password"
                                :class="{ 'error-border': loginError }" required>
                        </div>
                        <div class="error-placeholder">
                            <span v-if="loginError" class="error-message">Niepoprawny login lub hasło</span>
                        </div>
                        <div class="login-button-group">
                            <RouteButton buttonText="Zaloguj się" class="primary-button" />
                        </div>
                    </form>
                </section>
            </main>
        </div>
    </template>

<script setup>
import BackButton from '../components/BackButton.vue';
import GoogleFonts from '../components/googleFonts.vue';
import WUoT_Logo from '../components/WUoT_Logo.vue';
import RouteButton from '../components/RouteButton.vue';
import api from '../api';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
let loginError = ref(false);

const router = useRouter();

async function login() {

    try {
        const response = await api.post('http://127.0.0.1:8000/start-session/login', new URLSearchParams({
            username: username.value,
            password: password.value
        }));

        const userName = response.data.user.name;

        const surname = response.data.user.surname;
        const faculty = response.data.user.faculty;
        const role = response.data.user.role;
        const userId = response.data.user.id;
        const sessionId = response.data.id;

        sessionStorage.setItem('sessionId', sessionId);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('username', userName);
        sessionStorage.setItem('surname', surname);
        sessionStorage.setItem('faculty', faculty);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('lastPage', router.name)

        router.push({ name: 'MainProcess' });
    } catch (error) {
        loginError.value = true;
        console.error('Błąd logowania:', error);
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variables.scss';

.container {
    color: $text-color;
    text-align: center;
    background-color: $background-color;
    background-image: url('../assets/back.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
}

h1 {
    font-size: 2rem;
    padding: 0 3.125rem;
    margin-bottom: 4.6875rem;
}

nav {
    text-align: left;
    height: 50px;
}

.primary-button {
    font-weight: 500;
    font-size: 1.125rem;
    background-color: $primary-color;
    color: $text-color;
    border: none;
    padding: 0.625rem 5rem;
    margin-top: 6.25rem;
    border-radius: 1.5625rem;
    transition: transform 0.3s, background-color 0.3s;
    white-space: nowrap;
}

.primary-button:hover {
    transform: scale(1.07);
    cursor: pointer;
    background-color: darken($primary-color, 10%);
}

.back-button {
    text-decoration: none;
    margin: 15px;
    display: inline-flex;
    align-items: center;
    color: $text-color;
    background-color: transparent !important;
}

main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.mainContent {
    box-sizing: border-box;
    border-radius: 2em;
    padding-bottom: 6.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    min-width: 21.875rem;
    max-width: 37.5rem;
    height: 70%;
    background-color: $background-color;
}

input {
    text-align: center;
    color: inherit;
    font-weight: 600;
    font-size: 1.25rem;
    background-color: inherit;
    border: none;
    margin: 0.9375rem;
    width: 18.75rem;
    border-bottom: 3px solid $primary-color;
}

input::placeholder {
    text-align: left;
    color: #edede9;
    font-size: 1rem;
}

.login-button-group {
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-border {
    border-bottom: 3px solid $error-color;
}

.error-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
}

.error-message {
    color: $error-color;
    font-size: 1rem;
}

@media (max-width: 768px) {
    h1 {
        font-size: 1.75rem;
    }

    .container {
        height: 60%;
    }

    input {
        width: 15.625rem;
    }
}

@media (max-width: 820px) {
    h1 {
        font-size: 1.5rem;
    }

    input {
        width: 90%;
        font-size: 1rem;
    }
}

@media (min-width: 820px) and (max-width: 1024px) {
    h1 {
        font-size: 1.75rem;
    }
}

@media (min-width: 1553px) {

    h1 {
        font-size: 32px;
    }
}
</style>