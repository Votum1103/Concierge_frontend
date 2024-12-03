<template>
    <GoogleFonts />
    <nav>
        <BackButton class="back-button" routeName="AcceptOperationByConcierge" buttonText="Wróć">
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
                    <input :class="{ 'error-border': loginError }" type="text" id="login" name="login"
                        placeholder="Login" v-model="username" required>
                </div>
                <div>
                    <input :class="{ 'error-border': loginError }" type="password" id="password" name="password"
                        placeholder="Hasło" v-model="password" required>
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
</template>

<script>
import BackButton from './BackButton.vue';
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import api from '../api'

export default {
    name: 'ConciergeLoginAcceptOperation',
    components: {
        GoogleFonts,
        WUoT_Logo,
        RouteButton,
        BackButton
    },
    data() {
        return {
            username: '',
            password: '',
            loginError: false
        };
    },
    methods: {
        async login() {
            try {
                // Logowanie użytkownika
                const loginResponse = await api.post('/login', new URLSearchParams({
                    username: this.username,
                    password: this.password
                }));

                // Zapis tokenów w sessionStorage
                const accessToken = loginResponse.data.access_token;
                const refreshToken = loginResponse.data.refresh_token;
                sessionStorage.setItem('access_token', accessToken);
                sessionStorage.setItem('refresh_token', refreshToken);

                // Akceptacja sesji
                const sessionId = sessionStorage.getItem('sessionId'); // Pobierz session_id
                if (!sessionId) {
                    throw new Error("Brak session_id w pamięci sesji");
                }

                const approveResponse = await api.post(`/approve/login/session/${sessionId}`, new URLSearchParams({
                    grant_type: 'password',
                    username: this.username,
                    password: this.password
                }));


                console.log('Sesja zaakceptowana:', approveResponse.data);

                // Przejście do głównego okna po akceptacji
                this.$router.push({ name: 'MainWindow' });
            } catch (error) {
                this.loginError = true; // Ustawienie flagi błędu logowania
                console.error('Błąd logowania lub akceptacji sesji:', error);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
$primary-color: #0083BB;
$error-color: #ff4d4d;
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

.error-border {
    border-bottom: 3px solid $error-color;
    /* Czerwony border przy błędzie */
}

.error-placeholder {
    height: 1.5rem;
    /* Rezerwuje miejsce na komunikat o błędzie */
    display: flex;
    align-items: center;
    justify-content: center;
}

.error-message {
    color: $error-color;
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