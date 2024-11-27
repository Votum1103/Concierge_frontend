<template>
    <GoogleFonts />
    <nav>
        <BackButton class="back-button" routeName="ScanUserCard" buttonText="Wróć">
            <template #icon>
                <svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
            </template>
        </BackButton>
        <WUoT_Logo />
    </nav>

    <main>
        <section class="container">
            <h1>Podaj login i hasło</h1>
            <form @submit.prevent="login">
                <div>
                    <input type="text" id="login" name="login" placeholder="Login" v-model="username" required>
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="Hasło" v-model="password"
                        required>
                </div>
                <div class="login-button-group">
                    <RouteButton buttonText="Zaloguj się" class="primary-button" />
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import BackButton from './BackButton.vue';
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import axios from 'axios';

export default {
    name: 'UserLogin',
    components: {
        GoogleFonts,
        WUoT_Logo,
        RouteButton,
        BackButton
    },
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {

            try {
                const token = sessionStorage.getItem("access_token");
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.post('http://127.0.0.1:8000/start-session/login', new URLSearchParams({
                    username: this.username,
                    password: this.password
                }), { headers });

                const username = response.data.user.name;

                const surname = response.data.user.surname;
                const faculty = response.data.user.faculty;
                const role = response.data.user.role;
                const userId = response.data.user.id;
                const sessionId = response.data.id;
                
                sessionStorage.setItem('sessionId', sessionId);
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('username', username);

                sessionStorage.setItem('surname', surname);
                sessionStorage.setItem('faculty', faculty);
                sessionStorage.setItem('role', role);

                this.$router.push({ name: 'MainProcess' });
            } catch (error) {
                console.error('Błąd logowania:', error);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
$primary-color: #0083BB;
$text-color: #FFFFFF;
$background-color: rgb(41, 38, 38);
$font-main: 'Open Sans', sans-serif;
$font-heading: 'Ubuntu', sans-serif;

body {
    background-color: $background-color;
    color: $text-color;
    text-align: center;
    margin: 0;
    font-family: $font-main;
    background-image: url('../assets/back.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
}

nav {
    text-align: left;
    height: 50px;
}

.primary-button {
    margin-top: 6.25rem;
    border: none;
    font-family: $font-heading;
    font-weight: 500;
    font-size: 1.125rem;
    background-color: $primary-color;
    color: $text-color;
    padding: 0.625rem 5rem;
    border-radius: 1.5625rem;
    transition: transform 0.3s, background-color 0.3s;
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
    color: #FFFFFF;
    background-color: transparent !important;
}


main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.container {
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
    background-color: rgb(0, 0, 0);
}

input {
    color: inherit;
    font-family: inherit;
    font-weight: 600;
    font-size: 1.25rem;
    background-color: inherit;
    border: none;
    text-align: center;
    margin: 0.9375rem;
    width: 18.75rem;
    border-bottom: 3px solid $primary-color;
}

input::placeholder {
    text-align: left;
    color: #edede9;
    font-size: 1rem;
}

h1 {
    font-family: $font-heading;
    font-size: 2rem;
    padding: 0 3.125rem;
    margin-bottom: 4.6875rem;
}

.logo {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.625rem;
}

.login-button-group {
    display: flex;
    justify-content: center;
    align-items: center;
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

    .primary-button {
        font-size: 1rem;
        padding: 0.625rem 2.5rem;
    }
}
</style>